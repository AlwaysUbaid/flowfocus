
import * as React from "react"

// Using standard breakpoints
const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)
  const [width, setWidth] = React.useState<number | undefined>(undefined)

  React.useEffect(() => {
    const checkIfMobile = () => {
      const currentWidth = window.innerWidth
      setWidth(currentWidth)
      setIsMobile(currentWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    checkIfMobile()
    
    // Add event listener for resize with debounce for performance
    let timeoutId: ReturnType<typeof setTimeout>
    const handleResize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(checkIfMobile, 100)
    }
    
    window.addEventListener("resize", handleResize)
    
    // Cleanup
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // We can also provide current width for more fine-grained control
  return { isMobile: !!isMobile, width: width || 0 }
}
