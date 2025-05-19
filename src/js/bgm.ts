// 오디오 요소 선택
const bgmAudio = document.getElementById('bgmAudio') as HTMLAudioElement;

// 모든 bgmBtn 버튼 선택
const bgmBtns = document.querySelectorAll('.bgmBtn');

// 음악 재생 상태 전역 변수
let isPlaying = true;

/**
 * 모든 섹션의 BGM 아이콘 상태를 현재 음악 상태(isPlaying)에 맞게 업데이트
 */
function updateAllBgmIcons() {
  const bgmOnIcon = document.querySelector('.bgmOn') as HTMLImageElement;
  const bgmOffIcon = document.querySelector('.bgmOff') as HTMLImageElement;

  // 현재 음악 상태에 따라 적절한 아이콘 표시
  bgmOnIcon.style.display = isPlaying ? 'inline' : 'none';
  bgmOffIcon.style.display = isPlaying ? 'none' : 'inline';
}

// BGM 버튼 클릭 이벤트 처리
bgmBtns.forEach((bgmBtn) => {
  bgmBtn.addEventListener('click', () => {
    // 음악 재생 상태 토글
    isPlaying = !isPlaying;

    // 음악 상태에 따라 재생/정지
    if (isPlaying) {
      bgmAudio.play();
    } else {
      bgmAudio.pause();
    }

    // 모든 섹션의 아이콘 상태 업데이트
    updateAllBgmIcons();
  });
});

// 기존 섹션 전환 코드가 실행될 때 아이콘이 업데이트되도록
// MutationObserver를 사용하여 DOM 변화 감지
const observer = new MutationObserver(() => {
  // DOM이 변경될 때마다 모든 BGM 아이콘 상태 업데이트
  updateAllBgmIcons();
});

// 섹션 컨테이너에 observer 연결 (display 속성 변화 감지)
document.querySelectorAll('.playlists-wrap').forEach((section) => {
  observer.observe(section, {
    attributes: true,
    attributeFilter: ['style', 'class'],
  });
});

// 페이지 로드 시 초기 아이콘 상태 설정
document.addEventListener('DOMContentLoaded', () => {
  updateAllBgmIcons();
});
