// YouTube API를 사용하여 음악을 재생하는 기능을 구현하는 코드
// 1) 재생 버튼 클릭 시 YouTube API를 통해 음악을 재생하고,
//    일시정지 버튼 클릭 시 음악을 일시정지하는 기능을 구현
// 2) 드래그 기능을 통해 음악의 재생 위치를 변경하는 기능을 구현
// ----------------------------------------------------------

/**
 * 전역 window 객체에 YouTube API 관련 속성을 선언
 * - onYouTubeIframeAPIReady: API가 로드되면 자동으로 호출
 * - YT: YouTube API 네임스페이스 (iframe player 생성에 사용)
 */
declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

/** 상태 및 요소 선언 */
// 유튜브 플레이어 관련 상태
let player: YT.Player | null = null;
let isPlayerReady = false;
let isPlaying = false; // 재생 중이면 true, 일시정지 상태면 false

// 프로그레스바 관련 상태
let progressUpdateInterval: number | null = null;
let isDragging = false; // 드래그 중이면 true, 아니면 false

// DOM 요소 참조
const musicBtn = document.querySelector('#musicBtn') as HTMLElement; // 재생 토글버튼
const playIcon = document.querySelector('#musicBtn > .play') as HTMLElement; // 재생 아이콘
const pauseIcon = document.querySelector('#musicBtn > .pause') as HTMLElement; // 일시정지 아이콘
const progressBar = document.querySelector('.music-progressbar') as HTMLElement; // 프로그레스바
const progressStatus = document.querySelector('.progress-status') as HTMLElement; // 프로그레스바 상태
const dot = document.querySelector('.dot') as HTMLElement; // 드래그 가능한 점

const userName = localStorage.getItem('userName') as string; // 로컬스토리지에서 사용자 이름 가져오기
const userNameTag = document.querySelector('.user-name') as HTMLElement;
userNameTag.innerHTML = userName;

/**
 * YouTube IFrame API가 로드되면 자동으로 호출되는 전역 함수
 * 이 함수에서 YouTube 플레이어를 생성하고 초기 설정을 실행
 * @returns {void}
 */
window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player('youtubePlayer', {
    events: {
      onReady: () => {
        isPlayerReady = true;
        player?.setVolume(30); // 볼륨 설정
      },
    },
  });
};

/**
 * 재생 버튼 클릭 시 호출되는 함수
 * - 플레이어가 준비되지 않았거나 null인 경우 경고 메시지 출력
 * - 재생 상태를 토글하여 음악을 재생하거나 일시정지
 * - 재생 상태에 따라 아이콘을 변경
 *
 * @function toggleMusic
 * @param {HTMLElement} musicBtn - 음악 버튼 요소
 * @param {HTMLElement} playIcon - 재생 아이콘 요소
 * @returns {void}
 */
function toggleMusic() {
  if (!isPlayerReady || !player) {
    console.warn('음악 플레이어가 아직 준비되지 않았습니다.');
    return;
  }

  // 재생 상태를 토글
  isPlaying = !isPlaying;

  // 토글 아이콘의 표시 상태를 변경
  // 재생 중이면 일시정지 아이콘을 보여주고, 아니면 재생 아이콘을 보여줌
  playIcon?.setAttribute('style', isPlaying ? 'display:none;' : 'display:block;');
  pauseIcon?.setAttribute('style', isPlaying ? 'display:block;' : 'display:none;');

  // 재생 중이면 음악을 재생하고, 아니면 음악을 일시정지
  if (isPlaying) {
    player.playVideo(); // 음악 재생
    startProgressUpdate(); // 프로그레스 업데이트 시작
  } else {
    player.pauseVideo(); // 음악 일시정지
    stopProgressUpdate(); // 프로그레스 업데이트 중지
  }

  // 음악 버튼의 aria-label 속성을 업데이트
  musicBtn?.setAttribute('aria-label', isPlaying ? '일시정지' : '재생');
}

