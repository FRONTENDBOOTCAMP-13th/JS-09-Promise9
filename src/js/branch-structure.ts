import '../style.css';
import { resultEmotionScore } from './emotion-score.ts';

interface Choice {
  text: string;
  nextScene: string;
  emotion: string;
  easterEgg?: number;
}

interface Scene {
  choices: Choice[];
}

interface Emotion {
  none: string;
  default: string;
  sad: string;
  happy: string;
  shy: string;
  surprised: string;
  worried: string;
  cdefault: string;
  csurprised: string;
  chappy: string;
  cshy: string;
  csad: string;
}

const girlEmotionImages: Emotion = {
  none: '',
  default: 'girl-default.webp',
  sad: 'girl-sad.webp',
  happy: 'girl-happy.webp',
  shy: 'girl-shy.webp',
  surprised: 'girl-surprised.webp',
  worried: 'girl-worried.webp',
  cdefault: 'girl-casual-default.webp',
  csurprised: 'girl-casual-surprised.webp',
  chappy: 'girl-casual-happy.webp',
  cshy: 'girl-casual-shy.webp',
  csad: 'girl-casual-sad.webp',
};

const boyEmotionImages: Emotion = {
  none: '',
  default: 'boy-default.webp',
  sad: 'boy-sad.webp',
  happy: 'boy-happy.webp',
  shy: 'boy-shy.webp',
  surprised: 'boy-surprised.webp',
  worried: 'boy-worried.webp',
  cdefault: 'boy-casual-default.webp',
  csurprised: 'boy-casual-surprised.webp',
  chappy: 'boy-casual-happy.webp',
  cshy: 'boy-casual-shy.webp',
  csad: 'boy-casual-sad.webp',
};

// 감정별 점수를 나타내는 타입
type EmotionScores = {
  relaxed: number;
  happy: number;
  sad: number;
  lonely: number;
  excited: number;
  refresh: number;
};

const emotionScores: EmotionScores = {
  relaxed: 0,
  happy: 0,
  sad: 0,
  lonely: 0,
  excited: 0,
  refresh: 0,
};

let easterEggScore = 0; //이스터에그 변수

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
      easterEgg: 0,
    },
    {
      text: '...근데 나, 급식 먹고 싶은데',
      nextScene: 'cafeteriaScene',
      emotion: 'sad',
    },
  ],
};

const hallwayWindowScene: Scene = {
  choices: [
    {
      text: '누군가랑 아무 말 없이 같이 걷고 싶어',
      nextScene: 'stallScene',
      emotion: 'lonely',
    },
    {
      text: '이어폰 꽂고 좋아하는 노래 들으면서 걷고 싶어',
      nextScene: 'cafeteriaScene',
      emotion: 'relaxed',
    },
  ],
};

const stallScene: Scene = {
  choices: [
    {
      text: '네가 고른 거! 꼭 먹어보고 싶어!<br/>너의 취향이 궁금하거든...',
      nextScene: 'clubScene',
      emotion: 'excited',
      easterEgg: 0,
    },
    {
      text: '음, 둘 다 먹어야지! 두 개 다 맛있을 거 같아.',
      nextScene: 'clubScene',
      emotion: 'excited',
    },
  ],
};
const cafeteriaScene: Scene = {
  choices: [
    {
      text: '나도, 너랑 먹으니까 괜히 맛있어',
      nextScene: 'clubScene',
      emotion: 'happy',
      easterEgg: 0,
    },
    {
      text: '그치만, 급식은 그냥 그런 맛인 것 같아. 평소랑 다를 게 없네...',
      nextScene: 'clubScene',
      emotion: 'sad',
    },
  ],
};

const clubScene: Scene = {
  choices: [
    {
      text: '시끌벅적 흥이 넘치는 밴드부',
      nextScene: 'rainScene',
      emotion: 'excited',
    },
    {
      text: '최신 영화를 즐겨보는 영화감상부',
      nextScene: 'rainScene',
      emotion: 'refresh',
    },
    {
      text: '조용하게 차를 즐기는 다도부',
      nextScene: 'rainScene',
      emotion: 'relaxed',
    },
  ],
};

const rainScene: Scene = {
  choices: [
    {
      text: '어, 내가 우산 갖고 있어. 같이 가자',
      nextScene: 'rainStopScene',
      emotion: 'happy',
    },
    {
      text: '혹시 우산 없으면 같이 기다릴까?<br/>비가 좀 그칠 때까지...',
      nextScene: 'rainStopScene',
      emotion: 'refresh',
      easterEgg: 0,
    },
    {
      text: '아쉽게도 우산은 없는데... 그냥 뛰어서 갈래?',
      nextScene: 'rainStopScene',
      emotion: 'refresh',
    },
  ],
};

const rainStopScene: Scene = {
  choices: [
    {
      text: '그래, 비도 그쳤으니까<br/>걷는 김에 집에 데려다줄게.',
      nextScene: 'nextDayScene',
      emotion: 'refresh',
      easterEgg: 0,
    },
    {
      text: '미안... 오늘은 좀 피곤해서, 먼저 집에 갈게',
      nextScene: 'nextDayScene',
      emotion: 'lonely',
    },
  ],
};

