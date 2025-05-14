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

/**
 * 음악 재생 상태를 저장하는 변수
 * true: 재생 상태 / false: 일시정지 상태
 */
let isPlaying = false;

/**
 * YouTube iframe 플레이어 객체
 * API가 준비되면 초기화
 */
let player: YT.Player | null = null;

/**
 * YouTube 플레이어가 완전히 준비되었는지 여부
 * 준비되지 않았으면 재생 시도 반환
 */
let isPlayerReady = false;

/**
 * 재생/일시정지 버튼 요소
 */
const musicBtn = document.querySelector('#musicBtn');
const playIcon = document.querySelector('#musicBtn > .play');
const pauseIcon = document.querySelector('#musicBtn > .pause');

/**
 * 음악 재생 상태 토글
 * - 유튜브 플레이어가 준비되지 않았으면 동작하지 않음
 * - isPlaying 값을 반전시키고, 이에 따라 아이콘과 재생 상태를 변경
 * - 접근성(스크린리더)을 위한 aria-label도 함께 변경
 */
function toggleMusic() {
  if (!isPlayerReady || !player) {
    console.warn('플레이어가 아직 준비되지 않았습니다.');
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

/**
 * 사용자가 버튼을 클릭하면 toggleMusic을 호출하여 음악을 제어
 */
musicBtn?.addEventListener('click', toggleMusic);

/**
 * 유튜브 Iframe API가 로딩되면 자동으로 호출되는 전역 함수
 * 이 안에서 YT.Player를 생성하고, onReady 이벤트를 통해 player 준비 상태를 설정
 */
window.onYouTubeIframeAPIReady = () => {
  player = new YT.Player('youtubePlayer', {
    events: {
      /**
       * 유튜브 플레이어가 완전히 준비되었을 때 호출되는 콜백 함수
       * 이 시점 이후부터 재생/일시정지가 가능
       */
      onReady: () => {
        isPlayerReady = true;
      },
    },
  });
};
