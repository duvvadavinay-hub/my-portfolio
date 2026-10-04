import Link from "next/link";
import { ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050508] text-[#f4f4f7] flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-rose-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-md flex flex-col items-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 font-mono text-xs font-semibold mb-6">
          <Compass className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: "8s" }} />
          <span>ERROR 404 // ROUTE NOT FOUND</span>
        </div>

        <h1 className="text-8xl sm:text-9xl font-black font-mono tracking-tighter text-white/90 drop-shadow-[0_0_35px_rgba(225,29,72,0.3)]">
          404
        </h1>

        <h2 className="text-xl sm:text-2xl font-bold text-white mt-4 mb-2">
          Lost in Digital Space
        </h2>

        <p className="text-sm font-mono text-neutral-400 mb-8 leading-relaxed">
          The requested coordinate does not exist or has been shifted in the portfolio matrix.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-mono text-xs font-bold tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(225,29,72,0.4)] hover:shadow-[0_0_35px_rgba(225,29,72,0.6)]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>RETURN TO HOME BASE</span>
        </Link>
      </div>

      <div className="absolute bottom-6 text-[11px] font-mono text-neutral-600">
        VINAY DUVVADA // CREATIVE DEVELOPER & DESIGNER
      </div>
    </div>
  );
}
