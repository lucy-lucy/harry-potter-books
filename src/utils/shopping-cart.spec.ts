import books from '../api/books.json';
import { calculateCheapestPrice, getShoppingCartItems } from './shopping-cart';

describe('Shopping cart', () => {
    describe('calculateCheapestPrice', () => {
        it('should calculate the cheapest price for many cart items', () => {
            expect(calculateCheapestPrice([1, 1, 2, 2, 3, 3, 4, 5])).toBe(51.2);
        });

        it('should calculate the cheapest price if there are the same cart items', () => {
            expect(calculateCheapestPrice([1, 1, 1, 1, 1])).toBe(40);
        });

        it('should calculate the cheapest price if there are no cart items', () => {
            expect(calculateCheapestPrice([])).toBe(0);
        });
    });

    describe('getShoppingCartItems', () => {
        it('should return shopping cart items', () => {
            expect(getShoppingCartItems([1, 1, 2, 2, 3, 3, 4, 5], books)).toEqual([
                {
                    count: 2,
                    id: 1,
                    title: 'Harry Potter and the Philosopher\'s Stone',
                },
                {
                    count: 2,
                    id: 2,
                    title: 'Harry Potter and the Chamber of Secrets',
                },
                {
                    count: 2,
                    id: 3,
                    title: 'Harry Potter and the Prisoner of Azkaban',
                },
                {
                    count: 1,
                    id: 4,
                    title: 'Harry Potter and the Goblet of Fire',
                },
                {
                    count: 1,
                    id: 5,
                    title: 'Harry Potter and the Order of the Phoenix',
                }],
            );
        });

        it('should return empty array if there are no items cart ids', () => {
            expect(getShoppingCartItems([], books)).toEqual([]);
        });
    });
});