
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";

export const Instructions = () => {
  return (
    <Card className="p-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="instructions">
          <AccordionTrigger>Instruções de Uso</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 text-left">
              <p>
                O Guru Pulse é um simulador para planejamento de escala de entregadores.
                Os cálculos consideram:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Turnos com durações fixas</li>
                <li>Tempo médio de entrega com ida cuidadosa (comida japonesa)</li>
                <li>Retorno 10% mais rápido</li>
                <li>Eficiência prática da operação</li>
              </ul>
              <p>
                Use os campos acima para simular sua demanda real. A classificação ajuda a
                identificar gargalos e avaliar se o time está operando no ideal.
              </p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Classificação dos Cenários:</h4>
                <ul className="space-y-2">
                  <li className="p-2 bg-green-100 text-green-800 rounded">
                    A – Máxima eficiência: Produção ≤ 25 min e Eficiência ≥ 95%
                  </li>
                  <li className="p-2 bg-yellow-100 text-yellow-800 rounded">
                    B – Eficiência média: Produção ≤ 30 min e Eficiência ≥ 75%
                  </li>
                  <li className="p-2 bg-red-100 text-red-800 rounded">
                    C – Eficiência baixa: Produção ≤ 35 min e Eficiência ≥ 65%
                  </li>
                </ul>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
