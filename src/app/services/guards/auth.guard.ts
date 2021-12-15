import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private as : AuthService ,private router : Router) { }

  canActivate(route : ActivatedRoute | any , state :RouterStateSnapshot | any) : 
  boolean | Observable<boolean> | Promise<boolean> | any{
    return new Promise((res , rej)=>{
      this.as.user?.subscribe(user=>{
        if(user) res(true);
        else this.router.navigate(['/login']) 
        res(false)
      })
    })
  }
  
}
