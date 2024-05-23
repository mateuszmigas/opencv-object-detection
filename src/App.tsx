import { type ChangeEvent, useRef } from "react";
import { processImageWithOpenCV } from "./process";

export const App = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const canvas = canvasRef.current!;
        canvas.width = 640;
        canvas.height = 480;
        const ctx = canvas.getContext("2d")!;
        const img = new Image();
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        <button onClick={() => processImageWithOpenCV(canvasRef.current!)}>
          Process
        </button>
      </div>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }} />
    </div>
  );
};

