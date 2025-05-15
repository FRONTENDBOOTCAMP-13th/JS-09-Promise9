declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}
export {};

let isPlaying = false;
let player: YT.Player | null = null;
let isPlayerReady = false;
let progressUpdateInterval: number | null = null;
let isDragging = false;

const musicBtn = document.querySelector('#musicBtn');
const playIcon = document.querySelector('#musicBtn > .play');
const pauseIcon = document.querySelector('#musicBtn > .pause');
const progressBar = document.querySelector('.music-progressbar') as HTMLElement;
const progressStatus = document.querySelector('.progress-status') as HTMLElement;
const dot = document.querySelector('.dot') as HTMLElement;

function toggleMusic() {
  if (!isPlayerReady || !player) {
    console.warn('음악 플레이어가 아직 준비되지 않았습니다.');
    return;
  }

  isPlaying = !isPlaying;

  playIcon?.setAttribute('style', isPlaying ? 'display:none;' : 'display:block;');
  pauseIcon?.setAttribute('style', isPlaying ? 'display:block;' : 'display:none;');

  if (isPlaying) {
    player.playVideo();
    startProgressUpdate();
  } else {
    player.pauseVideo();
    stopProgressUpdate();
  }

  musicBtn?.setAttribute('aria-label', isPlaying ? '일시정지' : '재생');
}

function startProgressUpdate() {
  if (progressUpdateInterval !== null) return;

  progressUpdateInterval = window.setInterval(() => {
    if (!isDragging) updateProgressBar();
  }, 100);
}

function stopProgressUpdate() {
  if (progressUpdateInterval !== null) {
    window.clearInterval(progressUpdateInterval);
    progressUpdateInterval = null;
  }
}

function updateProgressBar() {
  if (!isPlayerReady || !player || !progressStatus) return;

  const duration = player.getDuration();
  const currentTime = player.getCurrentTime();

  if (duration > 0) {
    const percent = (currentTime / duration) * 100;
    updateProgressUI(percent);
  }
}

// 프로그레스 UI만 업데이트하는 함수 분리
function updateProgressUI(percent: number) {
  progressStatus.style.width = `${percent}%`;
}

function seekToPercent(percent: number) {
  if (!isPlayerReady || !player) return;

  // 퍼센트 값 범위 제한 (0~1)
  percent = Math.max(0, Math.min(1, percent));

  const duration = player.getDuration();
  const newTime = duration * percent;
  player.seekTo(newTime, true);
  updateProgressUI(percent * 100);
}

function onProgressBarClick(event: MouseEvent) {
  if (!isPlayerReady || !player) return;

  // 드래그 중에는 처리하지 않음
  if (isDragging) return;

  const bounds = progressBar.getBoundingClientRect();
  const clickX = event.clientX - bounds.left;
  const percent = clickX / bounds.width;

  seekToPercent(percent);
}

// 드래그 기능 개선
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

function onDragMove(event: MouseEvent | TouchEvent) {
  if (!isDragging) return;

  event.preventDefault(); // 기본 동작 방지

  const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
  updateDragPosition(clientX);
}

// 드래그 위치 업데이트 함수 분리
function updateDragPosition(clientX: number) {
  const bounds = progressBar.getBoundingClientRect();
  const offsetX = Math.min(Math.max(0, clientX - bounds.left), bounds.width);
  const percent = offsetX / bounds.width;

  // UI만 업데이트 (실제 재생 위치는 드래그 종료 시 변경)
  updateProgressUI(percent * 100);
}

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

// 이벤트 등록
musicBtn?.addEventListener('click', toggleMusic);
progressBar?.addEventListener('click', onProgressBarClick);
dot?.addEventListener('mousedown', onDragStart);
dot?.addEventListener('touchstart', onDragStart, { passive: false });
// 프로그레스바에서도 드래그 시작 가능하도록 추가
progressBar?.addEventListener('mousedown', onDragStart);
progressBar?.addEventListener('touchstart', onDragStart, { passive: false });

window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player('youtubePlayer', {
    events: {
      onReady: () => {
        isPlayerReady = true;
        updateProgressUI(0);
      },
      onStateChange: (event: any) => {
        if (event.data === YT.PlayerState.ENDED) {
          isPlaying = false;
          playIcon?.setAttribute('style', 'display:block;');
          pauseIcon?.setAttribute('style', 'display:none;');
          musicBtn?.setAttribute('aria-label', '재생');
          stopProgressUpdate();
          updateProgressUI(0);
        }
      },
    },
  });
};
