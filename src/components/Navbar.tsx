
import { ChartLine, History, LogIn } from "lucide-react";

export function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-30 shadow-sm backdrop-blur bg-white/80 dark:bg-zinc-900/90 border-b border-slate-100 dark:border-zinc-800 transition-all">
      <div className="max-w-4xl mx-auto flex items-center justify-between px-3 py-2 md:py-3">
        <div className="flex items-center gap-2">
          <span className="bg-tiffany p-1 rounded-full shadow-sm border-2 border-white dark:border-zinc-700">
            <ChartLine className="w-8 h-8 text-white" />
          </span>
          <span className="font-extrabold text-2xl md:text-3xl ml-1 select-none tracking-tight text-tiffany-dark dark:text-tiffany-light font-inter drop-shadow-sm">
            Guru Pulse
          </span>
        </div>
        <ul className="flex items-center gap-4">
          <li>
            <a
              href="#"
              className="flex items-center gap-1 font-medium text-gray-800 dark:text-gray-100 px-3 py-1.5 rounded hover:bg-tiffany/20 transition-all"
            >
              <History className="w-5 h-5" />
              Histórico
            </a>
          </li>
          {/* Simulação de login futuro */}
          <li>
            <a
              href="#"
              className="font-medium text-tiffany hover:text-tiffany-dark px-3 py-1.5 rounded transition-all flex items-center gap-1"
            >
              <LogIn className="w-5 h-5" />
              Entrar
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
