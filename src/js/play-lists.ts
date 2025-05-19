// ==========================================
//              타입 지정 및 데이터
// ==========================================

// 노래 정보를 담는 타입 정의
type Song = {
  url: string; // 유튜브 영상 URL
  title: string; // 노래 제목
  singer: string; // 가수 이름
  img: string; // 썸네일 이미지 파일명
};

// 감정별로 분류된 노래 리스트 타입 정의
type PlayLists = {
  [mood: string]: Song[];
};

// 감정에 따른 플레이리스트
const playLists: PlayLists = {
  happy: [
    {
      url: 'https://www.youtube.com/embed/A9MjGpCRmoQ?enablejsapi=1',
      title: 'SMILEY(Feat.BIBI)',
      singer: 'YENA(최예나)',
      img: 'happy01.webp',
    },
    {
      url: 'https://www.youtube.com/embed/mBXBOLG06Wc?enablejsapi=1',
      title: '파이팅 해야지(Feat.이영지)',
      singer: '부석순(SEVENTEEN)',
      img: 'happy02.webp',
    },
    {
      url: 'https://www.youtube.com/embed/Ry1RrIVyl1M?enablejsapi=1',
      title: '너에게 닿기를',
      singer: '10CM',
      img: 'happy03.webp',
    },
    {
      url: 'https://www.youtube.com/embed/B9kmcigMv-M?enablejsapi=1',
      title: 'I Am Better Off',
      singer: 'Wildson',
      img: 'happy04.webp',
    },
    {
      url: 'https://www.youtube.com/embed/2sy3H9rnk9A?enablejsapi=1',
      title: 'サムライハ-ト(Some Like It Hot!!)',
      singer: 'スパイエアー(SPYAIR)',
      img: 'happy05.webp',
    },
  ],

  sad: [
    {
      url: 'https://www.youtube.com/embed/WbhK3wMXluE?enablejsapi=1',
      title: 'Bye bye my blue',
      singer: '백예린',
      img: 'sad01.webp',
    },
    {
      url: 'https://www.youtube.com/embed/_ic_YorjjAY?enablejsapi=1',
      title: 'I Loved You',
      singer: 'DAY6',
      img: 'sad02.webp',
    },
    {
      url: 'https://www.youtube.com/embed/q4CbHfW3Ji8?enablejsapi=1',
      title: 'スパークル',
      singer: '幾田りら',
      img: 'sad03.webp',
    },
    {
      url: 'https://www.youtube.com/embed/2bsWj69jhAo?enablejsapi=1',
      title: '나무 (Always)',
      singer: '박종민',
      img: 'sad04.webp',
    },
    {
      url: 'https://www.youtube.com/embed/OyTIMOlY1ag?enablejsapi=1',
      title: '12:45',
      singer: 'Etham',
      img: 'sad05.webp',
    },
  ],

  excited: [
    {
      url: 'https://www.youtube.com/embed/3yaab2_EEHM?enablejsapi=1',
      title: '愛♡スクリ～ム！',
      singer: 'AiScReam',
      img: 'excited01.webp',
    },
    {
      url: 'https://www.youtube.com/embed/RuCTeTMEtAk?enablejsapi=1',
      title: 'poppop',
      singer: 'NCT WISH',
      img: 'excited02.webp',
    },
    {
      url: 'https://www.youtube.com/embed/cQY5brXxEig?enablejsapi=1',
      title: 'Super Shy',
      singer: 'NewJeans',
      img: 'excited03.webp',
    },
    {
      url: 'https://www.youtube.com/embed/jhOVibLEDhA?enablejsapi=1',
      title: '恋(Koi)',
      singer: 'Gen Hoshino(星野 源)',
      img: 'excited04.webp',
    },
    {
      url: 'https://www.youtube.com/embed/AtUNXZNgZ3w?enablejsapi=1',
      title: 'JACKPOT',
      singer: '블락비',
      img: 'excited05.webp',
    },
  ],

  relaxed: [
    {
      url: 'https://www.youtube.com/embed/uG2se-8-BzE?enablejsapi=1',
      title: '기다린 만큼, 더',
      singer: '검정치마',
      img: 'relaxed01.webp',
    },
    {
      url: 'https://www.youtube.com/embed/_XFuXLliXlY?enablejsapi=1',
      title: '사랑 없이 사는게 왜 그렇게 어려울까요',
      singer: '겸',
      img: 'relaxed02.webp',
    },
    {
      url: 'https://www.youtube.com/embed/COcuU8LKawk?enablejsapi=1',
      title: '숲',
      singer: '최유리',
      img: 'relaxed03.webp',
    },
    {
      url: 'https://www.youtube.com/embed/bL0Y4C76mCs?enablejsapi=1',
      title: "You Can't Control Who You Fall For",
      singer: 'Victor Lundberg',
      img: 'relaxed04.webp',
    },
    {
      url: 'https://www.youtube.com/embed/AjW_F-mkfU0?enablejsapi=1',
      title: 'Aoiito',
      singer: 'Awaku,Moroku.',
      img: 'relaxed05.webp',
    },
  ],

  refresh: [
    {
      url: 'https://www.youtube.com/embed/pERDk4KoW-s?enablejsapi=1',
      title: 'Antifreeze',
      singer: '백예린',
      img: 'refresh01.webp',
    },
    {
      url: 'https://www.youtube.com/embed/G36dgsEKAQQ?enablejsapi=1',
      title: 'Waving At Cars',
      singer: 'Isac Elliot',
      img: 'refresh02.webp',
    },
    {
      url: 'https://www.youtube.com/embed/U7c4y4qvBGk?enablejsapi=1',
      title: '내 이름 맑음',
      singer: 'QWER ',
      img: 'refresh03.webp',
    },
    {
      url: 'https://www.youtube.com/embed/5IlZ-dBItAY?enablejsapi=1',
      title: '한강에서',
      singer: '폴킴',
      img: 'refresh04.webp',
    },
    {
      url: 'https://www.youtube.com/embed/Kq4dbZJakMs?enablejsapi=1',
      title: 'blue',
      singer: 'yung kai',
      img: 'refresh05.webp',
    },
  ],

  lonely: [
    {
      url: 'https://www.youtube.com/embed/4QDEWNg5hAM?enablejsapi=1',
      title: 'Secret Base~君がくれたもの~',
      singer: '茅野愛衣, 戸松遥, 早見沙織',
      img: 'lonely01.webp',
    },
    {
      url: 'https://www.youtube.com/embed/45rc4Goo2dw?enablejsapi=1',
      title: 'Fine Thank You And You?',
      singer: '10CM',
      img: 'lonely02.webp',
    },
    {
      url: 'https://www.youtube.com/embed/XikFceAeBII?enablejsapi=1',
      title: '아무것도 상관없어',
      singer: '허회경',
      img: 'lonely03.webp',
    },
    {
      url: 'https://www.youtube.com/embed/EjMTw4xLcBI?enablejsapi=1',
      title: '밤편지',
      singer: '아이유(IU)',
      img: 'lonely04.webp',
    },
    {
      url: 'https://www.youtube.com/embed/4Fx76jjQCro?enablejsapi=1',
      title: '외로움이라는 건',
      singer: '최유리',
      img: 'lonely05.webp',
    },
  ],
};

// ==========================================
//                  함수 정의
// ==========================================

/**
 *  주어진 감정 키에 해당하는 노래 목록에서 무작위로 하나를 선택
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
 * 전달받은 노래 정보로 UI를 업데이트
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

// ==========================================
//              실행 로직 (시작점)
// ==========================================

// 1. 로컬스토리지에서 감정 점수 가져오기
const highScoreMusic = localStorage.getItem('highScore') as string;

// 2. 감정에 해당하는 노래 중 무작위로 하나 선택
const randomSong = getRandomSong(playLists, highScoreMusic);

// 3. UI에 음악 정보 적용
updateMusic(randomSong, highScoreMusic);
