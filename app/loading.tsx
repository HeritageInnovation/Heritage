export default function Loading() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#D4AF37] font-serif text-lg tracking-wider">Loading...</p>
      </div>
    </div>
  )
}
