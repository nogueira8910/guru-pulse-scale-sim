
import { GuruPulseForm } from "@/components/GuruPulseForm";
import { Instructions } from "@/components/Instructions";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Guru Pulse</h1>
          <p className="text-gray-600">
            Simulador de Escala de Entregadores - Gurumê Rio de Janeiro
          </p>
        </div>
        
        <GuruPulseForm />
        <Instructions />
      </div>
    </div>
  );
};

export default Index;
