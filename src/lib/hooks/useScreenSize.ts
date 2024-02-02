import { useMediaQueries } from "@react-hook/media-query";

type ScreenSize = "2xl" | "xl" | "lg" | "md" | "sm";

const useScreenSize = () => {
  const screenSize = useMediaQueries({
    sm: "screen and (min-width: 640px)",
    md: "screen and (min-width: 768px)",
    lg: "screen and (min-width: 1024px)",
    xl: "screen and (min-width: 1280px)",
    twoxl: "screen and (min-width: 1536px)",
  });
  if (screenSize.matches.twoxl) {
    return "2xl";
  } else if (screenSize.matches.xl) {
    return "xl";
  } else if (screenSize.matches.lg) {
    return "lg";
  } else if (screenSize.matches.md) {
    return "md";
  } else {
    return "sm";
  }
};

export function isLargerThan(a: ScreenSize, b: ScreenSize) {
  const order = ["sm", "md", "lg", "xl", "2xl"];
  if (order.indexOf(a) > order.indexOf(b)) {
    return true;
  }
  return false;
}

export default useScreenSize;
