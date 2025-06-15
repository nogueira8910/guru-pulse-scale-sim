
import { Button } from '@/components/ui/button';
import { FileSpreadsheet, FileText, Calculator } from 'lucide-react';
import { toast } from 'sonner';
import * as XLSX from 'xlsx';
import html2pdf from 'html2pdf.js';

interface ActionButtonsProps {
  onCalculate: () => void;
  isDisabled?: boolean;
  resultData?: any;
}

export const ActionButtons = ({ onCalculate, isDisabled = false, resultData }: ActionButtonsProps) => {
  const exportToExcel = () => {
    if (!resultData) {
      toast.error('Por favor, calcule os resultados primeiro.');
      return;
    }

    try {
      // Format data for Excel
      const workbook = XLSX.utils.book_new();
      const worksheetData = [
        ['Relatório Guru Pulse - Simulador de Escala de Entregadores'],
        [''],
        ['Número estimado de entregadores', resultData.requiredDrivers],
        ['Ciclos por entregador', resultData.cyclesPerDriver.toFixed(2)],
        ['Pedidos por entregador', resultData.ordersPerDriver.toFixed(2)],
        ['Tempo de parada estimado', `${resultData.stopTime} min`],
        ['Tempo de volta estimado', `${resultData.returnTime.toFixed(1)} min`],
        ['Tempo total até o cliente', `${resultData.totalTimeToCustomer.toFixed(1)} min`],
        ['Tempo total do ciclo', `${resultData.totalCycleTime.toFixed(1)} min`],
        ['Cenário', `${resultData.scenario}`],
      ];
      
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Relatório');
      XLSX.writeFile(workbook, 'guru-pulse-relatorio.xlsx');
      
      toast.success('Relatório exportado para Excel com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar para Excel:', error);
      toast.error('Erro ao exportar para Excel. Tente novamente.');
    }
  };

  const exportToPDF = () => {
    if (!resultData) {
      toast.error('Por favor, calcule os resultados primeiro.');
      return;
    }

    try {
      // Create a temporary div to render the PDF content
      const element = document.createElement('div');
      element.innerHTML = `
        <div style="padding: 20px; font-family: Arial, sans-serif;">
          <h2>Relatório Guru Pulse - Simulador de Escala de Entregadores</h2>
          <hr style="margin: 10px 0;" />
          <h3>Número estimado de entregadores: ${resultData.requiredDrivers}</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Ciclos por entregador</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${resultData.cyclesPerDriver.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Pedidos por entregador</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${resultData.ordersPerDriver.toFixed(2)}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Tempo de parada estimado</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${resultData.stopTime} min</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Tempo de volta estimado</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${resultData.returnTime.toFixed(1)} min</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Tempo total até o cliente</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${resultData.totalTimeToCustomer.toFixed(1)} min</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Tempo total do ciclo</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${resultData.totalCycleTime.toFixed(1)} min</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd;">Cenário</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${resultData.scenario}</td>
            </tr>
          </table>
          <p><strong>Data do relatório:</strong> ${new Date().toLocaleDateString('pt-BR')}</p>
        </div>
      `;
      
      const opt = {
        margin: 10,
        filename: 'guru-pulse-relatorio.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
      
      html2pdf().from(element).set(opt).save();
      toast.success('Relatório exportado para PDF com sucesso!');
    } catch (error) {
      console.error('Erro ao exportar para PDF:', error);
      toast.error('Erro ao exportar para PDF. Tente novamente.');
    }
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
      <Button onClick={exportToExcel} variant="outline" disabled={isDisabled || !resultData}>
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        Exportar Excel
      </Button>
      <Button onClick={exportToPDF} variant="outline" disabled={isDisabled || !resultData}>
        <FileText className="mr-2 h-4 w-4" />
        Salvar PDF
      </Button>
    </div>
  );
};
