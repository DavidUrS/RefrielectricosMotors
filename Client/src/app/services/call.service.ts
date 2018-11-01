import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Call } from '../Call'

@Injectable({
  providedIn: 'root'
})
export class CallService {
  domain: String = 'http://localhost:3000';
  constructor(private http: HttpClient) { }

  addCall(call: Call){
    return this.http.post(`${this.domain}/call`, call);
  }
}
