import { useMediaQueries } from "@react-hook/media-query";

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

export default useScreenSize;
