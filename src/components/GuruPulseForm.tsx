
import React, { useState } from 'react';
import { toast } from 'sonner';
import { FormWizard } from './FormWizard';
import { ResultCard } from './ResultCard';
import { Instructions } from './Instructions';
import { PulseInsights } from './PulseInsights';
import { calculateDeliveryStats } from '@/utils/calculators';

interface FormData {
  weekday: string;
  shift: string;
  estimatedOrders: number;
  deliveryTime: number;
  averageKm: number;
  productionTime: number;
  stopTime: number;
}

const INITIAL_FORM: FormData = {
  weekday: '',
  shift: '',
  estimatedOrders: 0,
  deliveryTime: 0,
  averageKm: 0,
  productionTime: 0,
  stopTime: 0,
};

export const GuruPulseForm = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [result, setResult] = useState<ReturnType<typeof calculateDeliveryStats> | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);

  const handleCalculate = async () => {
    setIsCalculating(true);
    
    // Simular processamento
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      const calculatedResult = calculateDeliveryStats(
        formData.shift,
        formData.estimatedOrders,
        formData.deliveryTime,
        formData.averageKm,
        formData.productionTime,
        formData.stopTime
      );
      
      setResult(calculatedResult);
      
      toast.success('Simulação calculada com sucesso!', {
        description: `${calculatedResult.deliveryMen} entregadores necessários para ${formData.estimatedOrders} pedidos.`
      });
    } catch (error) {
      toast.error('Erro ao calcular simulação', {
        description: 'Verifique os dados inseridos e tente novamente.'
      });
    } finally {
      setIsCalculating(false);
    }
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  return (
    <div className="w-full space-y-10">
      <FormWizard 
        formData={formData} 
        setFormData={setFormData} 
        onValidationChange={handleValidationChange}
        onCalculate={handleCalculate}
        isCalculating={isCalculating}
      />

      {result && (
        <div className="space-y-8 animate-in fade-in-50 duration-500">
          <ResultCard {...result} />
          <PulseInsights 
            scenario={result.scenario}
            productionTime={formData.productionTime}
            stopTime={formData.stopTime}
            deliveryTime={formData.deliveryTime}
            averageKm={formData.averageKm}
            totalTimeToCustomer={result.totalTimeToCustomer}
          />
        </div>
      )}
      
      <Instructions />
    </div>
  );
};
