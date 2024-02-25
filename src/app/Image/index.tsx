"use client";

import qs from "qs";
import { forwardRef, useState } from "react";

const placeholderImageBase64 =
  "data:image/png;base64,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BwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAIHEHCBJ3gCBxBwgSd4AgcQcIEneAoIf/fV3tACi5+g94t+nYhPEqzAAAAABJRU5ErkJggg==";

const sm = {
  w: 768,
  f: "webp",
};

const md = {
  w: 1024,
  f: "webp",
};

const lg = {
  w: 1920,
  f: "webp",
};

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const ImageComp = (props: ImageProps) => {
  const [src, setSrc] = useState(props.src);

  return (
    <img
      {...props}
      src={src}
      onError={() => {
        console.log("adadad");
        setSrc(placeholderImageBase64);
      }}
    />
  );
};

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (props, forwardedRef) => {
    const { src: propSrc, alt, onLoad, loading = "lazy" } = props;

    /**
     * TODO prefixURL은 보완 필요
     */
    const [src, setSrc] = useState(() => {
      if (propSrc.startsWith("/") && !propSrc.includes("https")) {
        return `https://d3gurpvil0se70.cloudfront.net${propSrc}`;
      }

      return propSrc;
    });
    const [blurCompleted, setBlurCompleted] = useState(false);

    return (
      /**
       * 1. viewport 사이즈를 기준으로 이미지를 가져오도록 하다보니
       *    예를 들어 width: 200, height:200으로 사용함에도 큰 사이즈를 가져오게 된다.
       */
      <picture>
        <source
          srcSet={`${src}?${qs.stringify(sm)}`}
          media="(max-width: 768px)"
          type="image/webp"
        />
        <source
          srcSet={`${src}?${qs.stringify(md)}`}
          media="(max-width: 1024px)"
          type="image/webp"
        />
        <source
          srcSet={`${src}?${qs.stringify(lg)}`}
          media="(max-width: 1920px)"
          type="image/webp"
        />
        <img
          {...props}
          ref={(ref) => {
            if (forwardedRef) {
              if (typeof forwardedRef === "function") forwardedRef(ref);
              else if (typeof forwardedRef === "object") {
                forwardedRef.current = ref;
              }
            }

            if (ref && ref.complete) {
              console.log(ref.onerror);
              setBlurCompleted(true);
            }
          }}
          onLoad={(e) => {
            onLoad?.(e);
            setBlurCompleted(true);
          }}
          src={src}
          loading={loading}
          style={
            blurCompleted
              ? {}
              : {
                  width: props.width,
                  height: props.height,
                  backgroundImage: `url("${placeholderImageBase64}")`,
                  backgroundSize: "cover",
                  backgroundPosition: "50% 50%",
                  backgroundRepeat: "no-repeat",
                }
          }
          onError={(e) => {
            const sourceElements = (e.currentTarget.parentNode?.children ||
              []) as HTMLImageElement[];

            Array.from(sourceElements)
              .filter((e) => e.tagName === "SOURCE")
              .forEach((element) => {
                element.srcset = placeholderImageBase64;
              });

            e.currentTarget.src = placeholderImageBase64;
          }}
        />
      </picture>
    );
  },
);

Image.displayName = "Image";

export default Image;
