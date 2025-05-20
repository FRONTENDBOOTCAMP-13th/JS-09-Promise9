document.addEventListener('DOMContentLoaded', () => {
  // START 버튼 요소를 가져오기
  const startBtn = document.querySelector('#startBtn');
  // 이어하기 버튼 요소 가져오기
  // 모든 section 요소들을 가져와서 배열로 저장
  const sections = document.querySelectorAll('section');
  // 현재 보여지고 있는 section의 인덱스를 저장하는 변수
  let currentIndex = 0;

  if (localStorage.getItem('nowScene')) {
    const continueBtn = document.createElement('button');
    continueBtn.className = 'btn btn-lg gradient';
    continueBtn.id = 'continueBtn';
    continueBtn.innerHTML = '이어하기';
    const btnGroup = document.querySelector('.btn-group') as HTMLElement;

    btnGroup.appendChild(continueBtn);
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
      localStorage.setItem('userName', nameValue);
      // localStorage에 'userName' 이름 저장
      if (currentIndex < sections.length - 1) {
        // 다음 section으로 이동
        sections[currentIndex].style.display = 'none';
        currentIndex++;
        sections[currentIndex].style.display = 'block';
      }
    } else {
      alert('이름을 입력해주세요.');
      // 이름이 비어있을 경우 경고 표시
    }
  });

  let selectedGender: string | null = null; // 선택된 성별을 저장할 변수 (처음엔 null)

  const genderButtons = document.querySelectorAll<HTMLButtonElement>('#select-gen');
  // 성별 선택 버튼들 가져오기 (id가 같으면 여러 개 있어도 querySelectorAll로 모두 가져올 수 있음)
  const submitButton = document.getElementById('submit-user-gen') as HTMLButtonElement;
  // 성별 확인 버튼 가져오기

  // 성별 선택 버튼 각각에 클릭 이벤트 추가
  genderButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedGender = btn.dataset.value || null;
      // 클릭된 버튼의 data-value 속성 값 가져와서 selectedGender에 저장
      genderButtons.forEach((b) => b.classList.remove('selected'));
      // 모든 버튼에서 'selected' 클래스 제거하고
      btn.classList.add('selected');
      // 현재 선택된 버튼에만 'selected' 클래스 추가
    });
  });

  // 성별 확인 버튼 클릭 시 실행되는 핸들러
  submitButton.addEventListener('click', () => {
    if (selectedGender) {
      // 성별이 선택되어 있으면
      localStorage.setItem('gender', selectedGender);
      // localStorage에 성별 저장
      location.replace('/src/pages/test.html');
      // 다음 페이지로 이동
    } else {
      alert('성별을 먼저 선택해 주세요!');
      // 성별이 선택되지 않았으면 경고
    }
  });
});
