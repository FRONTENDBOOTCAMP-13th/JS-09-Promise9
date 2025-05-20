// HTML이 완전히 로드되었을 때 실행 (안정적으로 DOM 요소를 다룰 수 있게 함)
document.addEventListener('DOMContentLoaded', () => {
  // 배경음 오디오 요소를 가져옴
  const bgmAudio = document.getElementById('bgmAudio') as HTMLAudioElement;
  bgmAudio.volume = 0.13; // 기본 볼륨 낮게 설정 (사용자에게 너무 크지 않도록)

  // BGM On/Off를 토글할 버튼 요소
  const bgmBtn = document.querySelector('.bgmBtn') as HTMLButtonElement;

  // 현재 BGM 재생 상태를 저장할 변수 (초기에는 재생 상태)
  let isPlaying = true;

  /**
   * [함수] 현재 재생 상태에 따라 아이콘 표시를 업데이트
   * ✔️ 이유: 사용자에게 지금 BGM이 켜져 있는지 꺼져 있는지를 직관적으로 보여주기 위해
   */
  const updateBgmIcon = () => {
    const bgmOnIcon = document.querySelector('.bgmOn') as HTMLImageElement;
    const bgmOffIcon = document.querySelector('.bgmOff') as HTMLImageElement;

    // 상태에 따라 아이콘 보이기/숨기기 처리
    bgmOnIcon.style.display = isPlaying ? 'inline' : 'none';
    bgmOffIcon.style.display = isPlaying ? 'none' : 'inline';
  };

  /**
   * [이벤트] BGM 버튼을 누르면 재생/정지를 토글
   * ✔️ 이유: 사용자가 게임을 하면서 언제든지 배경음 켜고 끌 수 있도록 하기 위해
   */
  if (bgmBtn) {
    bgmBtn.addEventListener('click', () => {
      isPlaying = !isPlaying; // 상태를 반대로 바꿈

      if (isPlaying) {
        bgmAudio.play(); // BGM 재생

        // 빗소리가 '켜진 상태'였다면 같이 재생
        const rainAudio = document.querySelector('#rainAudio') as HTMLAudioElement | null;
        if (rainAudio && rainAudio.dataset.shouldPlay === 'true') {
          rainAudio.play();
        }
      } else {
        bgmAudio.pause(); // BGM 정지

        // 빗소리도 함께 정지 (BGM 꺼졌을 때 따로 소리 나지 않게)
        const rainAudio = document.querySelector('#rainAudio') as HTMLAudioElement | null;
        if (rainAudio) {
          rainAudio.pause();
        }
      }

      updateBgmIcon(); // 아이콘 상태 업데이트
    });
  }

  // ✔️ 페이지 진입 시에도 아이콘 상태를 맞춰주기 위해 실행
  updateBgmIcon();

  /**
   * [핵심] MutationObserver는 DOM 변경을 감지하는 API
   * 이걸 쓰는 이유는?
   *  👉 선택지 버튼(.rainSceneBtn, .rainStopSceneBtn)이 **JS로 동적으로 생성되기 때문에**
   *  👉 이벤트를 "미리" 등록해둘 수 없어서, 생겼을 때 즉시 연결해야 함
   */
  const observer = new MutationObserver(() => {
    // 빗소리 오디오 요소
    const rainAudio = document.querySelector('#rainAudio') as HTMLAudioElement;

    // 빗소리를 트리거할 선택지 버튼들 (예: 비 오는 씬)
    const rainChoices = document.querySelectorAll('.rainSceneBtn');

    // 빗소리를 멈출 선택지 버튼들 (예: 비 멈춘 씬)
    const stopRain = document.querySelectorAll('.rainStopSceneBtn');

    /**
     * [이벤트] 비 재생 버튼 클릭 시
     * ✔️ 이유: rainAudio를 재생하고,
     *        만약 이후에 사용자가 BGM을 켜면 rain도 같이 재생되도록 상태 저장
     */
    rainChoices.forEach((btn) => {
      btn.addEventListener('click', () => {
        rainAudio.dataset.shouldPlay = 'true'; // 이건 rain이 활성화되었음을 저장하는 역할
        if (isPlaying) {
          rainAudio.play(); // BGM이 재생 중인 경우만 실제로 재생
          rainAudio.volume = 0.12;
        }
      });
    });

    /**
     * [이벤트] 비 정지 버튼 클릭 시
     * ✔️ 이유: rainAudio를 멈추고, BGM이 다시 켜져도 rain은 재생되지 않도록 설정
     */
    stopRain.forEach((btn) => {
      btn.addEventListener('click', () => {
        rainAudio.pause(); // 바로 정지
        rainAudio.dataset.shouldPlay = 'false'; // 비활성화 상태로 기록
      });
    });
  });

  /**
   * [감시 시작] body 내부에서 추가/변경되는 모든 요소를 감지
   * ✔️ 이유: 선택지가 어디에 붙던 관계없이 이벤트를 연결해주기 위함
   */
  observer.observe(document.body, { childList: true, subtree: true });
});
