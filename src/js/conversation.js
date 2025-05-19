const lines = document.querySelectorAll('.conversation-box > .line');
const girlTalk = document.querySelector('.conversation-wrap');
const selectBox = document.querySelector('.user-select');
const characterImg = document.getElementById('character-img');

const emotionImages = {
  default: 'girl-default.png',
  sad: 'girl-sad.png',
  happy: 'girl-happy.png',
  concern: 'girl-concern.png',
  neutral: 'girl-neutral.png',
};

let index = 0;

// 처음엔 모든 줄 숨기기
lines.forEach((line) => (line.style.display = 'none'));
if (lines.length > 0) {
  lines[0].style.display = 'block';
  // updateImg(lines[0]);
}

document.addEventListener('click', () => {
  if (index < lines.length - 1) {
    lines[index].style.display = 'none';
    index++;
    lines[index].style.display = 'block';
    updateImg(lines[index]);
  } else {
    lines[index].style.display = 'none';
    girlTalk.style.display = 'none';
    selectBox.style.display = 'block';
  }
});

function updateImg(line) {
  const emotion = line.dataset.emotion || 'default';
  const filename = emotionImages[emotion] || emotionImages.default;
  characterImg.src = `/public/assets/img/${filename}`;
}

const scenes = {
  scene1: {
    text: '오늘 뭐 하고 싶어?',
    easterEgg: 0,
    choices: [
      { text: '영화 보기', nextScene: 'movieScene', emotion: 'relax' },
      { text: '카페 가기', nextScene: 'cafeScene', emotion: 'happy' },
      { text: '그냥 집에 있기', nextScene: 'homeScene', emotion: 'sad' },
      { text: '영화 보기', nextScene: 'movieScene', emotion: 'lonely' },
      { text: '카페 가기', nextScene: 'cafeScene', emotion: 'excited' },
      { text: '그냥 집에 있기', nextScene: 'homeScene', emotion: 'fresh' },
    ],
  },
};
