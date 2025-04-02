
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(true) // Default to true for mobile-first approach

  React.useEffect(() => {
    // Check if we're in a mobile context
    const checkMobile = () => {
      const isMobileView = window.innerWidth < MOBILE_BREAKPOINT;
      const isMobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      setIsMobile(isMobileView || isMobileUserAgent);
    }
    
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    
    // Initial check
    checkMobile();
    
    // Listen for viewport changes
    const onChange = () => checkMobile();
    mql.addEventListener("change", onChange);
    
    // Also check on orientation change for mobile devices
    window.addEventListener("orientationchange", onChange);
    
    return () => {
      mql.removeEventListener("change", onChange);
      window.removeEventListener("orientationchange", onChange);
    }
  }, [])

  return isMobile;
}
