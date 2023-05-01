export interface ShoppingCartItem {
    id: number;
    title: string;
    count: number;
}

export type CartItems = number[];

export type CartItemCountById = { [key in number]: number };