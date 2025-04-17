
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

interface FormData {
  weekday: string;
  shift: string;
  estimatedOrders: number;
  deliveryTime: number;
  averageKm: number;
  productionTime: number;
  efficiency: number;
}

interface CalculationResult {
  returnTime: number;
  totalCycleTime: number;
  cyclesPerDriver: number;
  ordersPerDriver: number;
  requiredDrivers: number;
  scenario: 'A' | 'B' | 'C';
}

const INITIAL_FORM: FormData = {
  weekday: '',
  shift: '',
  estimatedOrders: 0,
  deliveryTime: 0,
  averageKm: 0,
  productionTime: 0,
  efficiency: 0.8,
};

export const GuruPulseForm = () => {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const calculateScenario = (productionTime: number, efficiency: number): 'A' | 'B' | 'C' => {
    if (productionTime <= 25 && efficiency >= 0.95) return 'A';
    if (productionTime <= 30 && efficiency >= 0.75) return 'B';
    return 'C';
  };

  const handleCalculate = () => {
    const shiftDuration = formData.shift === 'lunch' ? 379 : 300;
    const returnTime = (formData.averageKm / 39.6) * 60;
    const totalCycleTime = formData.productionTime + formData.deliveryTime + returnTime;
    const cyclesPerDriver = shiftDuration / totalCycleTime;
    const ordersPerDriver = cyclesPerDriver * 2 * formData.efficiency;
    const requiredDrivers = Math.ceil(formData.estimatedOrders / ordersPerDriver);
    const scenario = calculateScenario(formData.productionTime, formData.efficiency);

    setResult({
      returnTime,
      totalCycleTime,
      cyclesPerDriver,
      ordersPerDriver,
      requiredDrivers,
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
              <Label>Tempo de Entrega (min)</Label>
              <Input
                type="number"
                placeholder="Tempo médio de ida"
                onChange={(e) => setFormData({ ...formData, deliveryTime: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>KM Médio</Label>
              <Input
                type="number"
                placeholder="Ex: 10"
                onChange={(e) => setFormData({ ...formData, averageKm: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>Tempo de Produção (min)</Label>
              <Input
                type="number"
                placeholder="Tempo médio de preparo"
                onChange={(e) => setFormData({ ...formData, productionTime: Number(e.target.value) })}
              />
            </div>

            <div className="space-y-2">
              <Label>Eficiência do Entregador</Label>
              <Input
                type="number"
                step="0.1"
                placeholder="Ex: 0.8"
                min="0"
                max="1"
                onChange={(e) => setFormData({ ...formData, efficiency: Number(e.target.value) })}
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
        <Card className={`p-6 border-2 ${
          result.scenario === 'A' ? 'scenario-a' :
          result.scenario === 'B' ? 'scenario-b' :
          'scenario-c'
        }`}>
          <h3 className="text-lg font-semibold mb-4">Resultados da Simulação</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Entregadores Necessários</p>
              <p className="text-2xl font-bold">{result.requiredDrivers}</p>
            </div>
            <div>
              <p className="font-medium">Ciclos por Entregador</p>
              <p className="text-2xl font-bold">{result.cyclesPerDriver.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Pedidos por Entregador</p>
              <p className="text-2xl font-bold">{result.ordersPerDriver.toFixed(2)}</p>
            </div>
            <div>
              <p className="font-medium">Classificação do Cenário</p>
              <p className="text-2xl font-bold">Cenário {result.scenario}</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
