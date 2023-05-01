import { useCallback, useMemo, useState } from 'react';
import books from './api/books.json';
import styles from './App.module.css';
import BooksList from './components/feature/BooksList/BooksList';
import ShoppingCart from './components/feature/ShoppingCart/ShoppingCart';
import { CartItems } from './types/shopping-cart';
import { calculateCheapestPrice, calculateDiscount, getShoppingCartItems } from './utils/shopping-cart';

const App = () => {
    const [cartItems, setCartItems] = useState<CartItems>([]);
    const shoppingCartItems = useMemo(() => getShoppingCartItems(cartItems, books), [cartItems]);
    const totalPrice = useMemo(() => calculateCheapestPrice(cartItems), [cartItems]);
    const discount = useMemo(() => calculateDiscount(cartItems, totalPrice), [cartItems, totalPrice]);

    const handleAddClick = useCallback((id: number): void => {
        setCartItems((prevState) => [...prevState, id]);
    }, []);

    const handleRemoveClick = (id: number): void => {
        const nextCartItems = [...cartItems];
        const lastCartItemIndex = nextCartItems.lastIndexOf(id);

        if (lastCartItemIndex !== -1) {
            nextCartItems.splice(lastCartItemIndex, 1);
        }

        setCartItems(nextCartItems);
    };

    return (
        <div className={styles.wrapper}>
            <header className={styles.header}>
                <h1>Harry Potter Books</h1>
            </header>
            <main className={styles.content}>
                <BooksList books={books} onAddBook={handleAddClick}/>
            </main>
            <aside className={styles.aside}>
                <ShoppingCart
                    items={shoppingCartItems}
                    totalPrice={totalPrice}
                    discount={discount}
                    onRemove={handleRemoveClick}
                />
            </aside>
        </div>
    );
};

export default App;
