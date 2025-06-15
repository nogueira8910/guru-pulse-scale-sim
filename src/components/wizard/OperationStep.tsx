
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, ChefHat, Timer, Users, TrendingUp } from 'lucide-react';

interface FormData {
  weekday: string;
  shift: string;
  estimatedOrders: number;
  deliveryTime: number;
  averageKm: number;
  productionTime: number;
  stopTime: number;
}

interface OperationStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const OperationStep = ({ formData, setFormData, onValidationChange }: OperationStepProps) => {
  const isStepValid = 
    formData.productionTime > 0 && 
    formData.stopTime > 0;

  useEffect(() => {
    onValidationChange(isStepValid);
  }, [formData.productionTime, formData.stopTime, onValidationChange]);

  const calculateTotalCycleTime = () => {
    if (formData.deliveryTime > 0 && formData.productionTime > 0 && formData.stopTime > 0) {
      // Tempo total do ciclo: ida + parada + volta + produção
      const cycleTime = (formData.deliveryTime * 2) + formData.stopTime + formData.productionTime;
      return Math.round(cycleTime);
    }
    return 0;
  };

  const calculateDeliveryCapacity = () => {
    const cycleTime = calculateTotalCycleTime();
    if (cycleTime > 0) {
      // Assumindo 8 horas de operação (480 minutos)
      const workingMinutes = formData.shift === 'lunch' ? 375 : 300; // Almoço: 6h15min, Jantar: 5h
      return Math.floor(workingMinutes / cycleTime);
    }
    return 0;
  };

  const getProductionRecommendation = () => {
    // Baseado no tipo de comida e complexidade
    return {
      fast: { min: 8, max: 15, label: 'Lanches/Fast Food' },
      medium: { min: 15, max: 25, label: 'Pratos Executivos' },
      complex: { min: 25, max: 40, label: 'Pratos Elaborados' }
    };
  };

  const getStopTimeRecommendation = () => {
    return {
      residential: { min: 2, max: 5, label: 'Residencial' },
      commercial: { min: 3, max: 8, label: 'Comercial/Escritórios' },
      complex: { min: 5, max: 12, label: 'Condomínios/Prédios' }
    };
  };

  const cycleTime = calculateTotalCycleTime();
  const capacity = calculateDeliveryCapacity();
  const productionRec = getProductionRecommendation();
  const stopRec = getStopTimeRecommendation();

  const getEfficiencyLevel = () => {
    if (formData.estimatedOrders > 0 && capacity > 0) {
      const efficiency = (formData.estimatedOrders / capacity) * 100;
      if (efficiency < 70) return { level: 'low', color: 'green', message: 'Capacidade sobra' };
      if (efficiency < 90) return { level: 'good', color: 'tiffany', message: 'Eficiência boa' };
      if (efficiency < 110) return { level: 'high', color: 'yellow', message: 'Capacidade no limite' };
      return { level: 'critical', color: 'red', message: 'Sobrecarga!' };
    }
    return null;
  };

  const efficiency = getEfficiencyLevel();

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Parâmetros Operacionais
          </h4>
          <p className="text-gray-600">
            Configure os tempos de produção e atendimento
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Tempo de Produção */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-tiffany" />
              <Label className="text-sm font-medium">Tempo de Produção e Liberação</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tempo médio para preparar e liberar um pedido<br/>
                  (desde o início da produção até sair para entrega).</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Ex: 18"
                  value={formData.productionTime || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    productionTime: Number(e.target.value) 
                  })}
                  className="input-enhanced text-lg pr-16"
                  min="1"
                  max="120"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  minutos
                </span>
              </div>
              
              <div className="space-y-2">
                {Object.entries(productionRec).map(([key, rec]) => (
                  <div key={key} className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">{rec.label}</span>
                      <span className="text-xs text-gray-600">{rec.min}-{rec.max} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tempo de Parada */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Timer className="w-4 h-4 text-tiffany" />
              <Label className="text-sm font-medium">Tempo de Parada no Cliente</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tempo médio gasto na entrega:<br/>
                  estacionar, localizar, entregar e retornar ao veículo.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Ex: 4"
                  value={formData.stopTime || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    stopTime: Number(e.target.value) 
                  })}
                  className="input-enhanced text-lg pr-16"
                  min="1"
                  max="60"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  minutos
                </span>
              </div>
              
              <div className="space-y-2">
                {Object.entries(stopRec).map(([key, rec]) => (
                  <div key={key} className="bg-gray-50 border border-gray-200 rounded-lg p-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-gray-700">{rec.label}</span>
                      <span className="text-xs text-gray-600">{rec.min}-{rec.max} min</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Análise de Capacidade */}
        {cycleTime > 0 && capacity > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-gray-600" />
              <h5 className="font-medium text-gray-900">Análise de Capacidade Operacional</h5>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-tiffany">{cycleTime}</p>
                <p className="text-sm text-gray-600">min/ciclo completo</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-purple-600">{capacity}</p>
                <p className="text-sm text-gray-600">entregas/entregador</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">{formData.estimatedOrders}</p>
                <p className="text-sm text-gray-600">pedidos estimados</p>
              </div>
              
              <div className="text-center">
                <p className="text-2xl font-bold text-orange-600">
                  {Math.ceil(formData.estimatedOrders / capacity) || 0}
                </p>
                <p className="text-sm text-gray-600">entregadores necessários</p>
              </div>
            </div>

            {efficiency && (
              <div className={`p-4 rounded-lg ${
                efficiency.color === 'green' ? 'bg-green-50 border border-green-200' :
                efficiency.color === 'tiffany' ? 'bg-tiffany/5 border border-tiffany/20' :
                efficiency.color === 'yellow' ? 'bg-yellow-50 border border-yellow-200' :
                'bg-red-50 border border-red-200'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4" />
                  <span className="font-medium">Status Operacional:</span>
                  <span className={`font-bold ${
                    efficiency.color === 'green' ? 'text-green-700' :
                    efficiency.color === 'tiffany' ? 'text-tiffany-dark' :
                    efficiency.color === 'yellow' ? 'text-yellow-700' :
                    'text-red-700'
                  }`}>
                    {efficiency.message}
                  </span>
                </div>
                
                <div className="text-sm text-gray-600">
                  <strong>Detalhamento do ciclo:</strong>
                  <br />• Produção: {formData.productionTime} min
                  <br />• Ida ao cliente: {formData.deliveryTime} min
                  <br />• Parada na entrega: {formData.stopTime} min
                  <br />• Volta ao restaurante: {formData.deliveryTime} min
                  <br />• <strong>Total por entrega: {cycleTime} min</strong>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Progress Indicator */}
        {isStepValid && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">
                Configuração completa!
              </p>
              <p className="text-xs text-green-600">
                Todos os parâmetros foram definidos. Pronto para calcular a simulação.
              </p>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
