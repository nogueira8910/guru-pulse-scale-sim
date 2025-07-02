# Análise da Ferramenta: Guru Pulse - Simulador de Escala de Entregadores

## Visão Geral

O **Guru Pulse** é uma ferramenta de simulação desenvolvida especificamente para a empresa **Gurumê** (Rio de Janeiro) para otimizar o dimensionamento de escalas de entregadores. Esta aplicação web permite calcular quantos entregadores são necessários para atender eficientemente a demanda de pedidos em diferentes turnos e condições operacionais.

## Tecnologias Utilizadas

- **Frontend**: React 18 com TypeScript
- **Build Tool**: Vite
- **UI Framework**: Tailwind CSS + shadcn/ui (componentes baseados em Radix UI)
- **Roteamento**: React Router DOM
- **Formulários**: React Hook Form com Zod para validação
- **Estado e Dados**: TanStack React Query
- **Notificações**: Sonner
- **Gráficos**: Recharts
- **Utilitários**: date-fns, html2pdf.js
- **Plataforma**: Desenvolvido na plataforma Lovable

## Funcionalidades Principais

### 1. Simulação de Escalas
A ferramenta permite simular cenários de entrega baseados em:

- **Dia da semana**: Segunda a domingo
- **Turno**: 
  - Almoço (11:40 - 17:59) - 379 minutos
  - Jantar (18:00 - 23:00) - 300 minutos
- **Pedidos estimados**: Quantidade total prevista
- **Tempo de entrega (ida)**: Em minutos
- **Distância média**: Em quilômetros
- **Tempo de produção e liberação**: Tempo de preparo
- **Tempo de parada no cliente**: Tempo médio de atendimento

### 2. Cálculos Automáticos
O sistema calcula automaticamente:

- **Tempo de retorno**: Baseado na velocidade média de 39,6 km/h
- **Tempo total de ciclo**: Produção + entrega + parada + retorno
- **Ciclos por entregador**: Baseado na duração do turno
- **Pedidos por entregador**: Considerando 2 pedidos por ciclo
- **Número de entregadores necessários**: Cálculo final arredondado para cima

### 3. Sistema de Classificação por Cenários
A ferramenta classifica a operação em 4 cenários baseados no "tempo total até o cliente" (produção + entrega):

- **Cenário A** (≤50 min): **Alta Eficiência** 🟢
- **Cenário B** (51-60 min): **Eficiência Regular** 🟡
- **Cenário C** (61-70 min): **Baixa Eficiência** 🟠
- **Cenário D** (>70 min): **Eficiência Crítica** 🔴

### 4. Insights Inteligentes (Pulse Insights)
Para cada cenário, o sistema fornece:

- **Diagnóstico da operação**: Análise do estado atual
- **Melhorias identificadas**: Sugestões específicas de otimização
- **Alertas contextuais**: Avisos baseados nos parâmetros inseridos

#### Exemplos de Insights:
- **Cenário B**: Sugestões para reforçar pré-preparo e treinar entregadores
- **Cenário C**: Alertas sobre gargalos na cozinha e distâncias altas
- **Cenário D**: Recomendações críticas como reforço imediato de equipe

### 5. Exportação de Resultados
- Funcionalidade de exportação dos resultados para PDF
- Botão para gerar relatórios dos cálculos realizados

### 6. Interface Amigável
- Design responsivo e moderno
- Validação em tempo real dos formulários
- Feedback visual para diferentes cenários
- Sistema de acordeão para instruções detalhadas

## Lógica de Negócio

### Fórmulas Principais:
```
Tempo de Retorno = (Distância Média ÷ 39,6 km/h) × 60
Tempo Total de Ciclo = Tempo até Cliente + Parada + Retorno
Ciclos por Entregador = Duração do Turno ÷ Tempo Total de Ciclo
Pedidos por Entregador = Ciclos × 2 pedidos
Entregadores Necessários = ⌈Pedidos Estimados ÷ Pedidos por Entregador⌉
```

### Cenários de Uso:
1. **Planejamento diário**: Dimensionar equipe para picos de demanda
2. **Análise de eficiência**: Identificar gargalos operacionais
3. **Otimização de rotas**: Avaliar impacto de distâncias de entrega
4. **Treinamento**: Medir impacto de melhorias no atendimento

## Benefícios para o Gurumê

1. **Otimização de Custos**: Evita contratação excessiva ou insuficiente
2. **Melhoria da Experiência**: Reduz tempos de entrega
3. **Análise Preditiva**: Antecipa problemas operacionais
4. **Tomada de Decisão**: Dados concretos para ajustes estratégicos
5. **Padronização**: Metodologia consistente para todas as operações

## Aspectos Técnicos

- **Autenticação**: Sistema simplificado (sem Supabase ativo)
- **Performance**: Cálculos em tempo real no frontend
- **Responsividade**: Interface adaptável para diferentes dispositivos
- **Acessibilidade**: Componentes com suporte a leitores de tela
- **Manutenibilidade**: Código TypeScript bem estruturado e modular

## Conclusão

O Guru Pulse é uma ferramenta especializada que demonstra como a tecnologia pode ser aplicada para resolver problemas específicos do setor de delivery. Ela combina cálculos matemáticos precisos com uma interface intuitiva, fornecendo insights valiosos para otimização operacional da Gurumê Rio de Janeiro.

A ferramenta representa um exemplo prático de como simuladores podem auxiliar na gestão de operações logísticas, proporcionando uma base científica para decisões que tradicionalmente eram tomadas apenas por experiência empírica.