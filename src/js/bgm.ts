// 오디오 요소 선택
const bgmAudio = document.getElementById('bgmAudio') as HTMLAudioElement;

// 단일 BGM 버튼 선택
const bgmBtn = document.querySelector('.bgmBtn') as HTMLButtonElement;

// 음악 재생 상태 전역 변수
let isPlaying = true;

/**
 * BGM 아이콘 상태를 현재 음악 상태(isPlaying)에 맞게 업데이트
 */
function updateBgmIcon() {
  const bgmOnIcon = document.querySelector('.bgmOn') as HTMLImageElement;
  const bgmOffIcon = document.querySelector('.bgmOff') as HTMLImageElement;

  // 현재 음악 상태에 따라 적절한 아이콘 표시
  bgmOnIcon.style.display = isPlaying ? 'inline' : 'none';
  bgmOffIcon.style.display = isPlaying ? 'none' : 'inline';
}

// BGM 버튼 클릭 이벤트 처리
if (bgmBtn) {
  bgmBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;

    if (isPlaying) {
      bgmAudio.play();
    } else {
      bgmAudio.pause();
    }

    updateBgmIcon();
  });
}

// 페이지 로드 시 초기 아이콘 상태 설정
document.addEventListener('DOMContentLoaded', () => {
  updateBgmIcon();
});
