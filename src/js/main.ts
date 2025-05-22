import Swal from 'sweetalert2';
document.addEventListener('DOMContentLoaded', () => {
  // START 버튼 요소를 가져오기
  const startBtn = document.querySelector('#startBtn');
  // 이어하기 버튼 요소 가져오기
  // 모든 section 요소들을 가져와서 배열로 저장
  const sections = document.querySelectorAll('section');
  // 현재 보여지고 있는 section의 인덱스를 저장하는 변수
  let currentIndex = 0;

  if (localStorage.getItem('nowScene')) {
    const continueBtn = document.querySelector('#continueBtn') as HTMLButtonElement;
    continueBtn.disabled = false;
  }

  const continueBtn = document.querySelector('#continueBtn');

  // "시작" 버튼 클릭 시 다음 section으로 이동
  startBtn?.addEventListener('click', () => {
    localStorage.removeItem('highScore');
    localStorage.clear();
    if (currentIndex < sections.length - 1) {
      // 마지막 section이 아니면
      sections[currentIndex].style.display = 'none';
      // 현재 section을 숨기고
      currentIndex++;
      // 다음 인덱스로 이동
      sections[currentIndex].style.display = 'block';
      // 다음 section을 보여줌
    }
  });

  continueBtn?.addEventListener('click', () => {
    location.replace('/src/pages/test.html');
  });

  // 이름 입력 input 요소 가져오기 (HTMLInputElement로 타입 단언)
  const createUserName = document.getElementById('create-user-name') as HTMLInputElement;
  // 이름 저장 버튼 가져오기 (HTMLButtonElement로 타입 단언)
  const nameSaveBtn = document.getElementById('submit-user-name') as HTMLButtonElement;

  // 이름 저장 버튼 클릭 시 실행되는 이벤트 핸들러
  nameSaveBtn.addEventListener('click', () => {
    const nameValue: string = createUserName.value.trim();
    // 입력된 이름에서 앞뒤 공백 제거 후 저장
    if (nameValue) {
      // 값이 있을 경우
      Swal.fire({
        icon: 'question',
        text: `${nameValue}으로 결정하시겠습니까?`,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: '확인',
        cancelButtonText: '재설정',
        confirmButtonColor: '#ed6ea0',
        cancelButtonColor: '#9769ec',
      }).then((result) => {
        if (result.isConfirmed) {
          if (currentIndex < sections.length - 1) {
            // 다음 section으로 이동
            sections[currentIndex].style.display = 'none';
            currentIndex++;
            sections[currentIndex].style.display = 'block';
            localStorage.setItem('userName', nameValue);
          }
        }
      });
      // localStorage에 'userName' 이름 저장
    } else {
      Swal.fire({
        icon: 'error',
        // title: '이름 넣으시죠.',
        text: '이름이 입력되지 않았습니다.',
      });
      // 이름이 비어있을 경우 경고 표시
    }
  });

  // 성별 선택
  const genderInput = document.querySelectorAll(
    'input[name="select-gen"]',
  ) as NodeListOf<HTMLInputElement>;
  const genderBoy = document.querySelector(
    '.playlists-wrap.main .character-item img.male',
  ) as HTMLElement;
  const genderGirl = document.querySelector(
    '.playlists-wrap.main .character-item img.female',
  ) as HTMLElement;

  genderInput.forEach((input) => {
    input.addEventListener('change', () => {
      const genderValue = input.value;
      console.log(genderValue);
      if (genderValue === '카이') {
        genderBoy?.classList.remove('hidden');
        genderGirl?.classList.add('hidden');
      } else if (genderValue === '유키') {
        genderBoy?.classList.add('hidden');
        genderGirl?.classList.remove('hidden');
      }
    });
  });

  const submitButton = document.getElementById('submit-user-gen') as HTMLButtonElement;

  submitButton.addEventListener('click', () => {
    const selectedInput = document.querySelector<HTMLInputElement>(
      'input[name="select-gen"]:checked',
    );

    if (selectedInput) {
      const gender = selectedInput.value;

      Swal.fire({
        icon: 'question',
        text: `${gender}로 결정하시겠습니까?`,
        showCancelButton: true,
        reverseButtons: true,
        confirmButtonText: '확인',
        cancelButtonText: '재설정',
        confirmButtonColor: '#ed6ea0',
        cancelButtonColor: '#9769ec',
      }).then((result) => {
        if (result.isConfirmed) {
          localStorage.setItem('gender', gender);
          location.replace('/src/pages/test.html');
        }
      });
    } else {
      Swal.fire({
        icon: 'error',
        text: '성별을 결정해주세요.',
      });
    }
  });
});
