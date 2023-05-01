import { useState } from 'react';
import books from './api/books.json';
import { calculateCheapestPrice } from './utils/cheapest-price';

const App = () => {
    const [cart, setCart] = useState<number[]>([]);

    const handleAddClick = (id: number): () => void => {
        return () => {
            setCart((prevState) => [...prevState, id]);
        };
    };

    const handleRemoveClick = (id: number): () => void => {
        return () => {
            const nextCart = [...cart];
            const lastCartItemIndex = cart.lastIndexOf(id);

            if (lastCartItemIndex !== -1) {
                nextCart.splice(lastCartItemIndex, 1);
            }

            setCart(nextCart);
        };
    };

    return (
        <>
            <div>Harry Potter Books</div>
            <ul>
                {books.map((book) => <li key={book.id}>
                    {book.id} - {book.title}
                    <button onClick={handleAddClick(book.id)}>Add to cart</button>
                    <button onClick={handleRemoveClick(book.id)}>Remove</button>
                </li>)}
            </ul>
            <ul>
                {cart.map((cartItem, index) => <li key={index}>{cartItem}</li>)}
                Price: {calculateCheapestPrice(cart)}
            </ul>
        </>
    );
};

export default App;
