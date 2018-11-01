import { Component, OnInit} from '@angular/core';
import { CategoryService } from './../../services/category.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  num_articulos:number;

  constructor(private category_Service:CategoryService) { }

  ngOnInit() {
    this.category_Service.cast.subscribe(articulos => this.num_articulos = articulos);
  }

}
