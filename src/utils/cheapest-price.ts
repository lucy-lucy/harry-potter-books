import { BOOK_PRICE } from '../constants/book-price';
import { DISCOUNTS } from '../constants/discounts';

const sortByCount = (cart: number[]): number[] => {
    const sortedCart = [...cart];
    const cartItemCount: { [key in number]: number } = {};

    cart.forEach((cartItem) => {
        cartItemCount[cartItem] = cartItemCount[cartItem] ? cartItemCount[cartItem] + 1 : 1;
    });

    return sortedCart.sort((a, b) => cartItemCount[b] - cartItemCount[a]);
};

export const calculateCheapestPrice = (cart: number[]): number => {
    const sortedCart = sortByCount(cart);
    const uniqueCartItemsCount = new Set(sortedCart).size;
    let cheapestPrice = sortedCart.length * BOOK_PRICE;

    for (let i = 2; i <= uniqueCartItemsCount; i++) {
        const tempSortedCart = [...sortedCart];
        let combinations: number[][] = [];
        let currentIndex = 0;

        while (tempSortedCart.length) {
            if (!combinations[currentIndex]) {
                combinations[currentIndex] = [];
            }

            const itemCardIndex = tempSortedCart.findIndex((sortedCartItem) => !combinations[currentIndex].includes(sortedCartItem));

            if (itemCardIndex !== -1) {
                combinations[currentIndex].push(tempSortedCart[itemCardIndex]);
                tempSortedCart.splice(itemCardIndex, 1);
            }

            if (itemCardIndex === -1 || combinations[currentIndex].length === i) {
                currentIndex++;
            }
        }

        const currentPrice = combinations.reduce((price, cart) => {
            const combinationPrice = BOOK_PRICE * cart.length * DISCOUNTS[cart.length - 1];

            return price + combinationPrice;
        }, 0);

        if (currentPrice < cheapestPrice) {
            cheapestPrice = currentPrice;
        }
    }

    return cheapestPrice;
};