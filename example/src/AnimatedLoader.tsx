import { useMemo } from "react";
import {
  BlurMask,
  vec,
  Canvas,
  Path,
  SweepGradient,
  useDerivedValueOnJS,
  interpolate,
  Skia,
} from "@shopify/react-native-skia";

const { width, height } = { width: 1080, height: 720 };

export const ActivityIndicator = ({ size }: { size: number }) => {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const canvasSize = size + 30;
  const circle = useMemo(() => {
    const skPath = Skia.Path.Make();

    skPath.addCircle(canvasSize / 2, canvasSize / 2, radius);
    return skPath;
  }, [canvasSize, radius]);

  const startPath = useDerivedValueOnJS(() => {
    return interpolate(0.2, [0, 0.5, 1], [0.6, 0.3, 0.6]);
  }, []);

  return (
    <Path
      path={circle}
      color="red"
      style="stroke"
      strokeWidth={strokeWidth}
      start={startPath}
      end={1}
      strokeCap={"round"}
    >
      <SweepGradient
        c={vec(canvasSize / 2, canvasSize / 2)}
        colors={["cyan", "magenta", "yellow", "cyan"]}
      />
      <BlurMask blur={5} style="solid" />
    </Path>
  );
};

export const AnimatedLoader = () => {
  return (
    <Canvas style={{ width, height }}>
      <ActivityIndicator size={100} />
    </Canvas>
  );
};
