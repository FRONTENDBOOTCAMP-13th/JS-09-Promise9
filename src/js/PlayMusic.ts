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

export {}; // 이 파일이 모듈로 간주되도록 하여 전역 변수 오염 방지

// -----------------------------
//      상태 및 요소 선언
// -----------------------------

let isPlaying = false; // true: 재생 중, false: 일시정지 상태
let player: YT.Player | null = null;
let isPlayerReady = false;

const musicBtn = document.querySelector('#musicBtn');
const playIcon = document.querySelector('#musicBtn > .play');
const pauseIcon = document.querySelector('#musicBtn > .pause');

// -----------------------------
//      함수 정의
// -----------------------------

/**
 * 음악 재생 상태를 토글
 *
 * @function toggleMusic
 * @returns {void}
 *
 * @description
 * - 유튜브 플레이어가 준비되지 않았으면 콘솔 경고 후 실행 중단
 * - isPlaying 값을 반전시키고, 이에 따라 아이콘과 재생 상태를 변경
 * - 접근성 향상을 위한 aria-label 속성도 함께 변경
 */

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
  } else {
    player.pauseVideo();
  }

  musicBtn?.setAttribute('aria-label', isPlaying ? '일시정지' : '재생');
}

// -----------------------------
//      이벤트 등록
// -----------------------------

/**
 * 사용자가 버튼을 클릭하면 toggleMusic을 호출하여 음악을 제어
 */
musicBtn?.addEventListener('click', toggleMusic);

/**
 * 유튜브 Iframe API가 로드되면 자동으로 호출되는 전역 함수
 * - YT.Player 객체를 생성하여 iframe 플레이어를 초기화
 * - onReady 콜백에서 플레이어 준비 완료 상태를 true로 설정
 *
 * @function onYouTubeIframeAPIReady
 * @global
 */
window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player('youtubePlayer', {
    events: {
      // 플레이어가 완전히 준비되었을 때 실행됨
      onReady: () => {
        isPlayerReady = true;
      },
    },
  });
};
