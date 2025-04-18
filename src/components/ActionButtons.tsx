
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText, Calculator } from 'lucide-react';
import { toast } from 'sonner';

interface ActionButtonsProps {
  onCalculate: () => void;
  isDisabled?: boolean;
}

export const ActionButtons = ({ onCalculate, isDisabled = false }: ActionButtonsProps) => {
  const exportToExcel = () => {
    toast.success('Função de exportação para Excel será implementada em breve!');
  };

  const exportToPDF = () => {
    toast.success('Função de exportação para PDF será implementada em breve!');
  };

  return (
    <div className="mt-6 flex flex-wrap gap-4">
      <Button 
        onClick={onCalculate} 
        className="bg-tiffany hover:bg-tiffany-dark" 
        disabled={isDisabled}
      >
        <Calculator className="mr-2 h-4 w-4" />
        Calcular
      </Button>
      <Button onClick={exportToExcel} variant="outline" disabled={isDisabled}>
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        Exportar Excel
      </Button>
      <Button onClick={exportToPDF} variant="outline" disabled={isDisabled}>
        <FileText className="mr-2 h-4 w-4" />
        Salvar PDF
      </Button>
    </div>
  );
};
