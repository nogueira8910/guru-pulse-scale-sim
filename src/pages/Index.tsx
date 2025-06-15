import { GuruPulseForm } from "@/components/GuruPulseForm";
import { ChartLine } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="bg-gradient-to-br from-tiffany-light via-white to-slate-100 dark:from-zinc-800 dark:via-zinc-900 dark:to-zinc-950 min-h-screen transition-all">
      <Navbar />

      {/* Aplica padding para evitar header fixo sobrepor conteúdo */}
      <div className="pt-24 sm:pt-28 max-w-4xl mx-auto space-y-8 px-2 md:px-4">

        <header className="flex flex-col items-center justify-center mb-6">
          <div className="flex items-center gap-4 mb-4 animate-fade-in">
            <span className="rounded-full bg-tiffany p-3 shadow-lg shadow-tiffany/10 border-4 border-white dark:border-zinc-900 transition-transform hover:scale-105">
              <ChartLine className="w-14 h-14 text-white drop-shadow" />
            </span>
            <div>
              <h1 className="text-5xl font-extrabold font-inter text-gray-900 dark:text-white tracking-tight leading-tight drop-shadow-md animate-fade-in">
                Guru Pulse
              </h1>
              <p className="text-lg md:text-xl text-tiffany-dark/90 dark:text-tiffany-light/90 mt-1 font-semibold animate-fade-in">
                Simulador de Escala de Entregadores - Gurumê RJ
              </p>
            </div>
          </div>
          <p className="max-w-3xl text-center text-gray-600 dark:text-gray-400 text-lg my-2 animate-fade-in">
            Faça a simulação ideal para o seu delivery. Preencha os dados operacionais e receba insights em tempo real, cenários visuais e sugestões para turbinar a sua eficiência!
          </p>
          <a
            href="#form"
            className="mt-4 px-5 py-2 bg-tiffany text-white rounded-lg shadow hover:bg-tiffany-dark transition-all font-semibold text-md animate-fade-in"
          >
            Comece Simulação
          </a>
        </header>

        <main id="form" className="animate-scale-in">
          <div className="w-full max-w-4xl mx-auto space-y-8">
            {/* Card aprimorado */}
            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-lg ring-1 ring-tiffany/10 p-8 transition-shadow hover:shadow-2xl">
              <GuruPulseForm />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
