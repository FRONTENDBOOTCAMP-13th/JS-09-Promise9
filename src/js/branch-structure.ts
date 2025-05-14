import '../style.css';

interface Choice {
  text: string;
  nextScene: string;
  emotion: string;
  easterEgg?: number;
}

interface Scene {
  choices: Choice[];
}

interface emotionsBgImg {
  default: string;
  sad: string;
  happy: string;
  concern: string;
  neutral: string;
}

const emotionImages: emotionsBgImg = {
  default: 'girl-default.png',
  sad: 'girl-sad.png',
  happy: 'girl-happy.png',
  concern: 'girl-concern.png',
  neutral: 'girl-neutral.png',
};

const scene1: Scene = {
  choices: [
    {
      text: '오늘은 왠지 모르게 기분이 좋아!<br/>네가 있어서 그런가 봐',
      nextScene: 'classWindowScene',
      emotion: 'excited',
      easterEgg: 0,
    },
    {
      text: '...그냥 멍한 느낌이야. 뭔가 비어있는 느낌?',
      nextScene: 'classNoteScene',
      emotion: 'lonely',
    },
    {
      text: '기분이 별로야... 그냥 많이 지쳤어',
      nextScene: 'hallwayWindowScene',
      emotion: 'sad',
    },
  ],
};

const classWindowScene: Scene = {
  choices: [
    {
      text: '그런 사람... 나한텐... 바로 너 뿐이야',
      nextScene: 'stallScene',
      emotion: 'happy',
      easterEgg: 0,
    },
    {
      text: '...지금도 그래 너랑 있으면... 마음이 편해져',
      nextScene: 'cafeteriaScene',
      emotion: 'relaxed',
    },
  ],
};
const classNoteScene: Scene = {
  choices: [
    {
      text: '좋아, 오늘은 특별히 네 입맛 따라줄게.<br/>신상이라니 궁금하긴 하네',
      nextScene: 'stallScene',
      emotion: 'refresh',
    },
    {
      text: '...근데 나, 급식 먹고 싶은데',
      nextScene: 'cafeteriaScene',
      emotion: 'sad',
    },
  ],
};

// const hallwayWindowScene: Scene = {
//   choices: [
//     {
//       text: "누군가랑 아무 말 없이 같이 걷고 싶어",
//       nextScene: "stallScene",
//       emotion: "lonely",
//     },
//     {
//       text: "이어폰 꽂고 좋아하는 노래 들으면서 걷고 싶어",
//       nextScene: "cafeteriaScene",
//       emotion: "relaxed",
//     },
//   ],
// };

