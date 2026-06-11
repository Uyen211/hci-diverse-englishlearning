
import { Trash2 } from 'lucide-react'

export default function Modal({
  isOpen = false,
  onClose = () => { },
  type = 'form', // 'form' | 'delete'
  title = '',
  confirmText = 'Lưu Thay Đổi',
  cancelText = 'Hủy Bỏ',
  onConfirm = () => { },
  confirmLoading = false,
  children,
  // Props specific to delete confirmation
  deleteTitle = 'Bạn có chắc chắn muốn xóa?',
  deleteDescription = 'Hành động này là vĩnh viễn và không thể hoàn tác.',
}) {
  if (!isOpen) return null

  // Prevent background click from closing when clicking inside the modal box
  const handleBoxClick = (e) => {
    e.stopPropagation()
  }

  return (
    <div
      className="fixed inset-0 bg-[#1C1B2E]/45 backdrop-blur-md flex items-center justify-center z-50 animate-fade-in"
      onClick={onClose}
    >
      {type === 'delete' ? (
        /* ==========================================
           DELETE CONFIRMATION MODAL
           ========================================== */
        <div
          className="bg-surface rounded-xxl w-[440px] p-8 border border-border flex flex-col items-center text-center gap-6 shadow-[0_20px_48px_rgba(28,27,46,0.2)] animate-scale-up"
          onClick={handleBoxClick}
        >
          {/* Red Danger Circle Icon */}
          <div className="w-16 h-16 rounded-full bg-error/8 text-error flex items-center justify-center shrink-0">
            <Trash2 className="w-7 h-7" />
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-heading text-[20px] font-extrabold text-text-primary leading-snug">
              {deleteTitle}
            </h3>
            <p className="text-[14px] leading-relaxed text-text-secondary">
              {deleteDescription}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex w-full gap-4 mt-3">
            <button
              onClick={onClose}
              disabled={confirmLoading}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-surface text-primary font-sans text-[14px] font-semibold py-3 rounded-lg border border-primary/20 hover:bg-muted cursor-pointer transition-all disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={confirmLoading}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-error text-white font-sans text-[14px] font-bold py-3 rounded-lg border-none hover:bg-error/90 cursor-pointer shadow-md shadow-error/25 transition-all disabled:opacity-50"
            >
              {confirmLoading ? 'Đang xóa...' : confirmText}
            </button>
          </div>
        </div>
      ) : type === 'confirm' ? (
        /* ==========================================
           GENERIC CONFIRMATION MODAL
           ========================================== */
        <div
          className="bg-surface rounded-xxl w-[440px] p-8 border border-border flex flex-col items-center text-center gap-6 shadow-[0_20px_48px_rgba(28,27,46,0.2)] animate-scale-up"
          onClick={handleBoxClick}
        >
          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-[20px] font-extrabold text-text-primary leading-snug">
              {title}
            </h3>
            <p className="text-[14px] leading-relaxed text-text-secondary">
              {children}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex w-full gap-4 mt-3">
            <button
              onClick={onClose}
              disabled={confirmLoading}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-surface text-primary font-sans text-[14px] font-semibold py-3 rounded-xl border border-primary/20 hover:bg-muted cursor-pointer transition-all disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={confirmLoading}
              className="flex-1 inline-flex items-center justify-center gap-2 bg-primary text-white font-sans text-[14px] font-bold py-3 rounded-xl border-none hover:bg-primary/95 cursor-pointer shadow-md shadow-primary/25 transition-all disabled:opacity-50"
            >
              {confirmLoading ? 'Đang xử lý...' : confirmText}
            </button>
          </div>
        </div>
      ) : (
        /* ==========================================
           STANDARD FORM MODAL
           ========================================== */
        <div
          className="bg-surface rounded-xxl w-[500px] p-9 border border-border flex flex-col gap-6 shadow-[0_20px_48px_rgba(28,27,46,0.2)] animate-scale-up"
          onClick={handleBoxClick}
        >
          {/* Modal Header */}
          {title && (
            <div className="border-b border-primary/8 pb-4">
              <h3 className="font-heading text-[20px] font-extrabold text-text-primary leading-tight">
                {title}
              </h3>
            </div>
          )}

          {/* Modal Content */}
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[70vh] pr-1">
            {children}
          </div>

          {/* Modal Actions */}
          <div className="flex justify-end gap-4 border-t border-primary/8 pt-5 mt-2">
            <button
              onClick={onClose}
              disabled={confirmLoading}
              className="inline-flex items-center gap-2 bg-surface text-primary font-sans text-[14px] font-semibold px-5 py-3 rounded-lg border border-primary/20 hover:bg-muted cursor-pointer transition-all disabled:opacity-50"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={confirmLoading}
              className="inline-flex items-center gap-2 bg-primary text-white font-sans text-[14px] font-bold px-6 py-3 rounded-lg border-none hover:bg-primary/95 cursor-pointer shadow-md shadow-primary/25 transition-all disabled:opacity-50"
            >
              {confirmLoading ? 'Đang lưu...' : confirmText}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
