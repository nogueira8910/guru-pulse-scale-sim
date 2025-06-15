
import { GuruPulseForm } from "@/components/GuruPulseForm";
import { ChartLine } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-4 mb-4">
            <ChartLine className="w-10 h-10 text-primary" />
            <h1 className="text-4xl font-bold text-gray-900">Guru Pulse</h1>
          </div>
          <p className="text-gray-600 text-center">
            Simulador de Escala de Entregadores - Gurumê Rio de Janeiro
          </p>
        </div>
        
        <GuruPulseForm />
      </div>
    </div>
  );
};

export default Index;

