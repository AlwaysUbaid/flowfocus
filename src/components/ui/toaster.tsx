
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useTheme } from "@/contexts/ThemeContext"

export function Toaster() {
  const { toasts } = useToast()
  const { color } = useTheme()
  
  // Determine theme-specific styles
  const getToastStyles = (id: string) => {
    const baseStyle = "group toast"
    
    switch (color) {
      case 'purple':
        return `${baseStyle} group-[.toaster]:border-purple-300 dark:group-[.toaster]:border-purple-800`
      case 'blue':
        return `${baseStyle} group-[.toaster]:border-blue-300 dark:group-[.toaster]:border-blue-800`
      case 'green':
        return `${baseStyle} group-[.toaster]:border-green-300 dark:group-[.toaster]:border-green-800`
      case 'retro':
        return `${baseStyle} group-[.toaster]:border-pink-300 dark:group-[.toaster]:border-pink-800 retro-toast`
      default:
        return baseStyle
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} className={getToastStyles(id)} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
