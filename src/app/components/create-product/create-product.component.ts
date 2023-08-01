import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent {

  productForm: FormGroup;
  title = "CREAR PRODUCTO";
  labelButton = "AGREGAR PRODUCTO"
  id: string | null | undefined;

  constructor(private fb: FormBuilder, private router: Router, private toastr: ToastrService, private productService: ProductService, private aRouter: ActivatedRoute) {

    this.productForm = this.fb.group({
      imageURL: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      valor: ['', Validators.required]
    });

    this.aRouter.params.subscribe(
      (params: Params) => {
        this.id = params['id'];
      }
    );

  }
  ngOnInit(): void {
    this.esEditar();
  }

  createProduct() {
    //console.log(this.productoForm);
    const PRODUCTO: IProduct = {
      imageURL: this.productForm.get('imageURL')?.value,
      name: this.productForm.get('name')?.value,
      description: this.productForm.get('description')?.value,
      valor: this.productForm.get('valor')?.value,
    }

    if (this.id !==null && this.id !== undefined) {
      
      this.productService.editProduct(this.id!, PRODUCTO).subscribe({
        next: () => {
          this.toastr.info('El producto fue actualizado con exito', 'Producto actualizado!');
          this.productForm.reset();
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => this.toastr.error('No se pudo actualizar el producto', 'Producto No Actualizado')
      });
      
    } else {
      this.productService.createProduct(PRODUCTO).subscribe({
        next: () => {
          this.toastr.success('El producto fue registrado con exito', 'Producto registrado!');
          this.productForm.reset();
          this.router.navigate(['/']);
        },
        error: (err: HttpErrorResponse) => this.toastr.error('No se pudo crear el producto', 'Producto No Creado')
      });
    }

    
  }

  esEditar() {
    if (this.id != null || this.id != undefined) {
      this.title = "EDITAR PRODUCTO";
      this.labelButton = "ACTUALIZAR PRODUCTO"
      this.productService.getProduct(this.id).subscribe({
        next: (data) => {
          this.productForm.setValue({
            imageURL: data.imageURL,
            name: data.name,
            description: data.description,
            valor: data.valor
          });
        }
      });
    }
  }

  goBack(){
    this.router.navigate(['/']);
  }

}
