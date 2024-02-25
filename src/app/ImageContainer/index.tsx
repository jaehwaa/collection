import React, { useEffect, useState } from "react";
import { useIntersectionObserverRef } from "rooks";

export interface ImageContainerPropsType {
  src: string;
  alt?: string;
  className?: string;
  height?: number;
  width?: number;
  style?: object;
}

export enum FitType {
  FILL = "fill",
  FIXED = "fixed",
  RESPONSIVE = "responsive",
  INTRINSIC = "intrinsic",
}

const lightGrayImageBase64 =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAyAAAAGQAQMAAABs65Z3AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAGUExURfPz8////62YZ64AAAAJcEhZcwAADsMAAA7DAcdvqGQAAAA+SURBVHja7cExAQAAAMKg9U9tDQ8gAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACASzWd0AABmDxSzAAAAABJRU5ErkJggg==";

const ImageContainer = (props: ImageContainerPropsType) => {
  const { src, className = "", alt, style = {} } = props;

  const [oldSrc, setOldSrc] = useState<string>(src);
  const [addClass, setAddClass] = useState<string>(className ?? "");

  const callback = (entries: any) => {
    if (entries && entries[0]) {
      if (entries[0].isIntersecting) {
        const image = entries[0].target;

        if (image === undefined) return null;

        if (image.classList.contains("contentBeforeLoaded")) {
          image.setAttribute("src", image.getAttribute("data-src"));
          image.classList.remove("contentBeforeLoaded");
          image.style.removeProperty("min-height");
          setAddClass("");
        }
      }
    }
  };

  const [myRef] = useIntersectionObserverRef(callback);

  useEffect(() => {
    if (src !== oldSrc) {
      setAddClass("contentBeforeLoaded");
      setOldSrc(src);
    }
  }, [src]);

  return (
    <img
      {...props}
      style={style}
      ref={myRef}
      src={lightGrayImageBase64}
      data-src={src === "" ? lightGrayImageBase64 : src}
      className={`${className} ${addClass} contentBeforeLoaded`}
      alt={alt || src}
      title={alt || ""}
    />
  );
};

export default ImageContainer;
