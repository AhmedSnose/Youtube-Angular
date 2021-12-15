import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  errorMessage = ''
  constructor(private af : AuthService , private router : Router) { }

  ngOnInit(): void {
  }

  login(form : NgForm) {
    let data = form.value
    this.af.login(data.email , data.password)
    .then(data=>{
      console.log(data)
      this.router.navigate(['/'])
      .then(() => {
        window.location.reload();
      });
    })
    .catch(err => console.log(err))
    
  }

}
