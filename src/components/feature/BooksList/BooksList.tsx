import { BOOK_PRICE } from '../../../constants/book-price';
import { Book } from '../../../types/books';
import Button from '../../ui/Button/Button';
import styles from './BooksList.module.css';

interface BooksListProp {
    books: Book[];
    onAddBook: (id: number) => void;
}

const BooksList = ({ books, onAddBook }: BooksListProp) => {
    const handleAddBook = (id: number): () => void => {
        return () => {
            onAddBook(id);
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
                    <div className={styles.itemButtonWrapper}>
                        <Button onClick={handleAddBook(book.id)}>Add to cart</Button>
                    </div>
                </div>
            </li>)}
        </ul>
    );
};

export default BooksList;