const arcadeScene: Scene = {
  choices: [
    {
      text: '계속 옆에 있었는데... 네가 너무 집중하고 있어서, 괜히 말 걸기 망설여졌어.',
      nextScene: 'cafeScene',
      emotion: 'sad',
    },
    {
      text: '헐, 너였어? 나 진짜 몰랐는데...<br/>여긴 어떻게 온 거야?',
      nextScene: 'cafeScene',
      emotion: 'excited',
    },
  ],
};
const movieScene: Scene = {
  choices: [
    {
      text: '그러게, 같이 봤으면 더 재밌었을 텐데.<br/>다음에는 같이 보자~ 약속!',
      nextScene: 'cafeScene',
      emotion: 'refresh',
    },
    {
      text: '사실... 나는 영화 혼자 보는 거 좋아해',
      nextScene: 'cafeScene',
      emotion: 'lonely',
    },
  ],
};

const bookstoreScene: Scene = {
  choices: [
    {
      text: '(얼굴이 붉어지며)<br/>응, 나도! 이렇게 우연히 만날 줄 몰랐어. 기분 진짜 좋다',
      nextScene: 'cafeScene',
      emotion: 'happy',
      easterEgg: 0,
    },
    {
      text: '어?! 이렇게 마주칠 줄은 몰랐어...<br/>사실, 조금 놀랐어',
      nextScene: 'cafeScene',
      emotion: 'refresh',
    },
  ],
};
const cafeScene: Scene = {
  choices: [
    {
      text: '신나는 댄스 음악 듣는 걸 좋아해.<br/>기분 좋을 때 듣기 딱 좋아',
      nextScene: 'lastChoiceScene',
      emotion: 'refresh',
    },
    {
      text: '클래식이나 어쿠스틱 음악을 많이 들어.<br/>차분한 분위기에서 힐링되는 느낌이 좋아',
      nextScene: 'lastChoiceScene',
      emotion: 'lonely',
    },
    {
      text: '슬픈 노래 들으면서 우는 걸 좋아해.<br/>그런 노래가 위로가 되는 것 같아.',
      nextScene: 'lastChoiceScene',
      emotion: 'lonely',
    },
  ],
};
const busScene: Scene = {
  choices: [
    {
      text: '오, 진짜? 나도 오늘 즐거웠어!<br/>월요일에 같이 가면 좋겠다. 기대된다!',
      nextScene: 'resultScene',
      emotion: 'happy',
    },
    {
      text: '월요일에는 친구랑 약속이 있어서...<br/>다음에 꼭 같이 가자!',
      nextScene: 'resultScene',
      emotion: 'lonely',
    },
  ],
};
const parkScene: Scene = {
  choices: [
    {
      text: '고마워. 나도 너무 좋아! 오늘부터 1일이다!',
      nextScene: 'loveScene',
      emotion: 'excited',
    },
    {
      text: '나는... 우리 그냥 친구로 지내는게 좋을 것 같아. 친구 이상은 아닌 것 같아...',
      nextScene: 'breakScene',
      emotion: 'sad',
    },
  ],
};

const resultScene: Scene = {
  choices: [
    {
      text: '',
      nextScene: '',
      emotion: '',
    },
  ],
};

