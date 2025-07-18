import { useEffect, useRef } from "react";

const Circle = () => {
  const circleRef = useRef<HTMLDivElement>(null);

  const randomValue = (min: number, max: number) =>
    Math.random() * (max - min) + min;

  useEffect(() => {
    if (!circleRef.current) {
      return;
    }
    const circleElement = circleRef.current;

    const animateCircle = () => {
      const parent = circleElement.parentElement;
      if (!parent) return;

      const randomX = randomValue(
        -parent.clientWidth / 2 - 200,
        parent.clientWidth / 2 - 50
      );
      const randomY = randomValue(
        -parent.clientHeight / 2 - 200,
        parent.clientHeight / 2 - 50
      );
      const randomScale = randomValue(0.1, 2.0);

      const keyframes = [
        {
          transform:
            circleElement.style.transform || "translate(-50%, -50%) scale(0)",
          opacity: 1,
        },
        {
          transform: `translate(${randomX}px, ${randomY}px) scale(${randomScale})`,
          opacity: 1,
        },
      ];

      const options: KeyframeAnimationOptions = {
        duration: randomValue(2000, 3000),
        easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        fill: "forwards",
      };

      const animation = circleElement.animate(keyframes, options);

      animation.onfinish = () => {
        circleElement.style.transform = keyframes[1].transform as string;

        animateCircle();
      };
    };

    const initialDelay = setTimeout(
      () => {
        animateCircle();
      },
      randomValue(0, 2000)
    );

    return () => clearTimeout(initialDelay);
  }, []);

  return (
    <div
      ref={circleRef}
      className="circle"
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "250px",
        height: "250px",
        backgroundColor: "#4ade80",
        borderRadius: "50%",
        transformOrigin: "center center",
        transform: "translate(-50%, -50%) scale(0)",
        opacity: 0,
        boxShadow: "10px 10px 50px rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};

const AnimatedCircles = ({ count = 30 }: { count?: number }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {[...Array(count)].map((_, i) => (
        <Circle key={i} />
      ))}
    </div>
  );
};

export default AnimatedCircles;
