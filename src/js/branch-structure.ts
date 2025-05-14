import "../style.css";

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
  default: "girl-default.png",
  sad: "girl-sad.png",
  happy: "girl-happy.png",
  concern: "girl-concern.png",
  neutral: "girl-neutral.png",
};

const scene1: Scene = {
  choices: [
    { text: "영화 보기", nextScene: "movieScene", emotion: "relax" },
    { text: "카페 가기", nextScene: "libraryScene", emotion: "happy" },
    {
      text: "그냥 집에 있기",
      nextScene: "homeScene",
      emotion: "sad",
      easterEgg: 0,
    },
  ],
};

const movieScene: Scene = {
  choices: [
    { text: "ㅁㅁㅁ 보기", nextScene: "movieScene", emotion: "relax" },
    { text: "ㄴㄴㄴ 가기", nextScene: "libraryScene", emotion: "happy" },
    {
      text: "ㅇㅇㅇ 집에 있기",
      nextScene: "homeScene",
      emotion: "sad",
      easterEgg: 0,
    },
  ],
};
const libraryScene: Scene = {
  choices: [
    { text: "도서관보기", nextScene: "movieScene", emotion: "relax" },
    { text: "도서서ㄴ 가기", nextScene: "cafeScene", emotion: "happy" },
    {
      text: "ㅇㅇㅇ 집에 있기",
      nextScene: "homeScene",
      emotion: "sad",
      easterEgg: 0,
    },
  ],
};

document.addEventListener("DOMContentLoaded", () => {
  let nextBtn = document.querySelector(".next-btn") as HTMLElement;
  let prevBtn = document.querySelector(".prev-btn") as HTMLElement;

  const lines = document.querySelectorAll(
    ".conversation-box > .line"
  ) as NodeListOf<HTMLElement>;
  const girlTalk = document.querySelector(".line-box") as HTMLElement;
  const selectBox = document.querySelector(
    ".user-select .select-box"
  ) as HTMLUListElement;
  const characterImg = document.getElementById(
    "character-img"
  ) as HTMLImageElement;

  let index = 0;
  let prevIndex: number[] = [];

  // 처음엔 모든 줄 숨기기
  lines.forEach((line) => (line.style.display = "none"));
  if (lines.length > 0) {
    lines[0].style.display = "block";
    // updateImg(lines[0]);
  }

  function moveToScene(sceneId: string) {
    // 모든 섹션 숨기기
    const allSections = document.querySelectorAll(
      ".playlists-wrap"
    ) as NodeListOf<HTMLElement>;
    allSections.forEach((section) => {
      section.style.display = "none";
    });

    // 섹션 찾기
    const section = document.querySelector(
      `section[data-prolog="${sceneId}"]`
    ) as HTMLElement;

    if (section) {
      section.style.display = "block";

      const lines = section.querySelectorAll(
        ".conversation-box > .line"
      ) as NodeListOf<HTMLElement>;

      // 대사 가리기
      lines.forEach((line) => (line.style.display = "none"));

      // 첫번째 대사 보이기
      if (lines.length > 0) {
        index = 0;
        prevIndex = [];
        lines[0].style.display = "block";
        updateImg(lines[0]);
      }
    }

    nextBtn = section.querySelector(".next-btn") as HTMLElement;
    prevBtn = section.querySelector(".prev-btn") as HTMLElement;

    const newNextBtn = nextBtn.cloneNode(true) as HTMLElement;
    const newPrevBtn = prevBtn.cloneNode(true) as HTMLElement;

    nextBtn.replaceWith(newNextBtn);
    prevBtn.replaceWith(newPrevBtn);

    newNextBtn.addEventListener("click", handleNext);
    newPrevBtn.addEventListener("click", handlePrev); // 이것도 동일하게 수정
  }

  // 선택지 함수
  function showChoices(scene: Scene) {
    selectBox.innerHTML = "";

    scene.choices.forEach((choice) => {
      const choiceLi = document.createElement("li");
      const choiceBtn = document.createElement("button");

      choiceBtn.textContent = choice.text;

      choiceBtn.addEventListener("click", () => {
        // 현재 선택지 숨기기
        const userSelect = document.querySelector(
          ".user-select"
        ) as HTMLElement;
        userSelect.style.display = "none";

        // 현재 씬 찾기
        const targetSection = document.querySelector(
          `section[data-prolog="${choice.nextScene}"]`
        ) as HTMLElement;

        if (targetSection) {
          // 섹션 숨기기
          const allSections = document.querySelectorAll(
            ".playlists-wrap"
          ) as NodeListOf<HTMLElement>;
          allSections.forEach((section) => {
            section.style.display = "none";
          });

          // 선택한 섹션 보이기
          targetSection.style.display = "block";
        }
        index = 0;
        prevIndex = [];

        // 다음 질문지로 넘아가는 로직
        moveToScene(choice.nextScene);
      });

      choiceLi.appendChild(choiceBtn);
      selectBox.appendChild(choiceLi);
    });
  }

  // 씬 매핑을 위한 간단한 함수 사용
  function getSceneByPrologId(prologId: string): Scene {
    switch (prologId) {
      case "movieScene":
        return movieScene;
      case "libraryScene":
        return libraryScene;
      // 다른 씬들 추가 가능
      default:
        return scene1; // 기본 씬
    }
  }

  function handleNext() {
    const section = document.querySelector(
      '.playlists-wrap[style*="display: block"]'
    ) as HTMLElement;
    const lines = section.querySelectorAll(
      ".conversation-box > .line"
    ) as NodeListOf<HTMLElement>;

    if (index < lines.length - 1) {
      prevIndex.push(index);
      lines[index].style.display = "none";
      index++;
      lines[index].style.display = "block";
      updateImg(lines[index]);
    } else {
      lines[index].style.display = "none";
      girlTalk.style.display = "none";

      // 현재 씬 찾기
      const currentSection = document.querySelector(
        '.playlists-wrap[style*="display: block"]'
      ) as HTMLElement;
      if (currentSection) {
        const currentSceneId = currentSection.getAttribute("data-prolog");
        if (currentSceneId) {
          showChoices(getSceneByPrologId(currentSceneId));
        } else {
          showChoices(scene1);
        }
      } else {
        showChoices(scene1);
      }

      const userSelect = document.querySelector(".user-select") as HTMLElement;
      userSelect.style.display = "block";
    }
  }

  function handlePrev() {
    if (prevIndex.length > 0) {
      lines[index].style.display = "none";
      index = prevIndex.pop()!;
      lines[index].style.display = "block";
      updateImg(lines[index]);
      const userSelect = document.querySelector(".user-select") as HTMLElement;
      if (userSelect.style.display === "block") {
        userSelect.style.display = "none";
        girlTalk.style.display = "block";
        const selectBox = document.querySelector(".select-box") as HTMLElement;
        selectBox.style.display = "none";
      }
    }
  }

  nextBtn.addEventListener("click", () => {
    handleNext();
  });

  prevBtn.addEventListener("click", () => {
    handlePrev();
  });

  function updateImg(line: HTMLElement) {
    const emotion = line.dataset.emotion || "default";
    const filename = emotionImages[emotion as keyof emotionsBgImg];
    characterImg.src = `/src/assets/img/${filename}`;
  }
});
