type Emotion = 'relax' | 'happy' | 'sad' | 'lonely' | 'excited' | 'fresh';

interface Choice {
  text: string;
  nextScene: string;
  emotion: Emotion;
  easterEgg?: number;
}

interface Scene {
  lines: string[];
  choices: Choice[];
}

const emotionScores: Record<Emotion, number> = {
  relax: 0,
  happy: 0,
  sad: 0,
  lonely: 0,
  excited: 0,
  fresh: 0,
};

const scene1: Scene = {
  lines: ['[등굣길]', '어...? 얼굴이 조금 피곤해 보여...<br/>설마 어제 잠 못 잔거야?'],
  choices: [
    { text: '영화 보기', nextScene: 'movieScene', emotion: 'relax' },
    { text: '카페 가기', nextScene: 'cafeScene', emotion: 'happy' },
    { text: '그냥 집에 있기', nextScene: 'homeScene', emotion: 'sad', easterEgg: 0 },
  ],
};

/**
 * handleChoice
 * 사용자가 선택한 감정(choice.emotion)의 점수를 1 증가시킴
 *
 * @param {Choice} choice - 사용자가 고른 선택지 정보
 * @returns {void}
 */
export function handleChoice(choice: Choice): void {
  emotionScores[choice.emotion]++;
  console.log(`[감정 점수] ${choice.emotion}: ${emotionScores[choice.emotion]}`);
}
