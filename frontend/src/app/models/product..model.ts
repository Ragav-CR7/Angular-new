
export interface Product {
  _id?: string; 
  prodId?: string;
  prodName: string;
  price: number | null; 
  category: string;
  editing?: boolean; 
}