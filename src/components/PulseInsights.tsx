
import { Card } from "@/components/ui/card";
import { FileChartLine } from "lucide-react";

interface PulseInsightsProps {
  scenario: 'A' | 'B' | 'C' | 'D';
  productionTime: number;
  stopTime: number;
  deliveryTime: number;
  averageKm: number;
  totalTimeToCustomer: number;
}

export const PulseInsights = ({
  scenario,
  productionTime,
  stopTime,
  deliveryTime,
  averageKm,
  totalTimeToCustomer,
}: PulseInsightsProps) => {
  const getScenarioContent = () => {
    switch (scenario) {
      case 'A':
        return {
          title: 'Cenário A – Alta Eficiência',
          description: 'Sua operação está performando com excelente equilíbrio entre tempo de produção e logística.',
          improvements: [
            'Continue monitorando os indicadores.',
            'Este cenário serve como referência de performance ideal.'
          ],
          additionalWarnings: []
        };
      case 'B':
        const bWarnings = [];
        if (productionTime > 30) {
          bWarnings.push('Tempo de produção acima de 30 minutos pode estar sobrecarregando a expedição.');
        }
        if (stopTime >= 8) {
          bWarnings.push('Tempo de parada está em patamar aceitável, mas pode ser otimizado.');
        }
        return {
          title: 'Cenário B – Eficiência Regular',
          description: 'Sua operação está operando no limite aceitável, mas há oportunidades claras de melhoria.',
          improvements: [
            'Reforçar etapas de pré-preparo para reduzir o tempo de produção.',
            'Avaliar gargalos na finalização e montagem.',
            'Treinar entregadores para otimizar o tempo de parada no cliente.'
          ],
          additionalWarnings: bWarnings
        };
      case 'C':
        const cWarnings = [];
        if (productionTime > 40) {
          cWarnings.push('Tempo de produção acima de 40 min pode gerar acúmulo na cozinha e atrasos em cadeia.');
        }
        if (averageKm > 9) {
          cWarnings.push('A distância média de entrega está alta, exigindo mais tempo e recursos.');
        }
        if (stopTime >= 10) {
          cWarnings.push('Tempo de parada no cliente está acima do ideal, impactando o retorno.');
        }
        return {
          title: 'Cenário C – Baixa Eficiência',
          description: 'Sua operação apresenta gargalos significativos que impactam a experiência do cliente.',
          improvements: [
            'Reforçar equipe ou redistribuir horários de produção.',
            'Analisar área de cobertura para entender se o raio de entrega pode ser reduzido.',
            'Reduzir tempo ocioso do entregador durante a parada no cliente.',
            'Planejar escala mais robusta para dias com alta demanda.'
          ],
          additionalWarnings: cWarnings
        };
      case 'D':
        const dWarnings = [];
        if (productionTime >= 45) {
          dWarnings.push('Tempo de produção em nível crítico. A operação pode estar travada em finalização.');
        }
        if (deliveryTime >= 30) {
          dWarnings.push('Tempo de entrega elevado. Reavaliar logística e raio de atendimento.');
        }
        if (averageKm > 10) {
          dWarnings.push('A distância média está acima da média. Considerar ajuste na cobertura geográfica.');
        }
        return {
          title: 'Cenário D – Eficiência Crítica',
          description: 'Sua operação está em um ponto de risco crítico. A eficiência está comprometida e a experiência do cliente pode ser impactada negativamente.',
          improvements: [
            'Reforçar o time de produção imediatamente.',
            'Ativar contingência de frota ou redistribuir entregadores.',
            'Reduzir área de entrega durante picos.',
            'Reorganizar tempos de preparo para antecipar gargalos.'
          ],
          additionalWarnings: dWarnings
        };
    }
  };

  const content = getScenarioContent();

  return (
    <Card className="p-6 border-[#F3F4F6] dark:border-gray-700">
      <div className="space-y-6">
        <div className="flex items-start gap-4">
          <FileChartLine className="w-6 h-6 text-primary mt-1" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Pulse Insights</h2>
            <p className="text-gray-600 dark:text-gray-400">
              Análise do Cenário & Melhorias Identificadas
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {content.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            {content.description}
          </p>

          {content.additionalWarnings.length > 0 && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg space-y-2">
              {content.additionalWarnings.map((warning, index) => (
                <p key={index} className="text-yellow-800 dark:text-yellow-200">
                  {warning}
                </p>
              ))}
            </div>
          )}

          <div className="space-y-2">
            <h4 className="font-medium text-gray-800 dark:text-gray-200">
              Melhorias Identificadas:
            </h4>
            <ul className="list-disc pl-5 space-y-2">
              {content.improvements.map((improvement, index) => (
                <li key={index} className="text-gray-700 dark:text-gray-300">
                  {improvement}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
};
