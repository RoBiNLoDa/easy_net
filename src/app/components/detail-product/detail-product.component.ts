import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.css']
})
export class DetailProductComponent implements OnInit{

  product!: IProduct;

  constructor(private aRoute: ActivatedRoute,
    private productService: ProductService,
    private toastr: ToastrService,
    private router: Router){}

  ngOnInit(): void {
    this.aRoute.params.subscribe((val: any) =>{
      this.getProduct(val.id);
    });
  }

  getProduct(id: string){
    this.productService.getProduct(id).subscribe({
      next: (data) => this.product = data,
      error: (err: HttpErrorResponse) => {
        this.toastr.error('Error al obtener el Producto', 'Error!!!');
      }
    });
  }

  deleteProduct(id: number){
    this.productService.deleteProduct(id).subscribe({
      next: () =>{
        this.toastr.success('El producto fue eliminado con exito', 'Producto Eliminado');
        this.router.navigate(['/']);
      },
      error: (err: HttpErrorResponse) => this.toastr.error('No se pudo eliminar el producto', 'Producto No Eliminado')
    });
  }

  goBack(){
    this.router.navigate(['/']);
  }

}
