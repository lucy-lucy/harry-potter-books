import { calculateCheapestPrice } from './calculate-cheapest-price';

describe('calculateCheapestPrice', () => {
    it('should calculate the cheapest price for many books', () => {
        const cart = [1, 1, 2, 2, 3, 3, 4, 5];

        expect(calculateCheapestPrice(cart)).toBe(51.2);
    });

    it('should calculate the cheapest price if there are the same books', () => {
        const cart = [1, 1, 1, 1, 1];

        expect(calculateCheapestPrice(cart)).toBe(40);
    });

    it('should calculate the cheapest price if there are no books', () => {
        expect(calculateCheapestPrice([])).toBe(0);
    });
});