import html2canvas from 'html2canvas';

function captureResult() {
  const target = document.querySelector('.musiclists-wrap') as HTMLElement;
  const targetBtn = target.querySelector('.btn-wrap') as HTMLElement;
  targetBtn?.setAttribute('style', 'display:none;');

  if (!target) return;

  html2canvas(target).then((canvas) => {
    const image = canvas.toDataURL('image/png');

    // 다운로드
    const link = document.createElement('a');
    link.href = image;
    link.download = 'result.png';
    link.click();
  });

  targetBtn?.setAttribute('style', 'display:flex;');
}
(window as any).captureResult = captureResult;
