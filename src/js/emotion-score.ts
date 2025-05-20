// 감정 타입 정의 (선택지에 들어갈 수 있는 감정 종류를 정함) : 유니온 타입..?
type Emotion = 'relaxed' | 'happy' | 'sad' | 'lonely' | 'excited' | 'refresh';

// 선택지에 들어갈 데이터 타입 정의
interface Choice {
  text: string; // 화면에 보이는 선택지 내용
  nextScene: string; // 이 선택지를 고르면 넘어갈 다음 씬 이름
  emotion: Emotion; // 이 선택지가 담고 있는 감정 (위에 정의한 값만 들어갈 수 있움!)
  easterEgg?: number; // 이스터에그 점수 (옵셔널)
}

// 감정 점수를 저장할 타입 정의 (각 감정에 숫자 점수)
export type EmotionScores = {
  relaxed: number;
  happy: number;
  sad: number;
  lonely: number;
  excited: number;
  refresh: number;
};

// 실제 감정 점수를 저장하는 객체 (처음에는 전부 0점)
export const emotionScores: EmotionScores = {
  relaxed: 0,
  happy: 0,
  sad: 0,
  lonely: 0,
  excited: 0,
  refresh: 0,
};

// 이스터에그 점수 저장 변수 (처음에는 0)
let easterEggScore = 0;

// 사용자가 선택지를 선택했을 때 감정 점수 1점씩 올리기 기능
function handleChoice(choice: Choice): void {
  // 선택한 감정 점수 1 증가
  emotionScores[choice.emotion]++;
  console.log(`선택한 감정: ${choice.emotion}`);
  console.log('현재 감정 점수:', { ...emotionScores });

  // 선택한 선택지에 easterEgg 값이 있으면 점수 1 증가
  if (choice.easterEgg !== undefined) {
    easterEggScore++;
    console.log('이스터에그! 고백에 한발짝 다가가기', easterEggScore);
  }
}

// HTML 안의 선택지 버튼들에 클릭 이벤트 연결
export function attachChoiceHandler(containerSelector: string): void {
  // containerSelector 안에 있는 모든 버튼 가져오기
  const buttons = document.querySelectorAll(
    `${containerSelector} button`,
  ) as NodeListOf<HTMLElement>;

  // 각각의 버튼에 클릭 이벤트 추가
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // 버튼에서 감정과 다음 씬 정보를 읽어오기 (dataset말고 다른 값 넣어야함..모르겠음!)
      const emotion = button.dataset.emotion as Emotion;
      const nextScene = button.dataset.nextScene || '';
      const text = button.textContent || '';

      // 선택지 정보 만들기
      const choice: Choice = { text, emotion, nextScene };

      // 감정 점수 저장 함수 실행
      handleChoice(choice);
    });
  });
}

// 🏆 가장 점수가 높은 감정을 배열로 반환
export function resultEmotionScore(scores: EmotionScores): string[] {
  let highScore = -1; // 가장 높은 점수 저장
  let resultEmotion: string[] = []; // 가장 점수 높은 감정들 저장할 배열

  // 모든 감정을 순회하면서 점수 비교
  for (const emotion in scores) {
    const score = scores[emotion as Emotion];

    if (score > highScore) {
      highScore = score;
      resultEmotion = [emotion]; // 새로운 최고 점수 감정만 저장
    } else if (score === highScore) {
      resultEmotion.push(emotion); // 점수가 같으면 추가
    }
  }

  return resultEmotion;
}

// 현재 감정 점수를 복사해서 외부에서 사용할 수 있도록 반환
export function getCurrentScores(): EmotionScores {
  return { ...emotionScores }; // 원본을 보호하기 위해 복사본을 반환
}
