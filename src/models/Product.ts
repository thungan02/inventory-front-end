export interface Product {
    id: number;
    sku: string;
    name: string;
    packing: string;
    price: number;
    description: string;
    status: string;
    quantity: number;
    weight: number;
    created_at: Date;
    updated_at: Date;
}
export interface ProductCart {
    id: number;
    sku: string;
    name: string;
    packing: string;
    price: number;
    description: string;
    status: string;
    quantity: number;
    weight: number;
    quantityInCart: number;
    created_at: Date;
    updated_at: Date;
}

export interface ProductSearch {
    id: number;
    sku: string;
    name: string;
    packing: string;
    price: number;
    description: string;
    status: string;
    quantity: number;
    weight: number;
    selected: boolean;
    created_at: Date;
    updated_at: Date;
}