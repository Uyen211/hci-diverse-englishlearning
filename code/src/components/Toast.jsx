import { useToastStore } from '../store/toastStore'

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-6 right-6 z-[99999] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => {
        let icon = null;

        switch (toast.type) {
          case 'success':
            icon = (
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
              </svg>
            );
            break;
          case 'error':
            icon = (
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z"/>
              </svg>
            );
            break;
          case 'warning':
            icon = (
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v4Z"/>
              </svg>
            );
            break;
          case 'info':
            icon = (
              <svg viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9 9a1 1 0 0 1 2 0v4a1 1 0 0 1-2 0V9Zm1-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"/>
              </svg>
            );
            break;
          default:
            break;
        }

        return (
          <div key={toast.id} className={`toast-item ${toast.type}`}>
            <div className="toast-icon">
              {icon}
            </div>
            <div className="toast-message">{toast.message}</div>
            <button className="toast-close" onClick={() => removeToast(toast.id)}>
              <svg viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
              </svg>
            </button>
            <div className="toast-progress-bar">
              <div 
                className="toast-progress-fill animate-toast-progress"
                style={{ 
                  animationDuration: `${toast.duration}ms`,
                  animationFillMode: 'forwards',
                  animationTimingFunction: 'linear'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

