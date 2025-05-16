// .env 파일에 저장한 VITE_API_KEY를 가져옴.
const kakaoShare = import.meta.env.VITE_API_KEY;

// TypeScript에서 window.Kakao가 존재한다고 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

// SDK 초기화
window.addEventListener('DOMContentLoaded', () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init(kakaoShare);
  }
});

//

const shareBtn = document.querySelector('#shareBtn');

shareBtn?.addEventListener('click', () => {
  const resultUserName = document.querySelector('.result-title')?.textContent; // ~~에게 어울리는 ... 텍스트
  const musicTitle = document.querySelector('.music-title')?.textContent; // 노래 제목
  const musicSinger = document.querySelector('.music-singer')?.textContent; // 가수
  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: resultUserName, // 제목
      description: `${musicTitle} - ${musicSinger}`, // 내용
      imageUrl: 'https://dokidoki-playlists.netlify.app/assets/img/preview.jpg', // 카드 대표 이미지
      link: {
        mobileWebUrl: 'http://localhost:5173/src/pages/main.html', // 클릭시 들어갈 홈페이지
        webUrl: 'http://localhost:5173/src/pages/main.html',
      },
    },
    buttons: [
      {
        title: '내 기분 보러 가기', // 공유하기 눌렀을 때 버튼
        link: {
          //버튼 눌렀을 때 접속하는 경로
          mobileWebUrl: 'http://localhost:5173/src/pages/main.html',
          webUrl: 'http://localhost:5173/src/pages/main.html',
        },
      },
    ],
  });
});
