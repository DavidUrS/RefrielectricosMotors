import { Component } from '@angular/core';
import { Call } from './Call';
import { CallService } from './services/call.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private callService:CallService){}
  callModel = new Call();
  title = 'app';
  makeCall(){
    const newCall: Call = {
      phone : this.callModel.phone,
      name: this.callModel.name
    }
    this.callService.addCall(newCall).subscribe((res:any)=>{
      document.getElementById("respuesta").textContent = res+" "+newCall.name+", al número "+newCall.phone;
      setTimeout(function(){
        document.getElementById("respuesta").textContent = '';
      }, 5000);
    })
    this.callModel.phone = '';
    this.callModel.name = '';
  }

  
}