/**
 * 프로그레스 업데이트 함수
 * - 드래그 중이 아닐 때마다 프로그레스바를 업데이트
 * - 100ms마다 호출
 *
 * @function startProgressUpdate
 * @returns {void}
 */

function startProgressUpdate() {
  if (progressUpdateInterval !== null) return;
  progressUpdateInterval = window.setInterval(() => {
    if (!isDragging) updateProgressBar();
  }, 100);
}

/**
 * 프로그레스 업데이트 중지 함수
 * - 프로그레스 업데이트를 중지
 * - clearInterval을 사용하여 인터벌을 제거
 *
 * @function stopProgressUpdate
 * @return {void}
 */
function stopProgressUpdate() {
  if (progressUpdateInterval !== null) {
    window.clearInterval(progressUpdateInterval);
    progressUpdateInterval = null;
  }
}

/**
 * 프로그레스바를 업데이트하는 함수
 * - 현재 재생 위치에 따라 프로그레스바의 상태를 업데이트
 * - 드래그 중이 아닐 때만 호출
 *
 * @function updateProgressBar
 * @returns {void}
 */
function updateProgressBar() {
  if (!isPlayerReady || !player || !progressStatus) return;

  const duration = player.getDuration(); // 전체 재생 시간
  const currentTime = player.getCurrentTime(); // 현재 재생 시간

  if (duration > 0) {
    const percent = (currentTime / duration) * 100;
    updateProgressUI(percent);
  }
}

/**
 * UI 프로그레스바를 업데이트하는 함수
 * - 주어진 퍼센트 값에 따라 프로그레스바의 너비를 설정
 * - 0~100 범위의 값만 허용
 *
 * @function updateProgressUI
 * @param {number} percent - 프로그레스바의 퍼센트 값(0~100)
 * @returns {void}
 */
function updateProgressUI(percent: number) {
  progressStatus.style.width = `${percent}%`;
}

/**
 * 주어진 퍼센트 값에 따라 음악의 재생 위치를 변경하는 함수
 * - 0~1 범위의 값만 허용
 * - 주어진 퍼센트 값에 따라 재생 위치를 계산하여 seekTo 메서드를 호출
 *
 * @function seekToPercent
 * @param {number} percent - 0~1 범위의 퍼센트 값
 * @returns {void}
 */
function seekToPercent(percent: number) {
  if (!isPlayerReady || !player) return;

  // 퍼센트 값 범위 제한 (0~1)
  percent = Math.max(0, Math.min(1, percent));

  const duration = player.getDuration(); // 전체 재생 시간
  const newTime = duration * percent; // 새로운 재생 위치 계산
  player.seekTo(newTime, true); // seekTo 메서드 호출
  updateProgressUI(percent * 100); // UI 프로그레스바 업데이트
}

/**
 * 클릭 이벤트 핸들러
 * - 프로그레스바를 클릭했을 때 호출
 * - 드래그 중이 아닐 때만 처리
 * - 클릭한 위치에 따라 재생 위치를 변경
 *
 * @function onProgressBarClick
 * @param {MouseEvent} event - 클릭 이벤트
 * @returns
 */
function onProgressBarClick(event: MouseEvent) {
  if (!isPlayerReady || !player) return;

  // 드래그 중에는 처리하지 않음
  if (isDragging) return;

  const bounds = progressBar.getBoundingClientRect(); // 프로그레스바의 경계 사각형 정보
  const clickX = event.clientX - bounds.left; // 클릭한 X 좌표
  const percent = clickX / bounds.width; // 클릭한 위치의 퍼센트 값

  seekToPercent(percent);
}

/**
 * 드래그 시작 이벤트 핸들러
 * - 마우스 또는 터치 이벤트에 따라 드래그 시작
 * - 드래그 중에는 기본 동작을 방지하고, 위치 업데이트
 *
 * @function onDragStart
 * @param {MouseEvent | TouchEvent} event - 드래그 시작 이벤트
 * @returns {void}
 */

