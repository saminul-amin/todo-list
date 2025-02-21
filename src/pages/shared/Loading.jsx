export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-stone-100">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-stone-400 opacity-30"></div>
        <div className="w-full h-full animate-spin rounded-full border-4 border-transparent border-t-stone-500"></div>
      </div>
    </div>
  );
}
