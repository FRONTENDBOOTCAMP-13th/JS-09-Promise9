type Emotion = 'relax' | 'happy' | 'sad' | 'lonely' | 'excited' | 'fresh';

interface Choice {
  text: string;
  nextScene: string;
  emotion: Emotion;
  easterEgg?: number;
}

type EmotionScores = Record<Emotion, number>;

const emotionScores: EmotionScores = {
  relax: 0,
  happy: 0,
  sad: 0,
  lonely: 0,
  excited: 0,
  fresh: 0,
};

// 감정 점수 저장
function handleChoice(choice: Choice): void {
  emotionScores[choice.emotion]++;
  console.log(`선택한 감정: ${choice.emotion}`);
  console.log('현재 감정 점수:', { ...emotionScores });
}

// 버튼 클릭 이벤트 등록
export function attachChoiceHandler(containerSelector: string): void {
  const buttons = document.querySelectorAll(`${containerSelector} button`);

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const emotion = button.dataset.emotion as Emotion;
      const nextScene = button.dataset.nextScene || '';
      const text = button.textContent || '';

      if (!emotion || !nextScene) {
        console.warn('❗ 버튼에 data-emotion 또는 data-next-scene 누락');
        return;
      }

      const choice: Choice = { text, emotion, nextScene };
      handleChoice(choice);
    });
  });
}

// 가장 높은 점수의 감정 반환
export function resultEmotionScore(scores: EmotionScores): string[] {
  let highScore = -1;
  let resultEmotion: string[] = [];

  for (const emotion in scores) {
    const score = scores[emotion as Emotion];
    if (score > highScore) {
      highScore = score;
      resultEmotion = [emotion];
    } else if (score === highScore) {
      resultEmotion.push(emotion);
    }
  }

  return resultEmotion;
}

// 현재 점수 복사해서 가져오기
export function getCurrentScores(): EmotionScores {
  return { ...emotionScores };
}
