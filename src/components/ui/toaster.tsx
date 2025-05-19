
import { useToast } from "@/hooks/use-toast"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} {...props} variant={variant} className="p-4 border rounded-lg shadow-md">
            <div className="grid gap-1 w-full">
              {title && <ToastTitle className="text-base font-medium">{title}</ToastTitle>}
              {description && (
                <ToastDescription className="text-sm text-muted-foreground">
                  {description}
                </ToastDescription>
              )}
            </div>
            {action}
            <ToastClose className="opacity-70 hover:opacity-100 transition-opacity" />
          </Toast>
        )
      })}
      <ToastViewport className="p-4" />
    </ToastProvider>
  )
}
