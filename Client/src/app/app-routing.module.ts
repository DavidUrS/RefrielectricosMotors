import { CategoryComponent } from './components/category/category.component';
import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutComponent } from './components/about/about.component';
import { ServicesComponent } from './components/services/services.component';
import { FacturaComponent } from './components/factura/factura.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: 'category', component: CategoryComponent },
  {path: 'about', component: AboutComponent },
  {path: 'services', component: ServicesComponent },
  {path: 'factura', component: FacturaComponent },
  {path: '', redirectTo: '/category', pathMatch: 'full'}
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
})

export class AppRoutingModule { }
