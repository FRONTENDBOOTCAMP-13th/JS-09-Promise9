import html2canvas from 'html2canvas';

const target = document.querySelector('.musiclists-wrap') as HTMLElement;
const targetBtn = target.querySelector('.btn-wrap') as HTMLElement;
let viewWidth = window.innerWidth;

function captureResult() {
  target!.style.borderRadius = '0';
  targetBtn!.style.display = 'none';

  if (!target) return;

  html2canvas(target).then((canvas) => {
    const image = canvas.toDataURL('image/png');

    // 다운로드
    const link = document.createElement('a');
    link.href = image;
    link.download = 'result.png';
    link.click();
  });

  targetBtn!.style.display = 'flex';

  if (viewWidth < 440) {
    target.style.borderRadius = '0';
  } else {
    target.style.borderRadius = '3rem';
  }
}
(window as any).captureResult = captureResult;

window.addEventListener('resize', function () {
  viewWidth = window.innerWidth;
  if (viewWidth < 440) {
    target.style.borderRadius = '0';
  } else {
    target.style.borderRadius = '3rem';
  }
});
