
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
  totalOrders: number,
  productionTime: number,
  deliveryTime: number,
  stopTime: number,
  averageKm: number
): CalculationResult => {
  const ORDERS_PER_TRIP = 1.9; // 90% efficiency for 2 orders per trip
  const WEEKLY_HOURS = 48;
  const returnTime = (averageKm / 39.6) * 60;
  const totalTimeToCustomer = productionTime + deliveryTime;
  const totalCycleTime = totalTimeToCustomer + stopTime + returnTime;
  
  // Calculate required drivers
  const requiredTrips = totalOrders / ORDERS_PER_TRIP;
  const totalTripTime = requiredTrips * totalCycleTime;
  const totalHours = totalTripTime / 60;
  const requiredDrivers = Math.ceil(totalHours / WEEKLY_HOURS);
  
  // Calculate cycles and orders per driver
  const cyclesPerDriver = (WEEKLY_HOURS * 60) / totalCycleTime;
  const ordersPerDriver = cyclesPerDriver * ORDERS_PER_TRIP;
  
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