document.addEventListener('DOMContentLoaded', () => {
  let nextBtn = document.querySelector('.next-btn') as HTMLElement;
  let prevBtn = document.querySelector('.prev-btn') as HTMLElement;

  const lines = document.querySelectorAll(
    '.conversation-box > .line',
  ) as NodeListOf<HTMLElement>;

  const characterImg = document.getElementById('character-img') as HTMLImageElement;

  let index = 0;
  let prevIndex: number[] = [];

  // 처음엔 모든 줄 숨기기
  lines.forEach((line) => (line.style.display = 'none'));
  if (lines.length > 0) {
    lines[0].style.display = 'block';
    // updateImg(lines[0]);
  }

  function moveToScene(sceneId: string) {
    // 모든 섹션 숨기기
    const allSections = document.querySelectorAll(
      '.playlists-wrap',
    ) as NodeListOf<HTMLElement>;
    allSections.forEach((section) => {
      section.style.display = 'none';
    });

    // 섹션 찾기
    const section = document.querySelector(
      `section[data-prolog="${sceneId}"]`,
    ) as HTMLElement;

    if (section) {
      section.style.display = 'block';

      const lines = section.querySelectorAll(
        '.conversation-box > .line',
      ) as NodeListOf<HTMLElement>;

      // 대사 가리기
      lines.forEach((line) => (line.style.display = 'none'));

      // 첫번째 대사 보이기
      if (lines.length > 0) {
        index = 0;
        prevIndex = [];
        lines[0].style.display = 'block';
        updateImg(lines[0]);
      }
    }

    nextBtn = section.querySelector('.next-btn') as HTMLElement;
    prevBtn = section.querySelector('.prev-btn') as HTMLElement;

    const newNextBtn = nextBtn.cloneNode(true) as HTMLElement;
    const newPrevBtn = prevBtn.cloneNode(true) as HTMLElement;

    nextBtn.replaceWith(newNextBtn);
    prevBtn.replaceWith(newPrevBtn);

    newNextBtn.addEventListener('click', handleNext);
    newPrevBtn.addEventListener('click', handlePrev); // 이것도 동일하게 수정
  }

  // 선택지 함수
  function showChoices(scene: Scene) {
    const section = document.querySelector(
      '.playlists-wrap[style*="display: block"]',
    ) as HTMLElement;

    const selectBox = section.querySelector(
      '.user-select .select-box',
    ) as HTMLUListElement;

    console.log();
    selectBox.innerHTML = '';

    scene.choices.forEach((choice) => {
      const choiceLi = document.createElement('li');
      const choiceBtn = document.createElement('button');

      choiceBtn.innerHTML = choice.text;

      choiceBtn.addEventListener('click', () => {
        // 현재 선택지 숨기기
        const userSelect = document.querySelector('.user-select') as HTMLElement;
        userSelect.style.display = 'none';

        // 다음 씬 찾기
        const targetSection = document.querySelector(
          `section[data-prolog="${choice.nextScene}"]`,
        ) as HTMLElement;

        if (targetSection) {
          // 섹션 숨기기
          const allSections = document.querySelectorAll(
            '.playlists-wrap',
          ) as NodeListOf<HTMLElement>;
          allSections.forEach((section) => {
            section.style.display = 'none';
          });

          // 선택한 섹션 보이기
          targetSection.style.display = 'block';
        }

        // 다음 질문지로 넘아가기
        moveToScene(choice.nextScene);
      });

      choiceLi.appendChild(choiceBtn);
      selectBox.appendChild(choiceLi);
    });
  }

  // 씬 찾기
  function getSceneByPrologId(prologId: string): Scene {
    switch (prologId) {
      case 'classWindowScene':
        return classWindowScene;
      case 'classNoteScene':
        return classNoteScene;
      default:
        return scene1;
    }
  }

  function handleNext() {
    const section = document.querySelector(
      '.playlists-wrap[style*="display: block"]',
    ) as HTMLElement;
    const lines = section.querySelectorAll(
      '.conversation-box > .line',
    ) as NodeListOf<HTMLElement>;
    const girlTalk = section.querySelector('.line-box') as HTMLElement;

    if (index < lines.length - 1) {
      prevIndex.push(index);
      lines[index].style.display = 'none';
      index++;
      lines[index].style.display = 'block';
      updateImg(lines[index]);
    } else {
      lines[index].style.display = 'none';
      girlTalk.style.display = 'none';

      // 현재 씬 찾기
      const currentSection = document.querySelector(
        '.playlists-wrap[style*="display: block"]',
      ) as HTMLElement;
      if (currentSection) {
        const currentSceneId = currentSection.getAttribute('data-prolog');

        if (currentSceneId) {
          showChoices(getSceneByPrologId(currentSceneId));
        } else {
          showChoices(scene1);
        }
      } else {
        showChoices(scene1);
      }

      const userSelect = section.querySelector('.user-select') as HTMLElement;
      userSelect.style.display = 'block';
    }
  }

  function handlePrev() {
    const section = document.querySelector(
      '.playlists-wrap[style*="display: block"]',
    ) as HTMLElement;
    const lines = section.querySelectorAll(
      '.conversation-box > .line',
    ) as NodeListOf<HTMLElement>;
    const girlTalk = section.querySelector('.line-box') as HTMLElement;

    if (prevIndex.length > 0) {
      lines[index].style.display = 'none';
      index = prevIndex.pop()!;
      lines[index].style.display = 'block';
      updateImg(lines[index]);
      const userSelect = document.querySelector('.user-select') as HTMLElement;
      if (userSelect.style.display === 'block') {
        userSelect.style.display = 'none';
        girlTalk.style.display = 'block';
        const selectBox = document.querySelector('.select-box') as HTMLElement;
        selectBox.style.display = 'none';
      }
    }
  }

  nextBtn.addEventListener('click', () => {
    handleNext();
  });

  prevBtn.addEventListener('click', () => {
    handlePrev();
  });

  function updateImg(line: HTMLElement) {
    const emotion = line.dataset.emotion || 'default';
    const filename = emotionImages[emotion as keyof emotionsBgImg];
    characterImg.src = `/src/assets/img/${filename}`;
  }
});
