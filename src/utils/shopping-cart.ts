import { BOOK_PRICE } from '../constants/book-price';
import { DISCOUNTS } from '../constants/discounts';
import { Book } from '../types/books';
import { CartItemCountById, CartItems, ShoppingCartItem } from '../types/shopping-cart';

const getCartItemCountById = (cartItems: CartItems): CartItemCountById => {
    const itemCountById: CartItemCountById = {};

    cartItems.forEach((cartItem) => {
        itemCountById[cartItem] = itemCountById[cartItem] ? itemCountById[cartItem] + 1 : 1;
    });

    return itemCountById;
};

const sortCartItemsByCount = (cartItems: CartItems): CartItems => {
    const itemCountById = getCartItemCountById(cartItems);

    return [...cartItems].sort((a, b) => itemCountById[b] - itemCountById[a]);
};

const calculatePriceForCombinations = (combinations: number[][]): number => {
    return combinations.reduce((price, cartItems) => {
        const combinationPrice = BOOK_PRICE * cartItems.length * DISCOUNTS[cartItems.length - 1];

        return price + combinationPrice;
    }, 0);
};

export const calculateCheapestPrice = (cartItems: CartItems): number => {
    const sortedCartItems = sortCartItemsByCount(cartItems);
    const uniqueCartItemsCount = new Set(sortedCartItems).size;
    let cheapestPrice = cartItems.length * BOOK_PRICE;

    for (let i = 2; i <= uniqueCartItemsCount; i++) {
        const tempSortedCartItems = [...sortedCartItems];
        let cartItemsCombinations: number[][] = [];
        let currentCombinationIndex = 0;

        while (tempSortedCartItems.length) {
            if (!cartItemsCombinations[currentCombinationIndex]) {
                cartItemsCombinations[currentCombinationIndex] = [];
            }

            const itemCardIndex = tempSortedCartItems.findIndex((sortedCartItem) => !cartItemsCombinations[currentCombinationIndex].includes(sortedCartItem));

            if (itemCardIndex !== -1) {
                cartItemsCombinations[currentCombinationIndex].push(tempSortedCartItems[itemCardIndex]);
                tempSortedCartItems.splice(itemCardIndex, 1);
            }

            if (itemCardIndex === -1 || cartItemsCombinations[currentCombinationIndex].length === i) {
                currentCombinationIndex++;
            }
        }

        const currentPrice = calculatePriceForCombinations(cartItemsCombinations);

        if (currentPrice < cheapestPrice) {
            cheapestPrice = currentPrice;
        }
    }

    return cheapestPrice;
};

export const getShoppingCartItems = (cartItems: CartItems, items: Book[]): ShoppingCartItem[] => {
    const itemCountById = getCartItemCountById(cartItems);
    const shoppingCartItems: ShoppingCartItem[] = [];

    Object.keys(itemCountById).forEach((id: string) => {
        const itemId = Number(id);
        const item = items.find((item) => item.id === itemId);

        if (item) {
            shoppingCartItems.push({
                id: itemId,
                title: item.title,
                count: itemCountById[itemId],
            });
        }
    });

    return shoppingCartItems;
};
