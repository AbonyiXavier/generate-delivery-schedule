import { expect, it } from '@jest/globals';
import { filterValidProductsForDelivery, getDeliveryDates, isGreenDelivery } from '../../src/services/deliverySchedule.service';
import { ProductType } from '../../src/enums';
  

describe('isGreenDelivery', () => {

    it('returns false for a Monday', () => {
        const monday = new Date('2023-08-21');
        expect(isGreenDelivery(monday)).toBe(false);
    });

    it('returns false for a Tuesday', () => {
        const tuesday = new Date('2023-08-22');
        expect(isGreenDelivery(tuesday)).toBe(false);
    });

    it('returns true for a Wednesday', () => {
        const wednesday = new Date('2023-08-23');
        expect(isGreenDelivery(wednesday)).toBe(true);
    });

    it('returns false for a Thursday', () => {
        const thursday = new Date('2023-08-24');
        expect(isGreenDelivery(thursday)).toBe(false);
    });

    it('returns true for a Friday', () => {
        const friday = new Date('2023-08-25');
        expect(isGreenDelivery(friday)).toBe(true);
    });

    it('returns false for a Saturday', () => {
        const saturday = new Date('2023-08-26');
        expect(isGreenDelivery(saturday)).toBe(false);
    });

    it('returns false for a Sunday', () => {
        const sunday = new Date('2023-08-27');
        expect(isGreenDelivery(sunday)).toBe(false);
    });

    it('returns true for date 5th and 15 of each month', () => {
      const fifthDayOfMonth = new Date('2023-08-05');
      const fifteenthhDayOfMonth = new Date('2023-08-15');

      expect(isGreenDelivery(fifthDayOfMonth)).toBe(true);
      expect(isGreenDelivery(fifteenthhDayOfMonth)).toBe(true);
  });
});

describe('filterValidProductsForDelivery', () => {
  const today = new Date('2023-08-16');

  it('filters external products correctly', () => {
    const products = [
      { productId: 1, name: 'Product A',  deliveryDays: [1, 3, 5], productType: ProductType.EXTERNAL, daysInAdvance: 3, },
      { productId: 2, name: 'Product B', deliveryDays: [2, 4], productType: ProductType.NORMAL, daysInAdvance: 5 },
    ];

    // Wednesday's Date
    const deliveryDate = new Date('2023-08-23');
    const payload = {
        products, 
        deliveryDate, 
        today
    }

    const validProducts = filterValidProductsForDelivery(payload);    

    // Assert that only the external product passes the filter
    expect(validProducts).toHaveLength(1);
    expect(validProducts[0].productType).toBe(ProductType.EXTERNAL);
  });

  it('filters invalid products correctly', () => {
    const products = [
      { productId: 2, name: 'Product B', deliveryDays: [2, 4], productType: ProductType.NORMAL, daysInAdvance: 5 },
      { productId: 3, name: 'Product C',  deliveryDays: [0, 6], productType: ProductType.TEMPORARY, daysInAdvance: 5, },
    ];


    // Wednesday's Date
    const deliveryDate = new Date('2023-08-23');
    const payload = {
        products, 
        deliveryDate, 
        today
    }

    const inValidProducts = filterValidProductsForDelivery(payload);    

    expect(inValidProducts).toHaveLength(0);
    expect(inValidProducts).toEqual([]);
  });
});


describe('getDeliveryDates', () => {
  const postalCode = 12345;
  const today = new Date('2023-08-23');

  it('should generate delivery dates correctly', () => {
    const products = [
      { productId: 1, name: 'Product A',  deliveryDays: [0, 6], productType: ProductType.EXTERNAL, daysInAdvance: 5, },
    ];

    const deliveryDate = new Date('2023-08-23');
    const payload = {
        products, 
        deliveryDate, 
        today
    }

    filterValidProductsForDelivery(payload);   
    const deliveryDates = getDeliveryDates(postalCode, products);

    expect(deliveryDates).toHaveLength(14);
  });
});
