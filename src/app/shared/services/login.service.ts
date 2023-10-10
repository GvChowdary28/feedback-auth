import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// import { User } from 'src/app/_models/user';
import { User } from 'src/app/_model/user'

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  users:any = [
    {
      id:1,
      username: "admin",
      password: "admin123",
      role: "admin"
    },
    {
      id:2,
      username: "user",
      password: "user123",
      role: "user"
    }
  ]
  private userSubject : BehaviorSubject<User | null>
  public user: Observable<User | null>;
  constructor(private http: HttpClient) { 
    
  }
  public get userValue() {
    return this.userSubject.value;
  }
  getData():Observable<any>{
    return this.http.get<any>(environment.url+"login")
  }
  private currentUserSubject: Subject<User> = new Subject<User>();

  getCurrentUserSub() {
    return this.currentUserSubject.asObservable();
  }
  login(username:any,password:any): Observable<any>{
    let data = new Observable<any>(observer => {
      const user = this.users.find((x:any) => x.username === username && x.password === password);
      this.currentUserSubject.next(user);
      observer.next(user)
    })
    return data
  }

}
