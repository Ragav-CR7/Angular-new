import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppComponent } from './app.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: ProductTableComponent },// Default route
  { path: 'home', component: HomeComponent }
];

@NgModule({
  declarations: [AppComponent, ProductTableComponent,HeaderComponent,
    FooterComponent,
    HomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
