import './style.css';

declare global {
  interface Window {
    Kakao: any;
  }
}

// src/main.js
window.addEventListener('DOMContentLoaded', () => {
  if (window.Kakao && !window.Kakao.isInitialized()) {
    window.Kakao.init('86cb6870ba5e1ad20250f3ca448fd15f');
    console.log('Kakao SDK 초기화 완료!');
  }
});

const shareBtn = document.querySelector('#shareBtn');

shareBtn?.addEventListener('click', () => {
  window.Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '미연시 결과 💘',
      description: '너와 보낸 시간... 급식보다 달콤했어.',
      imageUrl: '/src/assets/img/girl-default.png', // 테스트용 이미지
      link: {
        mobileWebUrl: 'http://localhost:5173',
        webUrl: 'http://localhost:5173',
      },
    },
    buttons: [
      {
        title: '결과 보러 가기',
        link: {
          mobileWebUrl: 'http://localhost:5173',
          webUrl: 'http://localhost:5173',
        },
      },
    ],
  });
});
