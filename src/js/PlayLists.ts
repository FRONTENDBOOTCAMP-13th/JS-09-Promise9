// 노래 정보를 담는 타입
type Song = {
  url: string;
  title: string;
  singer: string;
  img: string;
};

// 감정 키(happy, sad 등)를 기준으로 분류된 노래 목록
type PlayLists = {
  [mood: string]: Song[];
};

// 감정에 따른 플레이리스트
const playLists: PlayLists = {
  // https://www.youtube.com/embed/3yaab2_EEHM?enablejsapi=1',  // 아이스크림
  // https://www.youtube.com/embed/3yaab2_EEHM?si=6I6RbZnSLEpTUR__
  happy: [
    {
      url: 'https://www.youtube.com/embed/A9MjGpCRmoQ?enablejsapi=1',
      title: 'SMILEY(Feat.BIBI)',
      singer: 'YENA(최예나)',
      img: 'happy01.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/mBXBOLG06Wc?enablejsapi=1',
      title: '파이팅 해야지(Feat.이영지)',
      singer: '부석순(SEVENTEEN)',
      img: 'happy02.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/Ry1RrIVyl1M?enablejsapi=1',
      title: '너에게 닿기를',
      singer: '10CM',
      img: 'happy03.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/9Ibf10h9U0c?enablejsapi=1',
      title: 'I Am Better Off',
      singer: 'Wildson',
      img: 'happy04.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/Ry1RrIVyl1M?enablejsapi=1',
      title: '恋愛サーキュレーション ("化物語"OP)',
      singer: '花澤香菜',
      img: 'happy05.jpg',
    },
  ],

  sad: [
    {
      url: 'https://www.youtube.com/embed/3yaab2_EEHM?enablejsapi=1',
      title: '잘 지내자, 우리',
      singer: '최유리',
      img: 'sad01.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/PuPF5WXlNYU?enablejsapi=1',
      title: '혼자인 밤',
      singer: '태연',
      img: 'sad02.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/a-NR-ZAOvZ4?enablejsapi=1',
      title: '눈물이 차올라서',
      singer: '백지영',
      img: 'sad03.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/V0I5eglJMRI?enablejsapi=1',
      title: 'You Were Beautiful',
      singer: 'DAY6',
      img: 'sad04.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/V0I5eglJMRI?enablejsapi=1',
      title: 'You Were SAd',
      singer: 'DAY6',
      img: 'sad04.jpg',
    },
  ],
};

// -----------------------------------샛별님 함수 쓸 예정

// 감정별 점수를 나타내는 타입
type EmotionScores = {
  [emotion: string]: number;
};

// 감정별 점수 객체 (예시 값)
const emotionScores: EmotionScores = {
  happy: 5, // 예시 점수
  sad: 1, // 예시 점수
};

/**
 * 감정 점수 중 가장 높은 감정을 반환
 *
 * @function resultEmotionScore
 * @param {EmotionScores} scores - 감정별 점수 객체
 * @returns {string} 가장 점수가 높은 감정 키(happy, sad 등)
 */

function resultEmotionScore(scores: EmotionScores): string {
  let highScore = -1;
  let resultEmotion = '';

  for (const emotion in scores) {
    const score = scores[emotion];
    if (score > highScore) {
      highScore = score;
      resultEmotion = emotion;
    }
  }

  return resultEmotion;
}

// -----------------------------------
