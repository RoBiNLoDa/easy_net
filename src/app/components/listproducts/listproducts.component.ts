import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listproducts',
  templateUrl: './listproducts.component.html',
  styleUrls: ['./listproducts.component.css']
})
export class ListProductsComponent implements OnInit{

  listProducts: IProduct[] = []

  constructor(private produtService: ProductService,
    private toastr: ToastrService,
    private router: Router){

  }


  ngOnInit(): void {
    this.getProducts();
  }

  getProducts(){
    this.produtService.getProducts().subscribe({
      next: (data) => this.listProducts = data,
      error: (err: HttpErrorResponse) => {
        this.toastr.error('Error al obtener los Productos', 'Error!!!');
      }
    });
  }

  detailProduct(id: number){
    this.router.navigate([`detail_product/${id}`])
  }

  goCreateProduct(){
    this.router.navigate([`create_product`])
  }

  editProduct(id: number){
    this.router.navigate([`edit_product/${id}`])
  }

}
