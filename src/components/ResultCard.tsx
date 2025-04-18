
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface ResultCardProps {
  requiredDrivers: number;
  cyclesPerDriver: number;
  ordersPerDriver: number;
  returnTime: number;
  totalTimeToCustomer: number;
  stopTime: number;
  totalCycleTime: number;
  scenario: 'A' | 'B' | 'C' | 'D';
}

const getScenarioColor = (scenario: 'A' | 'B' | 'C' | 'D') => {
  switch (scenario) {
    case 'A': return 'bg-green-100 text-green-800 border-green-200';
    case 'B': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'C': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'D': return 'bg-red-100 text-red-800 border-red-200';
  }
};

const getScenarioDescription = (scenario: 'A' | 'B' | 'C' | 'D') => {
  switch (scenario) {
    case 'A': return 'Máxima eficiência: até 50 minutos';
    case 'B': return 'Eficiência alta: 51 a 60 minutos';
    case 'C': return 'Eficiência média: 61 a 70 minutos';
    case 'D': return 'Eficiência baixa: acima de 70 minutos';
  }
};

export const ResultCard = ({
  requiredDrivers,
  cyclesPerDriver,
  ordersPerDriver,
  returnTime,
  totalTimeToCustomer,
  stopTime,
  totalCycleTime,
  scenario
}: ResultCardProps) => {
  return (
    <Card className="p-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold">
            Número estimado de entregadores: {requiredDrivers}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Ciclos por entregador</p>
              <p className="text-lg font-semibold">{cyclesPerDriver.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Pedidos por entregador</p>
              <p className="text-lg font-semibold">{ordersPerDriver.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tempo de parada estimado</p>
              <p className="text-lg font-semibold">{stopTime} min</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tempo de volta estimado</p>
              <p className="text-lg font-semibold">{returnTime.toFixed(1)} min</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tempo total até o cliente</p>
              <p className="text-lg font-semibold">{totalTimeToCustomer.toFixed(1)} min</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Tempo total do ciclo</p>
              <p className="text-lg font-semibold">{totalCycleTime.toFixed(1)} min</p>
            </div>
          </div>
          <div className="pt-4">
            <Badge className={getScenarioColor(scenario)}>
              Cenário {scenario} – {getScenarioDescription(scenario)}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  );
};
