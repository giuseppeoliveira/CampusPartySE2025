import { useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export function Toast({ message, type, duration = 4000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'error': return <AlertCircle className="h-5 w-5 text-red-600" />;
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'info': return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getBgColor = () => {
    switch (type) {
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'info': return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="w-full max-w-sm transform transition-all duration-300 ease-in-out animate-in slide-in-from-top-2">
      <div className={`${getBgColor()} border rounded-lg p-3 shadow-lg backdrop-blur-sm`}>
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            {getIcon()}
          </div>
          <div className="flex-1 min-w-0">
            <p className={`text-sm font-medium leading-tight break-words ${
              type === 'success' ? 'text-green-800' :
              type === 'error' ? 'text-red-800' :
              type === 'warning' ? 'text-yellow-800' :
              'text-blue-800'
            }`}>
              {message}
            </p>
          </div>
          <div className="flex-shrink-0">
            <button
              className={`rounded-full p-1 ${
                type === 'success' ? 'text-green-500 hover:bg-green-100' :
                type === 'error' ? 'text-red-500 hover:bg-red-100' :
                type === 'warning' ? 'text-yellow-500 hover:bg-yellow-100' :
                'text-blue-500 hover:bg-blue-100'
              } transition-colors`}
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ToastManagerProps {
  toasts: Array<{
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
  }>;
  onRemoveToast: (id: string) => void;
}

export function ToastManager({ toasts, onRemoveToast }: ToastManagerProps) {
  return (
    <div className="fixed top-4 left-4 right-4 z-50 pointer-events-none">
      <div className="max-w-sm mx-auto space-y-2">
        {toasts.map((toast, index) => (
          <div
            key={toast.id}
            className="pointer-events-auto"
            style={{
              animationDelay: `${index * 100}ms`,
            }}
          >
            <Toast
              message={toast.message}
              type={toast.type}
              duration={toast.duration}
              onClose={() => onRemoveToast(toast.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}