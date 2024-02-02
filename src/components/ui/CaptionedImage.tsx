import React from "react";

export interface CaptionedImageProps {
  src?: string | undefined;
  alt?: string;
  title?: string;
}
const CaptionedImage = ({ src, alt, title } : CaptionedImageProps) => {
  if (title) {
    return (
      <figure className="flex items-center flex-col">
        <img src={src} alt={alt} />
        <figcaption>{title}</figcaption>
      </figure>
    );
  } else {
    return <img src={src} alt={alt} />;
  }
};

export default CaptionedImage;
