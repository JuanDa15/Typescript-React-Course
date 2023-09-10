'use client';

import { ImgHTMLAttributes, useEffect, useRef, useState } from "react";

interface Props extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  onLazyLoad?: (node: HTMLImageElement) => void;
}


export const LazyImage = ({ src, onLazyLoad, ...others }: Props): JSX.Element => {
  const placeHolder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIwIiBoZWlnaHQ9IjMyMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiLz4='

  const [currentSrc, setCurrentSrc] = useState(placeHolder)
  const [isLoaded, setIsLoaded] = useState(false)

  const node = useRef<HTMLImageElement | null>(null)


  useEffect(() => {
    if (isLoaded) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting || !node.current) return;

        setCurrentSrc(src)
        observer.disconnect();
        setIsLoaded(true);

        if (typeof onLazyLoad === 'function') {
          onLazyLoad(node.current!)
        } 
      })
    })
  
    if (node.current) {
      observer.observe(node.current)
    }

    return () => {
      observer.disconnect();
    }
  }, [src, onLazyLoad])

  return (
    <img
      ref={node}
      src={currentSrc}
      {...others}
    />
  );
};
