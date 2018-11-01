import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Factura } from '../category/factura';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  factura = new Factura();
  lista: any;
  total: number;
  correo: string;
  constructor(private categoryService: CategoryService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location) { }
  ngOnInit() {
    this.lista = this.factura.getDetails();
    this.total = this.factura.getCoot();
  }

  deleteCot() {
    this.factura.deleteCot();
  }

  eliminar(){
    window.location.reload();
    this.factura.deleteCot();
  }
  enviarCorreo(){
      if(this.correo == null || this.correo== ''){
        document.getElementById("correo").style.border="1px solid red";    
        document.getElementsByTagName("input")[0].placeholder = "Correo requerido";
        setTimeout(function(){
          document.getElementById("correo").style.border="1px solid gray";
          document.getElementsByTagName("input")[0].placeholder = "Ingresa correo de destino";
        }, 2000);
      }else{
        this.categoryService.sendCorreo(this.lista, this.correo).subscribe((res:any)=>{
          if(res=='correcto'){
            document.getElementById("correo").style.border="2px solid green";    
            document.getElementsByTagName("input")[0].placeholder = "Cotización enviada correctamente";
            setTimeout(function(){
              document.getElementById("correo").style.border="1px solid gray";
              document.getElementsByTagName("input")[0].placeholder = "Ingresa correo de destino";
            }, 5000);
          }
        })
      }
      
      
      this.correo = '';
  }

}
