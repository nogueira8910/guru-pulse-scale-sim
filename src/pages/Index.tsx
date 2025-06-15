
import { GuruPulseForm } from "@/components/GuruPulseForm";
import { ChartLine } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-tiffany-light via-white to-slate-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-950 transition-all py-10 px-2 md:px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header aprimorado */}
        <header className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center gap-4 mb-4 animate-fade-in">
            <span className="rounded-full bg-tiffany p-2 shadow-md shadow-tiffany/10 border-4 border-white dark:border-zinc-900">
              <ChartLine className="w-12 h-12 text-white drop-shadow" />
            </span>
            <div>
              <h1 className="text-4xl sm:text-5xl font-extrabold font-inter text-gray-900 dark:text-white tracking-tight leading-tight drop-shadow-md">
                Guru Pulse
              </h1>
              <p className="text-base md:text-lg text-tiffany-dark/90 dark:text-tiffany-light/90 mt-1 font-medium">
                Simulador de Escala de Entregadores - Gurumê RJ
              </p>
            </div>
          </div>
          <p className="max-w-3xl text-center text-gray-600 dark:text-gray-400 text-lg my-2">
            Faça a simulação ideal para o seu delivery. Preencha os dados operacionais e receba insights em tempo real, cenários visuais e sugestões para turbinar a sua eficiência!
          </p>
        </header>
        
        <main className="animate-scale-in">
          <GuruPulseForm />
        </main>
      </div>
    </div>
  );
};

export default Index;
