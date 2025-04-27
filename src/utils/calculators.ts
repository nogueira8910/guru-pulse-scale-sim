
interface CalculationResult {
  returnTime: number;
  totalCycleTime: number;
  cyclesPerDriver: number;
  ordersPerDriver: number;
  requiredDrivers: number;
  totalTimeToCustomer: number;
  stopTime: number;
  scenario: 'A' | 'B' | 'C' | 'D';
}

export const calculateScenario = (totalTimeToCustomer: number): 'A' | 'B' | 'C' | 'D' => {
  if (totalTimeToCustomer <= 50) return 'A';
  if (totalTimeToCustomer <= 60) return 'B';
  if (totalTimeToCustomer <= 70) return 'C';
  return 'D';
};

export const calculateDeliveryStats = (
  shift: string,
  estimatedOrders: number,
  deliveryTime: number,
  averageKm: number,
  productionTime: number,
  stopTime: number
): CalculationResult => {
  const shiftDuration = shift === 'lunch' ? 379 : 300;
  const returnTime = (averageKm / 39.6) * 60;
  const totalTimeToCustomer = productionTime + deliveryTime;
  const totalCycleTime = totalTimeToCustomer + stopTime + returnTime;
  const cyclesPerDriver = shiftDuration / totalCycleTime;
  const ordersPerDriver = cyclesPerDriver * 2;
  const requiredDrivers = Math.ceil(estimatedOrders / ordersPerDriver);
  const scenario = calculateScenario(totalTimeToCustomer);

  return {
    returnTime,
    totalCycleTime,
    cyclesPerDriver,
    ordersPerDriver,
    requiredDrivers,
    totalTimeToCustomer,
    stopTime,
    scenario,
  };
};

