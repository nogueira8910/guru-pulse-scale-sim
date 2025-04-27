
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { FormInputs } from './FormInputs';
import { ActionButtons } from './ActionButtons';
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

  const handleCalculate = () => {
    const calculatedResult = calculateDeliveryStats(
      formData.estimatedOrders,
      formData.productionTime,
      formData.deliveryTime,
      formData.stopTime,
      formData.averageKm
    );
    setResult(calculatedResult);
    toast.success('Cálculos realizados com sucesso!');
  };

  const handleValidationChange = (isValid: boolean) => {
    setIsFormValid(isValid);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="p-6">
        <FormInputs 
          formData={formData} 
          setFormData={setFormData} 
          onValidationChange={handleValidationChange} 
        />
        <ActionButtons 
          onCalculate={handleCalculate} 
          isDisabled={!isFormValid}
          resultData={result} 
        />
      </Card>

      {result && (
        <>
          <ResultCard {...result} />
          <PulseInsights 
            scenario={result.scenario}
            productionTime={formData.productionTime}
            stopTime={formData.stopTime}
            deliveryTime={formData.deliveryTime}
            averageKm={formData.averageKm}
            totalTimeToCustomer={result.totalTimeToCustomer}
          />
        </>
      )}
      
      <Instructions />
    </div>
  );
};
