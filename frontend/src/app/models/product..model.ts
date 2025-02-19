// src/app/models/product.model.ts
export interface Product {
  _id?: string; // Optional if it may not be present
  prodId?: string; // Optional if it may not be present
  prodName: string;
  price: number | null; // Assuming price can be null
  category: string;
  editing?: boolean; // Optional for editing state
}