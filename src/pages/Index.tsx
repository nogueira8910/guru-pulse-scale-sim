
import { GuruPulseForm } from "@/components/GuruPulseForm";
import { Header } from "@/components/Header";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-tiffany-light/10">
      <Header />
      
      <main className="relative -mt-8 pb-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-2xl shadow-tiffany/10 border border-gray-100 overflow-hidden">
            <div className="p-8 lg:p-12">
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Configure sua Simulação
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Insira os parâmetros operacionais para gerar insights precisos sobre sua escala de entregadores
                </p>
              </div>
              
              <GuruPulseForm />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
