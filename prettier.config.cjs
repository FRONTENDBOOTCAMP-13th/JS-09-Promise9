const config = {
  // 문자열에 single quote 사용(기본값 false)
  singleQuote: true,
  // 코드 마지막에 세미콜론 추가(기본값 true)
  semi: true,
  // 들여쓰기를 탭으로 지정할지 여부(기본값 false)
  useTabs: false,
  // 들여쓰기 너비 2칸(기본값 2)
  tabWidth: 2,
  // 여러 줄의 쉼표로 구분된 구문 구조에서 후행 쉼표를 추가(none: 설정 안함, es5: 객체,배열에 설정, all(기본값): 함수 정의나 호출 등 가능한 모든 곳에 설정)
  trailingComma: 'all',
  // 한줄에 80 글자가 넘어가면 줄바꿈(기본값 80)
  printWidth: 120,
  // 화살표 함수의 매개변수가 하나만 지정될 때 괄호 생략(always: 항상 괄호 명시, avoid: 가능하면 생략)
  arrowParens: 'always',
  // windows에 뜨는 'Delete cr' 에러 해결
  endOfLine: 'auto',
};

module.exports = config;
