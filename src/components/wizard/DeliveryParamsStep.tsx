
import React, { useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Clock, MapPin, Route } from 'lucide-react';

interface FormData {
  weekday: string;
  shift: string;
  estimatedOrders: number;
  deliveryTime: number;
  averageKm: number;
  productionTime: number;
  stopTime: number;
}

interface DeliveryParamsStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onValidationChange: (isValid: boolean) => void;
}

export const DeliveryParamsStep = ({ formData, setFormData, onValidationChange }: DeliveryParamsStepProps) => {
  const isStepValid = 
    formData.deliveryTime > 0 && 
    formData.averageKm > 0;

  useEffect(() => {
    onValidationChange(isStepValid);
  }, [formData.deliveryTime, formData.averageKm, onValidationChange]);

  const calculateSpeed = () => {
    if (formData.deliveryTime > 0 && formData.averageKm > 0) {
      const speedKmh = (formData.averageKm / (formData.deliveryTime / 60)).toFixed(1);
      return parseFloat(speedKmh);
    }
    return 0;
  };

  const getSpeedFeedback = (speed: number) => {
    if (speed === 0) return null;
    
    if (speed < 15) {
      return { type: 'warning', message: 'Velocidade baixa - pode indicar trânsito intenso ou muitas paradas' };
    } else if (speed > 40) {
      return { type: 'warning', message: 'Velocidade alta - verifique se os dados estão corretos' };
    } else {
      return { type: 'success', message: 'Velocidade adequada para delivery urbano' };
    }
  };

  const speed = calculateSpeed();
  const speedFeedback = getSpeedFeedback(speed);

  const getTimeRecommendation = () => {
    if (formData.averageKm > 0) {
      // Assumindo velocidade média de 20-25 km/h para delivery urbano
      const minTime = Math.round((formData.averageKm / 25) * 60);
      const maxTime = Math.round((formData.averageKm / 15) * 60);
      return { min: minTime, max: maxTime };
    }
    return null;
  };

  const timeRecommendation = getTimeRecommendation();

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Parâmetros de Entrega
          </h4>
          <p className="text-gray-600">
            Configure os tempos e distâncias das suas entregas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Distância Média */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-tiffany" />
              <Label className="text-sm font-medium">Distância Média de Entrega</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Distância média em quilômetros do restaurante<br/>
                  até o cliente (somente ida).</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Ex: 3.5"
                  value={formData.averageKm || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    averageKm: Number(e.target.value) 
                  })}
                  className="input-enhanced text-lg pr-12"
                  min="0.1"
                  max="50"
                  step="0.1"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  km
                </span>
              </div>
              
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                <p className="text-xs text-blue-800">
                  <strong>💡 Dica:</strong> Use dados do seu app de delivery ou GPS.
                  Considere apenas a distância de ida, não ida e volta.
                </p>
              </div>
            </div>
          </div>

          {/* Tempo de Entrega */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-tiffany" />
              <Label className="text-sm font-medium">Tempo de Entrega (ida)</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Tempo médio em minutos para chegar ao cliente<br/>
                  (do restaurante até o destino).</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <div className="space-y-2">
              <div className="relative">
                <Input
                  type="number"
                  placeholder="Ex: 12"
                  value={formData.deliveryTime || ''}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    deliveryTime: Number(e.target.value) 
                  })}
                  className="input-enhanced text-lg pr-16"
                  min="1"
                  max="120"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">
                  minutos
                </span>
              </div>
              
              {timeRecommendation && formData.averageKm > 0 && (
                <div className="bg-tiffany/5 border border-tiffany/20 rounded-lg p-3">
                  <p className="text-sm font-medium text-tiffany-dark mb-1">
                    💡 Recomendação para {formData.averageKm} km:
                  </p>
                  <p className="text-sm text-gray-600">
                    Entre <strong>{timeRecommendation.min}</strong> e <strong>{timeRecommendation.max}</strong> minutos
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Análise de Velocidade */}
        {speed > 0 && (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Route className="w-5 h-5 text-gray-600" />
              <h5 className="font-medium text-gray-900">Análise de Velocidade</h5>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-tiffany">{speed}</p>
                <p className="text-sm text-gray-600">km/h médios</p>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700">{formData.averageKm}</p>
                <p className="text-sm text-gray-600">km por entrega</p>
              </div>
              
              <div className="text-center">
                <p className="text-lg font-semibold text-gray-700">{formData.deliveryTime}</p>
                <p className="text-sm text-gray-600">minutos de ida</p>
              </div>
            </div>
            
            {speedFeedback && (
              <div className={`mt-4 p-3 rounded-lg ${
                speedFeedback.type === 'success' 
                  ? 'bg-green-50 border border-green-200 text-green-800'
                  : 'bg-yellow-50 border border-yellow-200 text-yellow-800'
              }`}>
                <p className="text-sm font-medium flex items-center gap-2">
                  {speedFeedback.type === 'success' ? '✅' : '⚠️'}
                  {speedFeedback.message}
                </p>
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
                Parâmetros de entrega configurados!
              </p>
              <p className="text-xs text-green-600">
                Velocidade média: {speed} km/h - Pronto para a última etapa
              </p>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
