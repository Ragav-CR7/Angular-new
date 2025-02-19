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
  newProduct: Product = { prodId: '', prodName: '', price: null, category: '', editing: false }; // Include prodId

  constructor(private productService: ProductService) {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe((data: Product[]) => {
      this.products = data.map(product => ({ ...product, editing: false }));
    });
  }

  editProduct(product: Product) {
    product.editing = true; // Set editing to true for selected product
  }

  addProduct() {
    // Ensure all required fields are filled
    if (this.newProduct.prodId && this.newProduct.prodName && this.newProduct.price !== null && this.newProduct.category) {
      // Send the new product to the server
      this.productService.addProduct(this.newProduct).subscribe({
        next: () => {
          this.showForm = false; // Hide the form after adding
          this.newProduct = { prodId: '', prodName: '', price: null, category: '', editing: false }; // Reset the new product
          this.loadProducts(); // Reload the products
        },
        error: (err) => {
          console.error('Error adding product:', err); // Log the error for debugging
          alert('Failed to add product. Please check the console for more details.'); // Optional: Alert the user
        }
      });
    } else {
      alert('Please fill in all fields.'); // Alert if fields are empty
    }
  }

  saveUpdate(product: Product) {
    if (!product._id) return; // Prevent undefined ID errors
    this.productService.updateProduct(product._id, {
      prodName: product.prodName,
      price: product.price,
      category: product.category
    }).subscribe(() => {
      product.editing = false; // Disable edit mode after saving
    });
  }

  deleteProduct(id: string | undefined) {
    if (!id) return; // Prevent calling deleteProduct if id is undefined
    this.productService.deleteProduct(id).subscribe(() => {
      this.loadProducts();
    });
  }
}