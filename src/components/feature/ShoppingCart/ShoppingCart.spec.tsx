import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import ShoppingCart from './ShoppingCart';

describe('ShoppingCart', () => {
    it('should render an empty shopping cart', () => {
        const handleRemove = jest.fn();

        render(<ShoppingCart items={[]} discount={0} totalPrice={0} onRemove={handleRemove}/>);

        expect(screen.getByRole('heading')).toHaveTextContent('Shopping cart');
        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    });

    it('should render a shopping cart with items', () => {
        const handleRemove = jest.fn();
        const shoppingCartItems = [
            {
                id: 1,
                title: 'Harry Potter and the Philosopher\'s Stone',
                count: 2,
            },
            {
                id: 3,
                title: 'Harry Potter and the Prisoner of Azkaban',
                count: 1,
            },
        ];
        const totalPrice = 23.20;

        render(<ShoppingCart items={shoppingCartItems} discount={0.8} totalPrice={totalPrice}
                             onRemove={handleRemove}/>);

        expect(screen.getByRole('heading')).toHaveTextContent('Shopping cart');
        expect(screen.queryByText('Your cart is empty')).not.toBeInTheDocument();

        expect(screen.getByText(shoppingCartItems[0].title, { exact: false })).toBeInTheDocument();
        expect(screen.getByText(shoppingCartItems[0].count)).toBeInTheDocument();
        expect(screen.getByText(shoppingCartItems[1].title, { exact: false })).toBeInTheDocument();
        expect(screen.getByText(shoppingCartItems[1].count)).toBeInTheDocument();

        expect(screen.getByText('Total: 23.20 €')).toBeInTheDocument();
        expect(screen.getByText('You saved 0.80 €!')).toBeInTheDocument();
    });
});