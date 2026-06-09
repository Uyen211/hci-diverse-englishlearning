
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function Pagination({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange = () => {},
  infoText,
}) {
  const start = Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)
  const end = Math.min(currentPage * itemsPerPage, totalItems)

  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1)
  }

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1)
  }

  // Generate page numbers
  const pages = []
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className="flex justify-between items-center mt-5 w-full">
      <span className="text-[13px] font-semibold text-text-secondary">
        {infoText || `Đang hiển thị ${start}-${end} trên tổng số ${totalItems}`}
      </span>

      <div className="flex gap-1.5 items-center">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-3.5 py-2 rounded-md border text-[13px] font-semibold flex items-center justify-center min-w-[38px] cursor-pointer transition-all ${
            currentPage === 1
              ? 'border-border text-text-secondary/40 opacity-40 cursor-not-allowed'
              : 'border-primary/15 bg-surface text-text-primary shadow-glow hover:bg-muted'
          }`}
          aria-label="Trang trước"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Page Buttons */}
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3.5 py-2 rounded-md border text-[13px] font-semibold min-w-[38px] cursor-pointer transition-all ${
              p === currentPage
                ? 'bg-primary border-primary text-white shadow-active-glow'
                : 'border-primary/15 bg-surface text-text-primary shadow-glow hover:bg-muted'
            }`}
          >
            {p}
          </button>
        ))}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-3.5 py-2 rounded-md border text-[13px] font-semibold flex items-center justify-center min-w-[38px] cursor-pointer transition-all ${
            currentPage === totalPages
              ? 'border-border text-text-secondary/40 opacity-40 cursor-not-allowed'
              : 'border-primary/15 bg-surface text-text-primary shadow-glow hover:bg-muted'
          }`}
          aria-label="Trang sau"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
