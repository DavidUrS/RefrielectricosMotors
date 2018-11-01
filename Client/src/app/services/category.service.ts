import { Category } from './../Category';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Factura } from './../components/category/factura';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class CategoryService {
  factura = new Factura();
  // tslint:disable-next-line:radix
  num_articulos = new BehaviorSubject<number>(parseInt(this.factura.getNumArticulos()));
  cast = this.num_articulos.asObservable();

  domain: String = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  sendCorreo(factura, correo:string){
    return this.http.post(`${this.domain}/products/correo/${correo}`,factura).map(res=>res);
  }

  numArticulos(newArticulo) {
    this.num_articulos.next(newArticulo);
  }

  getNum() {
    return this.num_articulos;
  }

  getCategories() {
    return this.http.get<Category[]>(`${this.domain}/products`).map(res => res);
  }

  addArticulos(precio, nombreArticulo, num_unidades) {
    return this.factura.addNuevoArticulo(precio, nombreArticulo, num_unidades);
  }
  getDetails() {
    return this.factura.getDetails();
  }

}
