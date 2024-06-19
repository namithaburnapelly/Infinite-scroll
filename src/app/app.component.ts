import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CommonModule } from '@angular/common';
import { Product } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InfiniteScrollModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  title = 'Infinite-scroll';
  products!: Product[];
  page: number = 1;
  isloading: boolean = true;
  totalProductsCount!: number;
  eof: boolean = false;


  constructor(private dataService: DataService) {
    this.getProducts()
  }

  getProducts() {
    this.dataService.getProducts().subscribe(data => {
      this.products = data.products
      this.totalProductsCount = data.total;
    })
  }

  onScrollDown() {
    this.page++;
    this.dataService.getProducts(this.page).subscribe(response => {
      this.addLoading()
      setTimeout(() => {
        if (this.products.length === this.totalProductsCount) {
          this.removeLoading();
          this.eof = true;
        }
        this.products = [...this.products, ...response.products];
      }, 1000)
    })
  }
  addLoading() {
    this.isloading = true
  }

  removeLoading() {
    this.isloading = false
  }
}
