
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BasicConfigStep } from './wizard/BasicConfigStep';
import { DeliveryParamsStep } from './wizard/DeliveryParamsStep';
import { OperationStep } from './wizard/OperationStep';

interface FormData {
  weekday: string;
  shift: string;
  estimatedOrders: number;
  deliveryTime: number;
  averageKm: number;
  productionTime: number;
  stopTime: number;
}

interface FormWizardProps {
  formData: FormData;
  setFormData: (data: FormData) => void;
  onValidationChange: (isValid: boolean) => void;
  onCalculate: () => void;
  isCalculating?: boolean;
}

const STEPS = [
  { id: 1, title: 'Configuração Básica', description: 'Dia, turno e volume de pedidos' },
  { id: 2, title: 'Parâmetros de Entrega', description: 'Tempo e distância das entregas' },
  { id: 3, title: 'Operação', description: 'Produção e tempo de parada' }
];

export const FormWizard = ({ 
  formData, 
  setFormData, 
  onValidationChange, 
  onCalculate,
  isCalculating = false 
}: FormWizardProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [stepValidations, setStepValidations] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false
  });

  const updateStepValidation = (step: number, isValid: boolean) => {
    const newValidations = { ...stepValidations, [step]: isValid };
    setStepValidations(newValidations);
    
    // Update overall form validation
    const allStepsValid = Object.values(newValidations).every(valid => valid);
    onValidationChange(allStepsValid);
  };

  const canProceed = stepValidations[currentStep];
  const canGoBack = currentStep > 1;
  const isLastStep = currentStep === 3;
  const allStepsComplete = Object.values(stepValidations).every(valid => valid);

  const handleNext = () => {
    if (canProceed && !isLastStep) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (canGoBack) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    // Allow navigation to completed steps or current step
    if (stepId <= currentStep || stepValidations[stepId - 1]) {
      setCurrentStep(stepId);
    }
  };

  const progress = (currentStep / STEPS.length) * 100;

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <BasicConfigStep
            formData={formData}
            setFormData={setFormData}
            onValidationChange={(isValid) => updateStepValidation(1, isValid)}
          />
        );
      case 2:
        return (
          <DeliveryParamsStep
            formData={formData}
            setFormData={setFormData}
            onValidationChange={(isValid) => updateStepValidation(2, isValid)}
          />
        );
      case 3:
        return (
          <OperationStep
            formData={formData}
            setFormData={setFormData}
            onValidationChange={(isValid) => updateStepValidation(3, isValid)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Card className="card-enhanced p-8">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Etapa {currentStep} de {STEPS.length}
          </h3>
          <span className="text-sm text-gray-500">
            {Math.round(progress)}% concluído
          </span>
        </div>
        
        <Progress value={progress} className="mb-6" />
        
        {/* Step Indicators */}
        <div className="flex items-center justify-between">
          {STEPS.map((step, index) => (
            <div key={step.id} className="flex-1">
              <div className="flex items-center">
                <button
                  onClick={() => handleStepClick(step.id)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                    step.id === currentStep
                      ? 'bg-tiffany text-white shadow-lg'
                      : stepValidations[step.id]
                      ? 'bg-green-500 text-white'
                      : step.id < currentStep
                      ? 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                      : 'bg-gray-200 text-gray-400'
                  }`}
                  disabled={step.id > currentStep && !stepValidations[step.id - 1]}
                >
                  {stepValidations[step.id] ? '✓' : step.id}
                </button>
                
                {index < STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-4 ${
                    step.id < currentStep || stepValidations[step.id] 
                      ? 'bg-green-500' 
                      : 'bg-gray-200'
                  }`} />
                )}
              </div>
              
              <div className="mt-2">
                <p className={`text-xs font-medium ${
                  step.id === currentStep ? 'text-tiffany' : 'text-gray-600'
                }`}>
                  {step.title}
                </p>
                <p className="text-xs text-gray-400">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="mb-8">
        {renderCurrentStep()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={!canGoBack}
          className="flex items-center gap-2"
        >
          <ChevronLeft className="w-4 h-4" />
          Voltar
        </Button>

        <div className="flex items-center gap-3">
          {isLastStep ? (
            <Button
              onClick={onCalculate}
              disabled={!allStepsComplete || isCalculating}
              className="button-primary flex items-center gap-2 min-w-[140px]"
            >
              {isCalculating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Calculando...
                </>
              ) : (
                'Calcular Simulação'
              )}
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!canProceed}
              className="button-primary flex items-center gap-2"
            >
              Próxima
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
};
