import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  pageTitle: string = "Product Detail";
  product: IProduct | undefined;
  subscription!: Subscription;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ProductService) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription = this.productService.getProduct(id).subscribe({
      next: product => { 
        this.product = product;
        if (product)
          this.pageTitle = `${this.pageTitle}: ${product.productName}`
        else
          this.pageTitle = `${this.pageTitle}: Product Not Found`;
      }
    }) 
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }

}
