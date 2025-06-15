
import { ChartLine, TrendingUp } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-gradient-to-r from-tiffany-dark to-tiffany text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
              <ChartLine className="w-12 h-12 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-5xl font-bold tracking-tight">Guru Pulse</h1>
              <div className="flex items-center gap-2 text-tiffany-light/90 text-lg font-medium">
                <TrendingUp className="w-5 h-5" />
                <span>Simulador Inteligente</span>
              </div>
            </div>
          </div>
          
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed">
            Otimize sua escala de entregadores com precisão matemática.
            <span className="block text-lg text-white/80 mt-2">
              Análise completa para operações do Gurumê Rio de Janeiro
            </span>
          </p>
          
          <div className="flex items-center gap-6 mt-6 text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Sistema Ativo</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-sm font-medium">Dados em Tempo Real</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
