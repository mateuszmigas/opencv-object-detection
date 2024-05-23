/* eslint-disable @typescript-eslint/no-explicit-any */

export const processImageWithOpenCV = (canvas: HTMLCanvasElement) => {
  if ((window as any).cv) {
    const cv = (window as any).cv;
    const src = cv.imread(canvas);
    const dst = new cv.Mat();
    cv.cvtColor(src, dst, cv.COLOR_RGBA2GRAY);
    cv.imshow(canvas, dst);
    src.delete();
    dst.delete();
  } else {
    console.error("OpenCV.js is not loaded");
  }
};

