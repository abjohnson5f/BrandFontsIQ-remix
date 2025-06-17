import { calculateFontValue, CalculationInput } from '../src/index';

describe('calculateFontValue', () => {
  it('should calculate font value correctly', () => {
    const input: CalculationInput = {
      fontCount: 10,
      employeeCount: 100,
      averageSalary: 75000,
      industryType: 'technology',
    };

    const result = calculateFontValue(input);

    expect(result).toBeDefined();
    expect(result.economicImpact.value).toBeGreaterThan(0);
    expect(result.efficiencyGains.hoursPerYear).toBe(1000);
    expect(result.riskMitigation.score).toBe(85);
  });

  it('should handle zero values', () => {
    const input: CalculationInput = {
      fontCount: 0,
      employeeCount: 0,
      averageSalary: 0,
      industryType: 'retail',
    };

    const result = calculateFontValue(input);

    expect(result).toBeDefined();
    expect(result.economicImpact.value).toBe(5000); // Just legal compliance
  });
});
