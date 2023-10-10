import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http"
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  constructor(private http: HttpClient) { }

  getData():Observable<any>{
    return this.http.get<any>(environment.url+"feedback")
  }
  postData(data:any):Observable<any>{
    return this.http.post<any>(environment.url+"feedback", data)
  }
}
