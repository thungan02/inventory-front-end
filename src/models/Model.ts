
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

export interface Order {
    id: number;
    created_by: string;
    address: string;
    phone: string;
    quantity: number;
    packing: string;
    city: string;
    ward: string;
    district: string;
    total_price: number;
    customer: Customer;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export interface Material {
    id: number;
    name: string;
    packing: string;
    origin: string;
    price: number;
    unit: string;
    note: string;
    status: string;
    quantity: number;
    weight: string;
    created_at: Date;
    updated_at: Date;
}

export interface Customer {
    id: number;
    group_customer_id: number;
    name: string;
    city: string;
    district: string;
    ward: string;
    birthday: Date;
    gender: boolean;
    phone: string;
    email: string;
    address: string;
    note: string;
    created_at: Date;
    updated_at: Date;
}

export interface Provider {
    id: number;
    name: string;
    address: string;
    city: string;
    district: string;
    ward: string;
    phone: string;
    email: string;
    note: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}
export interface GroupCustomer{
    id: number;
    name: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}
export interface Warehouse {
    id: number;
    name: string;
    status: string;
    city: string;
    district: string;
    ward: string;
    note: string;
    address: string;
    created_at: Date;
    updated_at: Date;
}

export interface Discount {
    id: number;
    coupon_code: string;
    minimum_order_value: number;
    note: string;
    maximum_discount_value: number;
    discount_value: number;
    discount_unit: string;
    status: string;
    valid_until: Date;
    valid_start: Date;
}

export interface Discount {
    id: number;
    coupon_code: string;
    minimum_order_value: number;
    note: string;
    maximum_discount_value: number;
    discount_value: number;
    discount_unit: string;
    status: string;
    valid_until: Date;
    valid_start: Date;
}

export interface Category {
    id: number;
    name: string;
    type: string;
    status: string;
    created_at: string;
    updated_at: string;
}

export interface ExportMaterialReceipt {
    id: number;
    note: string | null;
    receipt_date: Date;
    type: string;
    warehouse: Warehouse;
    created_at: Date;
    updated_at: Date;
}

export interface ImportMaterialReceipt{
    id: number;
    note: string | null;
    receipt_date: Date;
    type: string;
    total_price: number;
    warehouse: Warehouse;
    created_at: Date;
    updated_at: Date;
}

export interface ExportProductReceipt {
    id: number;
    note: string | null;
    receipt_date: Date;
    type: string;
    warehouse: Warehouse;
    created_at: Date;
    updated_at: Date;
}

export interface ImportProductReceipt{
    id: number;
    note: string | null;
    receipt_date: Date;
    type: string;
    warehouse: Warehouse;
    created_at: Date;
    updated_at: Date;
}