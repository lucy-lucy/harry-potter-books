import { useState } from 'react';
import books from './api/books.json';
import styles from './App.module.css';
import BooksList from './components/feature/BooksList/BooksList';
import { calculateCheapestPrice } from './utils/calculate-cheapest-price';

const App = () => {
    const [cart, setCart] = useState<number[]>([]);

    const handleAddClick = (id: number): void => {
        setCart((prevState) => [...prevState, id]);
    };

    const handleRemoveClick = (id: number): void => {
        const nextCart = [...cart];
        const lastCartItemIndex = cart.lastIndexOf(id);

        if (lastCartItemIndex !== -1) {
            nextCart.splice(lastCartItemIndex, 1);
        }

        setCart(nextCart);
    };

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1>Harry Potter Books</h1>
            </header>
            <main className={styles.content}>
                {books.length > 0 &&
                    <BooksList books={books} onAddBook={handleAddClick} onRemoveBook={handleRemoveClick}/>}
            </main>
            <aside className={styles.aside}>
                <ul>
                    {cart.map((cartItem, index) => <li key={index}>{cartItem}</li>)}
                    Price: {calculateCheapestPrice(cart)}
                </ul>
            </aside>
        </div>
    );
};

export default App;
