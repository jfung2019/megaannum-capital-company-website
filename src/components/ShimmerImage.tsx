"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * A `next/image` that shows a lightweight animated placeholder (not a
 * blurred thumbnail -- these are dynamic CMS/config paths, not static
 * imports, so next/image has no source to generate a blur-up from) behind
 * the photo until it has actually decoded, instead of a blank gap on a slow
 * connection. Caller's `className` must include `opacity` in its own
 * `transition-[...]` list if it also animates other properties (e.g.
 * `transition-[opacity,transform]`), since this only toggles the opacity
 * value, not the transition property itself.
 */
export default function ShimmerImage({
  className = "",
  onLoad,
  ...props
}: ImageProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div
        aria-hidden
        className={`absolute inset-0 bg-[linear-gradient(110deg,#e4e0d6_8%,#f3f1ea_18%,#e4e0d6_33%)] bg-[length:200%_100%] transition-opacity duration-300 ${
          loaded
            ? "opacity-0"
            : "opacity-100 animate-[shimmer-sweep_1.6s_ease-in-out_infinite]"
        }`}
      />
      <Image
        {...props}
        className={`${className} ${loaded ? "opacity-100" : "opacity-0"}`.trim()}
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
      />
    </>
  );
}
