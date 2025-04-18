
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FormInputsProps {
  formData: {
    weekday: string;
    shift: string;
    estimatedOrders: number;
    deliveryTime: number;
    averageKm: number;
    productionTime: number;
    stopTime: number;
  };
  setFormData: (data: any) => void;
}

export const FormInputs = ({ formData, setFormData }: FormInputsProps) => {
  return (
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
            required
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
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Distância Média de Entrega (km)</Label>
          <Input
            type="number"
            placeholder="Ex: 10"
            onChange={(e) => setFormData({ ...formData, averageKm: Number(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Tempo de Produção e Liberação (min)</Label>
          <Input
            type="number"
            placeholder="Tempo médio de preparo"
            onChange={(e) => setFormData({ ...formData, productionTime: Number(e.target.value) })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label>Tempo de Parada no Cliente (min)</Label>
          <Input
            type="number"
            placeholder="Tempo médio de parada"
            onChange={(e) => setFormData({ ...formData, stopTime: Number(e.target.value) })}
            required
          />
        </div>
      </div>
    </div>
  );
};

