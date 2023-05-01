import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import App from './App';

describe('App', () => {
    it('should render page with the header, a books list and a shopping cart', () => {
        render(<App/>);

        expect(screen.getByText('Harry Potter Books')).toBeInTheDocument();

        const bookTitles = screen.getAllByText('Harry Potter and', { exact: false });

        expect(bookTitles.length).toEqual(5);

        const addToCartButtons = screen.getAllByText('Add to cart');

        expect(addToCartButtons.length).toEqual(5);

        expect(screen.getByText('Shopping cart')).toBeInTheDocument();
        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    });
});