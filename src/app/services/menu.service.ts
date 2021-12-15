import { Injectable } from '@angular/core';
import { HomeComponent } from '../components/home/home.component';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  showFiller? = false
  btn? :  HTMLElement
  constructor() { }
  // btnMenu(value : HTMLElement){
  //     this.btn = value
  // }

  // ToggleShowFiller(){
  //   //  this.hc.btnMenu.click()
  //   console.log(this.btn);
    
  // }
}
