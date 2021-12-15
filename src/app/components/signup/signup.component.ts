import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { user } from 'src/app/interfaces/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { LoaderService } from 'src/app/services/loader.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  errorMessage : string = ''

  constructor(
    private as : AuthService
     , private us : UserService 
    , private router : Router ,
    public ls : LoaderService ,
    ){}
  ngOnInit(){

  }


  signup(form : NgForm) {
    this.ls.isLoading.next(true)
    let data : user = form.value
    this.as.sginup(data.email , data.password)
    .then(result=>{

      // console.log(result) 
      // console.log(result.user?.uid) 

      this.errorMessage = ''
      
      this.us.addNewUser(result.user?.uid , data.name , data.Address)
      .then(()=>{
        this.ls.isLoading.next(false)
        this.router.navigate(['/create-channel'])
      })
    })
    .catch(err=>  this.errorMessage = err.message)
    // Fix This OutPut of message
    
  }
}
