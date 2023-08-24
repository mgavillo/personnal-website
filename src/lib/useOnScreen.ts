"use client";

import { MutableRefObject, useEffect, useMemo, useState } from "react";

export default function useOnScreen(ref: MutableRefObject<any>) {
  const [isIntersecting, setIntersecting] = useState(false);
  const [isInTab, setIsInTab] = useState(true);
  let observer: IntersectionObserver;

  useEffect(() => {
    observer = new IntersectionObserver(([entry]) => setIntersecting(entry.isIntersecting));
  }, [ref]);

  useEffect(() => {
    if (!ref.current) return;
    function handleHidden() {
      if (document.hidden) setIsInTab(false);
      else setIsInTab(true);
    }
    observer?.observe(ref.current);
    window.addEventListener("visibilitychange", handleHidden);
    return () => {
      observer.disconnect();
      window.removeEventListener("visibilitychange", handleHidden);
    };
  }, []);

  return isIntersecting && isInTab;
}
