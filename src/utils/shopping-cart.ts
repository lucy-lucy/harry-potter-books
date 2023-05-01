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

/*
To calculate the cheapest price we need to find the best combination of items (books). To do so, we need first:
    1. Sort items by count, so the most occurring items go first, [1, 2, 2, 3, 4, 5, 5] -> [2, 2, 5, 5, 1, 3, 4]
    2. Define the number of unique items, so we know the length of the largest combination -> 5
    3. Build a matrix of combinations, starting from pairs and ending with combinations with length of the number of unique items
    4. For every iteration calculate the current prices:
        - book price * number of books * discount * number of combinations
    5. If the current price is cheaper, set the current price as the cheapest price

    Example:
        i = 2: [ [2, 5], [2 ,5], [1, 3], [4] ] => 8 * 2 * 0.95 * 3 + 8  => price is 53.60
        i = 3: [ [2, 5, 1], [2, 5, 4], [4] ] => 8 * 3 * 0.9 * 2 + 8 => price is 51.20
        i = 4: [ [2, 5 ,1, 3], [2, 5, 4] ] => 8 * 4 * 0.8 + 8 * 3 * 0.9 => price is 47.20
        i = 5: [ [2, 5, 1, 3, 4], [2, 5] ] => 8 * 5 * 0.75 + 8 * 2 * 0.95 => price is 45.20

        The cheapest price is 45.20
 */
export const calculateCheapestPrice = (cartItems: CartItems): number => {
    const sortedCartItems = sortCartItemsByCount(cartItems);
    const uniqueCartItemsNumber = new Set(sortedCartItems).size;
    let cheapestPrice = cartItems.length * BOOK_PRICE;

    for (let i = 2; i <= uniqueCartItemsNumber; i++) {
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

        console.log(i, cartItemsCombinations, currentPrice.toFixed(2));

        if (currentPrice < cheapestPrice) {
            cheapestPrice = currentPrice;
        }
    }

    return Number(cheapestPrice.toFixed(2));
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

export const calculateDiscount = (cartItems: CartItems, totalPrice: number): number => {
    return Number(Math.max(cartItems.length * BOOK_PRICE - totalPrice, 0).toFixed(2));
};