function onDragStart(event: MouseEvent | TouchEvent) {
  event.preventDefault(); // 기본 동작 방지

  isDragging = true;

  // 드래그 시작 즉시 위치 업데이트
  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  updateDragPosition(clientX);

  document.addEventListener('mousemove', onDragMove, { passive: false });
  document.addEventListener('mouseup', onDragEnd);
  document.addEventListener('touchmove', onDragMove, { passive: false });
  document.addEventListener('touchend', onDragEnd);
}

/**
 *
 * 드래그 중 이벤트 핸들러
 * - 마우스 또는 터치 이벤트에 따라 드래그 중 위치 업데이트
 * - 드래그 중에는 기본 동작을 방지
 *
 * @function onDragMove
 * @param {MouseEvent | TouchEvent} event - 드래그 중 이벤트
 * @returns
 */

function onDragMove(event: MouseEvent | TouchEvent) {
  if (!isDragging) return;

  event.preventDefault(); // 기본 동작 방지

  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  updateDragPosition(clientX);
}

/**
 * 드래그 위치 업데이트 함수
 * - 드래그 중인 위치에 따라 프로그레스바의 상태를 업데이트
 * - 드래그 중에는 UI만 업데이트하고, 실제 재생 위치는 드래그 종료 시 변경
 *
 * @function updateDragPosition
 * @param {number} clientX - 드래그 위치의 X 좌표
 * @returns {void}
 */

function updateDragPosition(clientX: number) {
  const bounds = progressBar.getBoundingClientRect();
  const offsetX = Math.min(Math.max(0, clientX - bounds.left), bounds.width);
  const percent = offsetX / bounds.width;

  // UI만 업데이트 (실제 재생 위치는 드래그 종료 시 변경)
  updateProgressUI(percent * 100);
}

/**
 * 드래그 종료 이벤트 핸들러
 * - 드래그가 종료되면 실제 재생 위치를 변경
 * - 드래그 상태를 false로 변경하고, 이벤트 리스너를 정리
 * - 재생 중이면 프로그레스 업데이트를 다시 시작
 *
 * @function onDragEnd
 * @param {MouseEvent | TouchEvent} event - 드래그 종료 이벤트
 * @returns
 */

function onDragEnd(event: MouseEvent | TouchEvent) {
  if (!isDragging) return;

  // 마지막 위치 계산
  const clientX =
    'changedTouches' in event ? event.changedTouches[0].clientX : event.clientX;

  const bounds = progressBar.getBoundingClientRect();
  const offsetX = Math.min(Math.max(0, clientX - bounds.left), bounds.width);
  const percent = offsetX / bounds.width;

  // 드래그 종료 시 실제 재생 위치 변경
  seekToPercent(percent);

  // 드래그 상태 및 이벤트 리스너 정리
  isDragging = false;
  document.removeEventListener('mousemove', onDragMove);
  document.removeEventListener('mouseup', onDragEnd);
  document.removeEventListener('touchmove', onDragMove);
  document.removeEventListener('touchend', onDragEnd);

  // 재생 중이면 progressUpdate 다시 시작
  if (isPlaying) {
    stopProgressUpdate(); // 기존 인터벌 제거
    startProgressUpdate(); // 새로운 인터벌 시작
  }
}

// ==========================================
//              실행 로직 (시작점)
// ==========================================

// 1. 음악 버튼 클릭 시 toggleMusic 함수 호출
musicBtn?.addEventListener('click', toggleMusic);

// 2. 프로그레스바 클릭 시 onProgressBarClick 함수 호출
progressBar?.addEventListener('click', onProgressBarClick);

// 3. 드래그 시작 시 onDragStart 함수 호출;
dot?.addEventListener('mousedown', onDragStart);
dot?.addEventListener('touchstart', onDragStart, { passive: false });

// 4. 드래그 종료 시 onDragEnd 함수 호출
progressBar?.addEventListener('mousedown', onDragStart);
progressBar?.addEventListener('touchstart', onDragStart, { passive: false });

export {}; // 이 파일이 모듈로 간주되도록 하여 전역 변수 오염 방지
