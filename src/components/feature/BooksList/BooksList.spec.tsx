import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import books from '../../../api/books.json';
import BooksList from './BooksList';

describe('BooksList', () => {
    it('should render a list of books', () => {
        const handleAddBook = jest.fn();

        render(<BooksList books={books} onAddBook={handleAddBook}/>);

        const list = screen.getByRole('list');
        const listItems = screen.getAllByRole('listitem');

        expect(list).toBeInTheDocument();
        expect(listItems.length).toEqual(books.length);

        const title = screen.getByText(books[0].title);
        const description = screen.getByText(books[0].description);
        const image = screen.getByAltText(books[0].title);

        expect(title).toHaveTextContent(books[0].title);
        expect(description).toHaveTextContent(books[0].description);
        expect(image).toBeInTheDocument();
    });

    it('should handle a click on "Add to cart" button', () => {
        const handleAddBook = jest.fn();

        render(<BooksList books={books} onAddBook={handleAddBook}/>);

        const addToCartButton = screen.getAllByText('Add to cart');

        fireEvent.click(addToCartButton[0]);

        expect(handleAddBook).toHaveBeenCalledTimes(1);
    });
});