
import * as React from "react"

// Using standard breakpoints
const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [screenSize, setScreenSize] = React.useState({
    isMobile: false,
    isTablet: false,
    width: 0
  })

  React.useEffect(() => {
    const checkScreenSize = () => {
      const currentWidth = window.innerWidth
      setScreenSize({
        isMobile: currentWidth < MOBILE_BREAKPOINT,
        isTablet: currentWidth >= MOBILE_BREAKPOINT && currentWidth < TABLET_BREAKPOINT,
        width: currentWidth
      })
    }
    
    // Initial check
    checkScreenSize()
    
    // Add event listener for resize with debounce for performance
    let timeoutId: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkScreenSize, 100)
    }
    
    window.addEventListener("resize", handleResize)
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return screenSize
}
