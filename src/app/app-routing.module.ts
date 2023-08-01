import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductsComponent } from './components/listproducts/listproducts.component';
import { DetailProductComponent } from './components/detail-product/detail-product.component';
import { CreateProductComponent } from './components/create-product/create-product.component';

const routes: Routes = [
  { path: '', redirectTo: 'list_products', pathMatch: 'full' },
  { path: 'list_products', component:ListProductsComponent },
  { path: 'detail_product/:id', component: DetailProductComponent},
  { path: 'create_product', component:CreateProductComponent },
  { path: 'edit_product/:id', component: CreateProductComponent},
  { path: '**', redirectTo: 'list_products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
