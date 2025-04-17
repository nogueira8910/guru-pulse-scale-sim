
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { Info } from "lucide-react";

export const Instructions = () => {
  return (
    <Card className="p-6">
      <Accordion type="single" collapsible>
        <AccordionItem value="instructions">
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              <Info className="h-5 w-5" />
              Como funciona o cálculo?
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 text-left">
              <p>
                Este simulador estima a quantidade necessária de entregadores por turno 
                com base no volume de pedidos e nas condições operacionais. O tempo 
                total até o cliente define o nível de eficiência da operação, 
                classificado de A a D. Quanto menor esse tempo, mais eficiente é o cenário.
              </p>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Classificação dos Cenários:</h4>
                <ul className="space-y-2">
                  <li className="p-2 bg-green-100 text-green-800 rounded">
                    A – Máxima eficiência: até 50 minutos
                  </li>
                  <li className="p-2 bg-yellow-100 text-yellow-800 rounded">
                    B – Eficiência alta: 51 a 60 minutos
                  </li>
                  <li className="p-2 bg-orange-100 text-orange-800 rounded">
                    C – Eficiência média: 61 a 70 minutos
                  </li>
                  <li className="p-2 bg-red-100 text-red-800 rounded">
                    D – Eficiência baixa: acima de 70 minutos
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
