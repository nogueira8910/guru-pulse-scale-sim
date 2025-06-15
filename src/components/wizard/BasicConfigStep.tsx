
import React, { useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, Calendar, Clock, Package } from 'lucide-react';

interface FormData {
  weekday: string;
  shift: string;
  estimatedOrders: number;
  deliveryTime: number;
  averageKm: number;
  productionTime: number;
  stopTime: number;
}

interface BasicConfigStepProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onValidationChange: (isValid: boolean) => void;
}

const WEEKDAY_OPTIONS = [
  { value: 'monday', label: 'Segunda-feira', demand: 'média' },
  { value: 'tuesday', label: 'Terça-feira', demand: 'média' },
  { value: 'wednesday', label: 'Quarta-feira', demand: 'média' },
  { value: 'thursday', label: 'Quinta-feira', demand: 'alta' },
  { value: 'friday', label: 'Sexta-feira', demand: 'alta' },
  { value: 'saturday', label: 'Sábado', demand: 'muito alta' },
  { value: 'sunday', label: 'Domingo', demand: 'alta' }
];

const SHIFT_OPTIONS = [
  { 
    value: 'lunch', 
    label: 'Almoço', 
    time: '11:40 - 17:59',
    description: 'Pico entre 12h e 14h'
  },
  { 
    value: 'dinner', 
    label: 'Jantar', 
    time: '18:00 - 23:00',
    description: 'Pico entre 19h e 21h'
  }
];

export const BasicConfigStep = ({ formData, setFormData, onValidationChange }: BasicConfigStepProps) => {
  const isStepValid = 
    formData.weekday !== '' && 
    formData.shift !== '' && 
    formData.estimatedOrders > 0;

  useEffect(() => {
    onValidationChange(isStepValid);
  }, [formData.weekday, formData.shift, formData.estimatedOrders, onValidationChange]);

  const getOrdersRecommendation = () => {
    if (!formData.weekday || !formData.shift) return null;
    
    const weekdayData = WEEKDAY_OPTIONS.find(w => w.value === formData.weekday);
    const isWeekend = ['saturday', 'sunday'].includes(formData.weekday);
    const isDinner = formData.shift === 'dinner';
    
    let baseOrders = 50;
    if (weekdayData?.demand === 'alta') baseOrders = 80;
    if (weekdayData?.demand === 'muito alta') baseOrders = 120;
    if (isDinner) baseOrders = Math.round(baseOrders * 1.4);
    
    return {
      min: Math.round(baseOrders * 0.7),
      max: Math.round(baseOrders * 1.3),
      avg: baseOrders
    };
  };

  const recommendation = getOrdersRecommendation();

  return (
    <TooltipProvider>
      <div className="space-y-8">
        <div className="text-center mb-6">
          <h4 className="text-xl font-semibold text-gray-900 mb-2">
            Configuração Básica da Simulação
          </h4>
          <p className="text-gray-600">
            Defina o contexto operacional para uma análise precisa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Dia da Semana */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-tiffany" />
              <Label className="text-sm font-medium">Dia da Semana</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Diferentes dias têm padrões de demanda únicos.<br/>
                  Fins de semana geralmente têm maior volume.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <Select
              value={formData.weekday}
              onValueChange={(value) => setFormData({ ...formData, weekday: value })}
            >
              <SelectTrigger className="input-enhanced">
                <SelectValue placeholder="Selecione o dia da operação" />
              </SelectTrigger>
              <SelectContent>
                {WEEKDAY_OPTIONS.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    <div className="flex items-center justify-between w-full">
                      <span>{day.label}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ml-3 ${
                        day.demand === 'muito alta' ? 'bg-red-100 text-red-700' :
                        day.demand === 'alta' ? 'bg-orange-100 text-orange-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {day.demand}
                      </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Turno */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-tiffany" />
              <Label className="text-sm font-medium">Turno de Operação</Label>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Cada turno tem características específicas de volume<br/>
                  e distribuição temporal dos pedidos.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            
            <Select
              value={formData.shift}
              onValueChange={(value) => setFormData({ ...formData, shift: value })}
            >
              <SelectTrigger className="input-enhanced">
                <SelectValue placeholder="Selecione o turno" />
              </SelectTrigger>
              <SelectContent>
                {SHIFT_OPTIONS.map((shift) => (
                  <SelectItem key={shift.value} value={shift.value}>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{shift.label}</span>
                        <span className="text-xs text-gray-500">({shift.time})</span>
                      </div>
                      <span className="text-xs text-gray-400">{shift.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Pedidos Estimados */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-tiffany" />
            <Label className="text-sm font-medium">Volume de Pedidos Estimado</Label>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-gray-400 hover:text-gray-600" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Quantidade total de pedidos esperados para o turno.<br/>
                Use dados históricos ou projeções de vendas.</p>
              </TooltipContent>
            </Tooltip>
          </div>
          
          <div className="space-y-2">
            <Input
              type="number"
              placeholder="Ex: 85 pedidos"
              value={formData.estimatedOrders || ''}
              onChange={(e) => setFormData({ 
                ...formData, 
                estimatedOrders: Number(e.target.value) 
              })}
              className="input-enhanced text-lg"
              min="1"
              max="1000"
            />
            
            {recommendation && (
              <div className="bg-tiffany/5 border border-tiffany/20 rounded-lg p-3">
                <p className="text-sm font-medium text-tiffany-dark mb-1">
                  💡 Recomendação baseada no contexto:
                </p>
                <p className="text-sm text-gray-600">
                  Para <strong>{WEEKDAY_OPTIONS.find(w => w.value === formData.weekday)?.label}</strong> no 
                  <strong> {SHIFT_OPTIONS.find(s => s.value === formData.shift)?.label.toLowerCase()}</strong>: 
                  entre <strong>{recommendation.min}</strong> e <strong>{recommendation.max}</strong> pedidos 
                  (média: <strong>{recommendation.avg}</strong>)
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Progress Indicator */}
        {isStepValid && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">✓</span>
            </div>
            <div>
              <p className="text-sm font-medium text-green-800">
                Configuração básica completa!
              </p>
              <p className="text-xs text-green-600">
                Pronto para definir os parâmetros de entrega
              </p>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  );
};
