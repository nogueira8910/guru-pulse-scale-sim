
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import {
  FileSpreadsheet,
  FileText,
  Calculator,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface FormData {
  weekday: string;
  shift: string;
  estimatedOrders: number;
  deliveryTime: number;
  averageKm: number;
  productionTime: number;
}

interface CalculationResult {
  returnTime: number;
  totalCycleTime: number;
  cyclesPerDriver: number;
  ordersPerDriver: number;
  requiredDrivers: number;
  totalTimeToCustomer: number;
  scenario: 'A' | 'B' | 'C' | 'D';
}

const INITIAL_FORM: FormData = {
  weekday: '',
  shift: '',
  estimatedOrders: 0,
  deliveryTime: 0,
  averageKm: 0,
  productionTime: 0,
};

const calculateScenario = (totalTimeToCustomer: number): 'A' | 'B' | 'C' | 'D' => {
  if (totalTimeToCustomer <= 50) return 'A';
  if (totalTimeToCustomer <= 60) return 'B';
  if (totalTimeToCustomer <= 70) return 'C';
  return 'D';
};

const getScenarioColor = (scenario: 'A' | 'B' | 'C' | 'D') => {
  switch (scenario) {
    case 'A': return 'bg-green-100 text-green-800 border-green-200';
    case 'B': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'C': return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'D': return 'bg-red-100 text-red-800 border-red-200';
    default: return '';
  }
};

export const GuruPulseForm = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const handleCalculate = () => {
    const shiftDuration = formData.shift === 'lunch' ? 379 : 300;
    const returnTime = (formData.averageKm / 39.6) * 60;
    const totalTimeToCustomer = formData.productionTime + formData.deliveryTime;
    const totalCycleTime = totalTimeToCustomer + returnTime;
    const cyclesPerDriver = shiftDuration / totalCycleTime;
    const ordersPerDriver = cyclesPerDriver * 2;
    const requiredDrivers = Math.ceil(formData.estimatedOrders / ordersPerDriver);
    const scenario = calculateScenario(totalTimeToCustomer);

    setResult({
      returnTime,
      totalCycleTime,
      cyclesPerDriver,
      ordersPerDriver,
      requiredDrivers,
      totalTimeToCustomer,
      scenario,
    });

    toast.success('Cálculos realizados com sucesso!');
  };

  const exportToExcel = () => {
    toast.success('Função de exportação para Excel será implementada em breve!');
  };

  const exportToPDF = () => {
    toast.success('Função de exportação para PDF será implementada em breve!');
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Dia da Semana</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, weekday: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o dia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monday">Segunda-feira</SelectItem>
                  <SelectItem value="tuesday">Terça-feira</SelectItem>
                  <SelectItem value="wednesday">Quarta-feira</SelectItem>
                  <SelectItem value="thursday">Quinta-feira</SelectItem>
                  <SelectItem value="friday">Sexta-feira</SelectItem>
                  <SelectItem value="saturday">Sábado</SelectItem>
                  <SelectItem value="sunday">Domingo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Turno</Label>
              <Select
                onValueChange={(value) => setFormData({ ...formData, shift: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o turno" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lunch">Almoço (11:40 - 17:59)</SelectItem>
                  <SelectItem value="dinner">Jantar (18:00 - 23:00)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Pedidos Estimados</Label>
              <Input
                type="number"
                placeholder="Quantidade total prevista"
                onChange={(e) => setFormData({ ...formData, estimatedOrders: Number(e.target.value) })}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Tempo de Entrega (ida) em minutos</Label>
              <Input
                type="number"
                placeholder="Tempo médio de ida"
                onChange={(e) => setFormData({ ...formData, deliveryTime: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>Distância Média de Entrega (km)</Label>
              <Input
                type="number"
                placeholder="Ex: 10"
                onChange={(e) => setFormData({ ...formData, averageKm: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>Tempo de Produção e Liberação (min)</Label>
              <Input
                type="number"
                placeholder="Tempo médio de preparo"
                onChange={(e) => setFormData({ ...formData, productionTime: Number(e.target.value) })}
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap gap-4">
          <Button onClick={handleCalculate} className="bg-tiffany hover:bg-tiffany-dark">
            <Calculator className="mr-2 h-4 w-4" />
            Calcular
          </Button>
          <Button onClick={exportToExcel} variant="outline">
            <FileSpreadsheet className="mr-2 h-4 w-4" />
            Exportar Excel
          </Button>
          <Button onClick={exportToPDF} variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Salvar PDF
          </Button>
        </div>
      </Card>

      {result && (
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">
                Número estimado de entregadores: {result.requiredDrivers}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Ciclos por entregador</p>
                  <p className="text-lg font-semibold">{result.cyclesPerDriver.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Pedidos por entregador</p>
                  <p className="text-lg font-semibold">{result.ordersPerDriver.toFixed(2)}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tempo de volta estimado</p>
                  <p className="text-lg font-semibold">{result.returnTime.toFixed(1)} min</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tempo total até o cliente</p>
                  <p className="text-lg font-semibold">{result.totalTimeToCustomer.toFixed(1)} min</p>
                </div>
              </div>
              <div className="pt-4">
                <Badge className={getScenarioColor(result.scenario)}>
                  Cenário {result.scenario}
                </Badge>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
