import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop - resets the window scroll position to top on every route change.
 * Rendered inside App inside the Router context.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);

  return null;
}
