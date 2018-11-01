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
    this.callService.addCall(newCall).subscribe(res=>{
      console.log(res)
    })
    console.log(newCall);
    this.callModel.phone = '';
    this.callModel.name = '';
  }
}


