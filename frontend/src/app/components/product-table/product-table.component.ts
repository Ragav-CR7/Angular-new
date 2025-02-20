import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product..model';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  products: Product[] = [];
  showForm = false;
  newProduct: Product = { prodId: '', prodName: '', price: null, category: '', editing: false }; 

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data.map(product => ({ ...product, editing: false }));
    });
  }

  editProduct(product: Product) {
    product.editing = true; 
  }

  addProduct() {
    if (this.newProduct.prodId && this.newProduct.prodName && this.newProduct.price !== null && this.newProduct.category) {
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.showForm = false; 
          this.newProduct = { prodId: '', prodName: '', price: null, category: '', editing: false }; 
          this.loadProducts(); 
        },
        error: (err) => {
          console.error('Error adding product:', err); 
          alert('Failed to add product. Please check the console for more details.'); 
        }
      });
    } else {
      alert('Please fill in all fields.'); 
    }
  }

  saveUpdate(product: Product) {
    if (!product._id) return; 
    this.productService.updateProduct(product._id, {
      prodName: product.prodName,
      price: product.price,
      category: product.category
    }).subscribe(() => {
      product.editing = false; 
    });
  }

  deleteProduct(id: string | undefined) {
    if (!id) return; 
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}