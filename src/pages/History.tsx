
import { ChartLine } from "lucide-react";
import { Card } from "@/components/ui/card";

const History = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
        <ChartLine className="w-8 h-8 text-primary" />
        Histórico de Simulações
      </h1>
      
      <Card className="p-6">
        <div className="text-center text-gray-500">
          Em desenvolvimento - Histórico de simulações será exibido aqui.
        </div>
      </Card>
    </div>
  );
};

export default History;
