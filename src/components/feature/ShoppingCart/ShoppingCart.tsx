import { ShoppingCartItem } from '../../../types/shopping-cart';
import DeleteIcon from '../../ui/Icons/DeleteIcon';
import styles from './ShoppingCart.module.css';

interface ShoppingCartProps {
    items: ShoppingCartItem[];
    totalPrice: number;
    discount: number;
    onRemove: (id: number) => void;
}

const ShoppingCart = ({ items, totalPrice, discount, onRemove }: ShoppingCartProps) => {
    const handleRemove = (id: number): () => void => {
        return () => {
            onRemove(id);
        };
    };

    return (
        <div className={styles.cart}>
            <h3 className={styles.cartHeader}>Shopping cart</h3>
            {items.length === 0 && <p>Your cart is empty</p>}
            {items.length > 0 && <>
                <ul>
                    {items.map((item) => {
                        return <li key={item.id} className={styles.cartItem}>
                            <p>
                                <span className={styles.cartItemCount}>{item.count}</span> x {item.title}
                            </p>
                            <button
                                className={styles.cartItemRemoveButton}
                                onClick={handleRemove(item.id)}
                            >
                                <DeleteIcon width={20} height={20}/>
                            </button>
                        </li>;
                    })}
                </ul>
                <div className={styles.cartPriceWrapper}>
                    <span className={styles.cartPrice}>Total: {totalPrice.toFixed(2)} €</span>
                    {discount > 0 && <span className={styles.cartDiscount}>You saved {discount.toFixed(2)} €!</span>}
                </div>
            </>}
        </div>
    );
};

export default ShoppingCart;