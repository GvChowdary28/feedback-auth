import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any ;
  isLoggedIn: boolean = false
  isAuthenticated$ = new BehaviorSubject<boolean>(false);
  constructor() { 
    
  }

  
  getLoggedInData(userData:any){
    this.userData = userData
    this.isAuthenticated$.next(this.userData);
    this.isAuthenticated()
  }
  login() {
    this.isAuthenticated$.next(true);
  }

  logout() {
      this.isAuthenticated$.next(false);
  }
  isAuthenticated(){
    if(this.userData){
      this.isLoggedIn = true
    }
  }
}
