import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
// import firebase from 'firebase/compat/app';
import { User } from '@firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user? : Observable<User | any>
  userUID? : string
  constructor(private afAuth : AngularFireAuth) { 
    this.user = afAuth.user

  }

  sginup(email:any , password:any){
   return this.afAuth.createUserWithEmailAndPassword(email , password)
  }

  login(email : string , password : string){
    return this.afAuth.signInWithEmailAndPassword(email , password)
  }

  logOut(){
    return this.afAuth.signOut()
  }


}

// signInWithPopup
// https://github.com/angular/angularfire/blob/master/docs/auth/getting-started.md
// return this.afAuth.signInWithPopup(new firebase.auth.FacebookAuthProvider)
