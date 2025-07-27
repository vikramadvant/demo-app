// Common utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Status types
export type Status = 'idle' | 'loading' | 'success' | 'error';

// Form types
export interface FormState {
  isValid: boolean;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
}

// Modal/Dialog types
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

// Loading states
export interface LoadingState {
  isLoading: boolean;
  error?: string | null;
}

// Confirm dialog types
export interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "danger" | "warning" | "info";
} 