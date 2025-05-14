// -----------------------------
//      타입 지정 및 객체 설정
// -----------------------------

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
      url: 'https://www.youtube.com/embed/B9kmcigMv-M?enablejsapi=1',
      title: 'I Am Better Off',
      singer: 'Wildson',
      img: 'happy04.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/2sy3H9rnk9A?enablejsapi=1',
      title: 'サムライハ-ト(Some Like It Hot!!)',
      singer: 'スパイエアー(SPYAIR)',
      img: 'happy05.jpg',
    },
  ],

  sad: [
    {
      url: 'https://www.youtube.com/embed/WbhK3wMXluE?enablejsapi=1',
      title: 'Bye bye my blue',
      singer: '백예린',
      img: 'sad01.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/EwLMA5XYnKI?enablejsapi=1',
      title: 'I Loved You',
      singer: 'DAY6',
      img: 'sad02.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/q4CbHfW3Ji8?enablejsapi=1',
      title: 'スパークル',
      singer: '幾田りら',
      img: 'sad03.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/2bsWj69jhAo?enablejsapi=1',
      title: '나무 (Always)',
      singer: '박종민',
      img: 'sad04.jpg',
    },
    {
      url: 'https://www.youtube.com/embed/OyTIMOlY1ag?enablejsapi=1',
      title: '12:45',
      singer: 'Etham',
      img: 'sad05.jpg',
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
  sad: 6, // 예시 점수
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

// -----------------------------
//      함수 정의
// -----------------------------

/**
 * 주어진 감정에 해당하는 플레이리스트에서 랜덤한 노래 하나를 반환
 *
 * @function getRandomSong
 * @param {PlayLists} playLists - 감정별로 분류된 노래 목록
 * @param {string} mood - 감정 키 (예: 'happy', 'sad')
 * @returns {Song} 감정 키에 따라 무작위로 선택된 노래 객체
 * @throws {Error} 해당 감정에 대한 노래 목록이 없거나 비어있을 경우
 */

function getRandomSong(playLists: PlayLists, mood: string): Song {
  const resultSongs = playLists[mood];
  const randomIndex = Math.floor(Math.random() * resultSongs.length);

  return resultSongs[randomIndex];
}

/**
 * 전달받은 노래와 감정에 따라 음악 관련 UI를 업데이트
 *
 * @function updateMusic
 * @param {Song} song - 선택된 노래 객체
 * @param {string} mood - 감정 키 (예: 'happy', 'sad')
 * @returns {void}
 */

function updateMusic(song: Song, mood: string) {
  const musicLists = document.querySelector('.musiclists-wrap') as HTMLElement;
  const musicImg = document.querySelector('.music-box img') as HTMLImageElement;
  const musicTitle = document.querySelector('.music-box .music-title') as HTMLElement;
  const musicSinger = document.querySelector('.music-box .music-singer') as HTMLElement;
  const musicIframe = document.querySelector('#youtubePlayer') as HTMLIFrameElement;
  // 감정 클래스 추가
  musicLists.classList.add(mood);

  // UI업데이트
  musicImg.src = `/assets/img/playlists/${song.img}`;
  musicTitle.textContent = song.title;
  musicSinger.textContent = song.singer;

  // Iframe업데이트
  musicIframe.src = song.url;
}

// -----------------------------
//      함수 호출
// -----------------------------
const resultEmotion = resultEmotionScore(emotionScores);
const randomSong = getRandomSong(playLists, resultEmotion);
console.log(randomSong);

updateMusic(randomSong, resultEmotion);
