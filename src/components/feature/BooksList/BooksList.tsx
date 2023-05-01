import { BOOK_PRICE } from '../../../constants/book-price';
import { Book } from '../../../types/books';
import Button from '../../ui/Button/Button';
import styles from './BooksList.module.css';

interface BooksListProp {
    books: Book[];
    onAddBook: (id: number) => void;
    onRemoveBook: (id: number) => void;
}

const BooksList = ({ books, onAddBook, onRemoveBook }: BooksListProp) => {
    const handleAddBook = (id: number): () => void => {
        return () => {
            onAddBook(id);
        };
    };

    const handleRemoveBook = (id: number): () => void => {
        return () => {
            onRemoveBook(id);
        };
    };

    return (
        <ul className={styles.list}>
            {books.map((book) => <li key={book.id} className={styles.item}>
                <img className={styles.itemImage} src={book.image} alt={book.title}/>
                <div className={styles.itemContent}>
                    <div className={styles.itemTitleWrapper}>
                        <h4 className={styles.itemTitle}>{book.title}</h4>
                        <span className={styles.itemPrice}>{BOOK_PRICE} €</span>
                    </div>
                    <p className={styles.itemDescription}>{book.author}</p>
                    <p className={styles.itemDescription}>{book.description}</p>
                    <div className={styles.itemButtonsWrapper}>
                        <Button onClick={handleAddBook(book.id)}>Add to cart</Button>
                        <Button onClick={handleRemoveBook(book.id)}>Remove</Button>
                    </div>
                </div>
            </li>)}
        </ul>
    );
};

export default BooksList;