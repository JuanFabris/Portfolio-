import { useProgress } from "@react-three/drei";
import { useEffect } from "react";

export const LoadingScreen = (props) => {
  const { started, setStarted } = props;
  const { progress } = useProgress();

  useEffect(() => {
    console.log(progress);
    if (progress === 100) {
      setTimeout(() => {
        setStarted(true);
      }, 500);
    }
  }, [progress, setStarted]);

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full z-50 transition-opacity duration-1000 pointer-events-none
        flex items-center justify-center bg-gradient-to-br from-gray-800 to-black
        ${started ? "opacity-0" : "opacity-100"}`}
    >
      <div className="relative flex flex-col items-center">
        <div className="text-7xl md:text-9xl font-extrabold text-white relative">
          <div
            className="absolute left-0 top-0 overflow-hidden truncate text-clip transition-all duration-700"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #00f260, #0575e6)',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            }}
          >
            WELCOME
          </div>
          <div className="opacity-30 animate-flicker">WELCOME</div>
        </div>

      {/* cerchio */}
        <div className="mt-10">
          <div className="loader">
            <div className="circle" />
            <div className="circle" />
            <div className="circle" />
          </div>
        </div>
      </div>
    </div>
  );
};
