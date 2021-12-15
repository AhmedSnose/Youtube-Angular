import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { MenuService } from 'src/app/services/menu.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  userpic? = 'https://images.unsplash.com/photo-1638984849678-7aee537bd021?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
  // https://stackblitz.com/edit/angular-avatar-display?file=src%2Fapp%2Fapp.component.html

  constructor(
    private route : Router ,
    private us : UserService ,
    private as : AuthService ,
    public ls : LoaderService
     ) { 
       
    }

    isOpen : Boolean = false
    isUser : Boolean = false

    datauser? : [{
      channelAt:string,
      channelDes: string,
      channelName: string
      channelPic: string,
      id: string,
    }] | any

    channelPic? : string 
    // = 'https://media.istockphoto.com/vectors/missing-image-of-a-person-placeholder-vector-id1288129985?k=20&m=1288129985&s=612x612&w=0&h=OHfZHfKj0oqIDMl5f_oRqH13MHiB63nUmySYILbWbjE='

    ngOnInit(): void {
      this.as.user?.subscribe(user=>{
        // console.log(user.uid);
        
       this.us.getUSerData(user?.uid).subscribe(data=>{
        this.datauser = data.map((info : any) => {  
          this.channelPic = info.payload.doc.data().channelPic

          return {
            id:info.payload.doc.id,
            userID:user.uid,
            ...info.payload.doc.data()
          }
        })
        // this.channelPic = this.datauser[0].channelPic
        
        // isWrog = do update method insted this shit
        this.us.datauserFS = {...this.datauser[0],...this.datauser[1]}
        
        
       })
       
        // console.log(user , "Form Nav")

        if(user){
          this.isUser = true
          this.as.userUID = user?.uid          
        }else {
          this.isUser = false
          this.as.userUID = ''
  
        }
    })
      

    } 
  Search({value} : any){
    // console.log(this.SIV);
    console.log(value);
    this.route.navigate(['search'] , { queryParams: { searchFor: value }} )
    console.log(this.datauser);
    

  }
  ToggleShowFiller(){
    let btn = document.getElementById('btnMenu')
    btn?.click()
    
  }

  
  // [routerLink]="['search']"
  // [queryParams]="{ order: SearchInputValue.value}"
}
