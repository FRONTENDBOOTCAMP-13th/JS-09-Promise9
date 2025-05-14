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
