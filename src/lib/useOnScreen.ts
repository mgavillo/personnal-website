"use client";

import { useEffect, useMemo, useState } from "react";

export default function useOnScreen(ref: any) {
  const [isIntersecting, setIntersecting] = useState(false);
  const [isInTab, setIsInTab] = useState(true);
  let observer:IntersectionObserver;
  useEffect(() => {
    observer = new IntersectionObserver(([entry]) =>
    setIntersecting(entry.isIntersecting)
  )
  }, [ref])

  useEffect(() => {
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
