
import React, { useState } from 'react';
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Clock, TruckIcon, StopCircle, Factory, ArrowRight, CircleCheck, CircleX } from "lucide-react";
import { cn } from "@/lib/utils";
import { calculateScenario } from "@/utils/calculators";

interface FormData {
  startDate: Date | undefined;
  endDate: Date | undefined;
  totalOrders: number;
  averageDistance: number;
  productionTime: number;
  deliveryTime: number;
  stopTime: number;
}

interface ComparisonResult {
  totalTimeToCustomer: number;
  scenario: 'A' | 'B' | 'C' | 'D';
  productionGap: number;
  deliveryGap: number;
  stopGap: number;
  totalGap: number;
}

const idealValues = {
  production: 25,
  delivery: 25,
  stop: 5,
  total: 50
};

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
    case 'A': return 'Eficiência Alta: até 50 minutos';
    case 'B': return 'Eficiência Regular: 51 a 60 minutos';
    case 'C': return 'Eficiência Baixa: 61 a 70 minutos';
    case 'D': return 'Eficiência Crítica: acima de 70 minutos';
  }
};

const Comparativo = () => {
  const [formData, setFormData] = useState<FormData>({
    startDate: undefined,
    endDate: undefined,
    totalOrders: 0,
    averageDistance: 0,
    productionTime: 0,
    deliveryTime: 0,
    stopTime: 0
  });

  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleCalculate = () => {
    const totalTimeToCustomer = formData.productionTime + formData.deliveryTime;
    const productionGap = formData.productionTime - idealValues.production;
    const deliveryGap = formData.deliveryTime - idealValues.delivery;
    const stopGap = formData.stopTime - idealValues.stop;
    const totalGap = totalTimeToCustomer - idealValues.total;
    
    setResult({
      totalTimeToCustomer,
      scenario: calculateScenario(totalTimeToCustomer),
      productionGap,
      deliveryGap,
      stopGap,
      totalGap
    });
    
    setFormSubmitted(true);
  };

  const generateImprovement = () => {
    if (!result || result.scenario === 'A') return null;
    
    const improvements = [];
    
    if (result.productionGap > 0) {
      improvements.push(`Reduza ${result.productionGap} minutos na produção.`);
    }
    
    if (result.deliveryGap > 0) {
      improvements.push(`Reduza ${result.deliveryGap} minutos na entrega.`);
    }
    
    if (result.stopGap > 0) {
      improvements.push(`Reduza ${result.stopGap} minutos na parada.`);
    }
    
    if (improvements.length > 0) {
      return (
        <div className="mt-6 p-4 border border-dashed rounded-md">
          <h4 className="font-medium mb-2">Sugestões de Melhoria:</h4>
          <ul className="space-y-1">
            {improvements.map((improvement, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <ArrowRight className="h-4 w-4 text-tiffany" />
                {improvement}
              </li>
            ))}
            <li className="mt-2 font-medium text-tiffany">
              Implemente essas melhorias para atingir o Cenário A.
            </li>
          </ul>
        </div>
      );
    }
    
    return null;
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
        Comparativo
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 1 - Form Inputs */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Informações do Período</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Data Inicial</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.startDate && "text-muted-foreground"
                      )}
                    >
                      {formData.startDate ? (
                        format(formData.startDate, "dd/MM/yyyy")
                      ) : (
                        <span>Selecionar data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) =>
                        setFormData({ ...formData, startDate: date })
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="space-y-2">
                <Label>Data Final</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !formData.endDate && "text-muted-foreground"
                      )}
                    >
                      {formData.endDate ? (
                        format(formData.endDate, "dd/MM/yyyy")
                      ) : (
                        <span>Selecionar data</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) =>
                        setFormData({ ...formData, endDate: date })
                      }
                      initialFocus
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Total de pedidos</Label>
              <Input 
                type="number" 
                placeholder="Ex: 100"
                onChange={(e) => setFormData({ ...formData, totalOrders: Number(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Distância média (km)</Label>
              <Input 
                type="number" 
                step="0.1"
                placeholder="Ex: 5.5"
                onChange={(e) => setFormData({ ...formData, averageDistance: Number(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Factory className="h-4 w-4 text-tiffany" />
                Tempo médio de produção/liberação (min)
              </Label>
              <Input 
                type="number" 
                placeholder="Ex: 30"
                onChange={(e) => setFormData({ ...formData, productionTime: Number(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <TruckIcon className="h-4 w-4 text-tiffany" />
                Tempo médio de entrega (min)
              </Label>
              <Input 
                type="number" 
                placeholder="Ex: 25"
                onChange={(e) => setFormData({ ...formData, deliveryTime: Number(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <StopCircle className="h-4 w-4 text-tiffany" />
                Tempo médio de parada no cliente (min)
              </Label>
              <Input 
                type="number" 
                placeholder="Ex: 5"
                onChange={(e) => setFormData({ ...formData, stopTime: Number(e.target.value) })}
              />
            </div>
            
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-tiffany" />
                Tempo total até o cliente (min)
              </Label>
              <Input 
                type="text" 
                value={formData.productionTime + formData.deliveryTime || 0}
                readOnly
                className="bg-gray-50"
              />
            </div>
            
            <Button 
              className="w-full mt-4" 
              onClick={handleCalculate}
              disabled={!formData.startDate || !formData.endDate || formData.productionTime <= 0 || formData.deliveryTime <= 0 || formData.stopTime <= 0}
            >
              Calcular Comparativo
            </Button>
          </div>
        </Card>
        
        {/* Card 2 - Comparison Results */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Comparativo Ideal vs Atual</h2>
          
          {formSubmitted && result ? (
            <div className="space-y-6">
              <div className="mb-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-lg font-medium">Cenário Atual</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Baseado nos dados informados
                    </p>
                  </div>
                  <div className="mt-2 sm:mt-0">
                    <Badge className={getScenarioColor(result.scenario)}>
                      Cenário {result.scenario} – {getScenarioDescription(result.scenario)}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-md">
                  <div className="font-medium">Indicador</div>
                  <div className="font-medium text-center">Atual</div>
                  <div className="font-medium text-right">Ideal</div>
                </div>
                
                {/* Production Time Comparison */}
                <div className="grid grid-cols-3 gap-4 p-4 border-b">
                  <div className="flex items-center gap-2">
                    <Factory className="h-4 w-4 text-tiffany" />
                    <span>Produção</span>
                  </div>
                  <div className="text-center">{formData.productionTime} min</div>
                  <div className="text-right">{idealValues.production} min</div>
                </div>
                <div className="flex items-center justify-between px-4">
                  <div>Gap</div>
                  <div className="flex items-center gap-2">
                    {result.productionGap <= 0 ? (
                      <>
                        <CircleCheck className="h-4 w-4 text-green-500" />
                        <span className="text-green-600 font-medium">Meta Atingida</span>
                      </>
                    ) : (
                      <>
                        <CircleX className="h-4 w-4 text-red-500" />
                        <span className="text-red-600 font-medium">Reduzir {result.productionGap} minutos</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Delivery Time Comparison */}
                <div className="grid grid-cols-3 gap-4 p-4 border-b">
                  <div className="flex items-center gap-2">
                    <TruckIcon className="h-4 w-4 text-tiffany" />
                    <span>Entrega</span>
                  </div>
                  <div className="text-center">{formData.deliveryTime} min</div>
                  <div className="text-right">{idealValues.delivery} min</div>
                </div>
                <div className="flex items-center justify-between px-4">
                  <div>Gap</div>
                  <div className="flex items-center gap-2">
                    {result.deliveryGap <= 0 ? (
                      <>
                        <CircleCheck className="h-4 w-4 text-green-500" />
                        <span className="text-green-600 font-medium">Meta Atingida</span>
                      </>
                    ) : (
                      <>
                        <CircleX className="h-4 w-4 text-red-500" />
                        <span className="text-red-600 font-medium">Reduzir {result.deliveryGap} minutos</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Stop Time Comparison */}
                <div className="grid grid-cols-3 gap-4 p-4 border-b">
                  <div className="flex items-center gap-2">
                    <StopCircle className="h-4 w-4 text-tiffany" />
                    <span>Parada</span>
                  </div>
                  <div className="text-center">{formData.stopTime} min</div>
                  <div className="text-right">{idealValues.stop} min</div>
                </div>
                <div className="flex items-center justify-between px-4">
                  <div>Gap</div>
                  <div className="flex items-center gap-2">
                    {result.stopGap <= 0 ? (
                      <>
                        <CircleCheck className="h-4 w-4 text-green-500" />
                        <span className="text-green-600 font-medium">Meta Atingida</span>
                      </>
                    ) : (
                      <>
                        <CircleX className="h-4 w-4 text-red-500" />
                        <span className="text-red-600 font-medium">Reduzir {result.stopGap} minutos</span>
                      </>
                    )}
                  </div>
                </div>
                
                {/* Total Time Comparison */}
                <div className="grid grid-cols-3 gap-4 p-4 border-b bg-gray-50 rounded-md">
                  <div className="font-medium flex items-center gap-2">
                    <Clock className="h-4 w-4 text-tiffany" />
                    <span>Total Cliente</span>
                  </div>
                  <div className="font-medium text-center">{result.totalTimeToCustomer} min</div>
                  <div className="font-medium text-right">{idealValues.total} min</div>
                </div>
                <div className="flex items-center justify-between px-4">
                  <div>Gap</div>
                  <div className="flex items-center gap-2">
                    {result.totalGap <= 0 ? (
                      <>
                        <CircleCheck className="h-4 w-4 text-green-500" />
                        <span className="text-green-600 font-medium">Meta Atingida</span>
                      </>
                    ) : (
                      <>
                        <CircleX className="h-4 w-4 text-red-500" />
                        <span className="text-red-600 font-medium">Reduzir {result.totalGap} minutos</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              {generateImprovement()}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[400px] text-center">
              <p className="text-gray-500">Preencha os dados e clique em "Calcular Comparativo" para ver os resultados.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Comparativo;