document.addEventListener('DOMContentLoaded', () => {
  let nextBtn = document.querySelector('.next-btn') as HTMLElement;
  let prevBtn = document.querySelector('.prev-btn') as HTMLElement;
  let characterImg = document.getElementById('character-img') as HTMLImageElement;
  // prevBtn.style.display = 'none';

  const lines = document.querySelectorAll(
    '.conversation-box > .line',
  ) as NodeListOf<HTMLElement>;

  const genderCheck = localStorage.getItem('gender');
  const userName = localStorage.getItem('userName') as string;
  const nameTags = document.querySelectorAll('.char-name') as NodeListOf<HTMLElement>;
  if (genderCheck === '여자') {
    nameTags.forEach((nameTag) => {
      nameTag.innerHTML = '유키';
    });
  } else {
    nameTags.forEach((nameTag) => {
      nameTag.innerHTML = '카이';
    });
  }

  const userNameTags = document.querySelectorAll('.user-name') as NodeListOf<HTMLElement>;
  userNameTags.forEach((userNameTag) => {
    userNameTag.innerHTML = userName;
  });

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

    const highScore: string[] = resultEmotionScore(emotionScores);
    const emotionIndex: number = highScore.length;
    let emotionPick: string;

    if (emotionIndex !== 1) {
      const emotionIndex = Math.floor(Math.random() * highScore.length);
      emotionPick = highScore[emotionIndex];
    } else {
      emotionPick = highScore[0];
    }

    localStorage.setItem('highScore', emotionPick);
    if (sceneId === 'nextDayScene') {
      switch (emotionPick) {
        case 'happy':
        case 'excited':
          sceneId = 'arcadeScene';
          break;
        case 'refresh':
        case 'relaxed':
          sceneId = 'movieScene';
          break;
        case 'lonely':
        case 'sad':
          sceneId = 'bookstoreScene';
          break;
      }
    }

    if (sceneId === 'lastChoiceScene') {
      if (easterEggScore >= 5) {
        sceneId = 'parkScene';
      } else {
        sceneId = 'busScene';
      }
    }

    console.log(sceneId);

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

    // 버튼 태그 재할당
    nextBtn = section.querySelector('.next-btn') as HTMLElement;
    prevBtn = section.querySelector('.prev-btn') as HTMLElement;
    // prevBtn.style.display = 'none';

    const newNextBtn = nextBtn.cloneNode(true) as HTMLElement;
    const newPrevBtn = prevBtn.cloneNode(true) as HTMLElement;

    nextBtn.replaceWith(newNextBtn);
    prevBtn.replaceWith(newPrevBtn);

    newNextBtn.addEventListener('click', handleNext);
    newPrevBtn.addEventListener('click', handlePrev); // 이것도 동일하게 수정

    // 이미지 태그 재할당
    characterImg = section.querySelector('#character-img') as HTMLImageElement;
  }

  function handleChoice(emotion: string): void {
    emotionScores[emotion as keyof EmotionScores]++;
    console.log(`선택한 감정: ${emotion}`);
    console.log('현재 감정 점수:', { ...emotionScores });
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
      choiceBtn.className = `${choice}`;

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
        handleChoice(choice.emotion);
        moveToScene(choice.nextScene);

        // 이스터에그 점수 저장
        if (choice.easterEgg !== undefined) {
          easterEggScore++;
          console.log('이스터에그', easterEggScore);
        }
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
      case 'hallwayWindowScene':
        return hallwayWindowScene;
      case 'stallScene':
        return stallScene;
      case 'cafeteriaScene':
        return cafeteriaScene;
      case 'clubScene':
        return clubScene;
      case 'rainScene':
        return rainScene;
      case 'rainStopScene':
        return rainStopScene;
      case 'arcadeScene':
        return arcadeScene;
      case 'movieScene':
        return movieScene;
      case 'bookstoreScene':
        return bookstoreScene;
      case 'cafeScene':
        return cafeScene;
      case 'busScene':
        return busScene;
      case 'parkScene':
        return parkScene;
      case 'resultScene':
        return resultScene;
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
    const nowNameTag = section.querySelector('.name-tag') as HTMLElement;
    if (index < lines.length - 1) {
      prevIndex.push(index);
      lines[index].style.display = 'none';
      index++;
      if (index >= 1) {
        prevBtn.style.display = 'block';
      }
      if (lines[index].querySelector('.sr-only')) {
        nowNameTag.style.display = 'none';
      } else {
        nowNameTag.style.display = 'block';
      }
      if (lines[index].classList.contains('changeScene')) {
        const nowScene = section.dataset.prolog;
        switch (nowScene) {
          case 'classNoteScene':
            section.style.background =
              'url(/assets/img/room.webp) center center / cover no-repeat';
            break;
          case 'arcadeScene':
            section.style.background =
              'url(/assets/img/arcadeScene.webp) center center / cover no-repeat';
            break;
          case 'movieScene':
            section.style.background =
              'url(/assets/img/movieScene.webp) center center / cover no-repeat';
            break;
          case 'bookstoreScene':
            section.style.background =
              'url(/assets/img/bookstoreScene.webp) center center / cover no-repeat';
            break;
          case 'cafeScene':
            section.style.background =
              'url(/assets/img/cafeScene.webp) center center / cover no-repeat';
            break;
          case 'parkScene':
            section.style.background =
              'url(/assets/img/parkLoveScene.gif) center center / cover no-repeat';
            break;
        }
      }
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
      if (lines[index].classList.contains('changeScene')) {
        const nowScene = section.dataset.prolog;
        switch (nowScene) {
          case 'classNoteScene':
            section.style.background =
              'url(/public/assets/img/classNoteScene.webp) center center / cover no-repeat';
            break;
          case 'arcadeScene':
            section.style.background =
              'url(/public/assets/img/nextday.webp) center center / cover no-repeat';
            break;
          case 'movieScene':
            section.style.background =
              'url(/public/assets/img/nextday.webp) center center / cover no-repeat';
            break;
          case 'bookstoreScene':
            section.style.background =
              'url(/public/assets/img/nextday.webp) center center / cover no-repeat';
            break;
          case 'cafeScene':
            section.style.background =
              'url(/public/assets/img/clouds.webp) center center / cover no-repeat';
            break;
          case 'parkScene':
            section.style.background =
              'url(/public/assets/img/parkScene.webp) center center / cover no-repeat';
            break;
        }
      }
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
    const emotion = line.dataset.emotion as keyof Emotion | undefined;
    characterImg.style.opacity = '1';
    if (emotion) {
      if (genderCheck === '여자') {
        const filename = girlEmotionImages[emotion];
        characterImg.src = `/assets/img/${filename}`;
      } else if (genderCheck === '남자') {
        const filename = boyEmotionImages[emotion];
        characterImg.src = `/assets/img/${filename}`;
      }
    } else {
      characterImg.style.opacity = '0';
    }
  }
});
