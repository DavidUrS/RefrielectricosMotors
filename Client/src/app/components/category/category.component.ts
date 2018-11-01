import { CategoryService } from './../../services/category.service';
import { Category } from './../../Category';
import { Component, OnInit, Input, Output } from '@angular/core';
import { Factura } from './factura';
import 'rxjs/add/operator/map';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  category: Category[];
  factura = new Factura();
  categ: string;
  url: string;
  categ_filter: string;
  num_articulos: number;
  edit_num_articulos: number;
  categoryName: string;
  p: any;
  unidades = [];
  num_unidades:number=0;
  constructor(private categoryService: CategoryService) {
    categoryService.getCategories().subscribe(categories => {
      this.category = categories;
    });
  }

  addCot(precio: number, nombreArticulo: string, ind:number) {
    for (let index = 0; index < this.unidades.length; index++) {
      this.num_unidades = this.unidades[this.unidades.length-1];
      
    }
    if (this.num_unidades < 1 ) {
      document.getElementsByTagName("input")[ind+1].style.border="2px solid red";
      document.getElementsByTagName("input")[ind+1].placeholder = "Campo requerido"
      setTimeout(function(){
        document.getElementsByTagName("input")[ind+1].style.border="1px solid gray";
        document.getElementsByTagName("input")[ind+1].placeholder = "# Unidades"
      }, 800);
    }else if (this.num_unidades >= 1) {
      this.categoryService.addArticulos(precio, nombreArticulo, this.num_unidades);
      this.categoryService.numArticulos(this.edit_num_articulos + 1);
      document.getElementsByTagName("input")[ind+1].style.border="2px solid green";
      document.getElementsByTagName("input")[ind+1].placeholder = "Añadido a cotización"
      setTimeout(function(){
        document.getElementsByTagName("input")[ind+1].style.border="1px solid gray";
        document.getElementsByTagName("input")[ind+1].placeholder = "# Unidades"
      }, 1500);
      this.num_unidades = 0;
      this.unidades = [];
    }
    
  }

  categoryFilter(catego) {
    this.categ_filter = catego;
  }

  deleteFilter() {
    this.categ_filter = '';
  }

  ngOnInit() {
    this.categoryService.cast.subscribe(articulos => this.edit_num_articulos = articulos);
    
  }

  ShowMore(cate, cover) {
    this.categ = cate;
    this.url = cover;
  }
  

}
