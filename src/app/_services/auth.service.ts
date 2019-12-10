import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl;
  currentUser: User;
  searchCriteria: string;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUser = user;
        } else {
          throw new Error('Login unsuccessful!');
        }
      })
    );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    return localStorage.getItem('user') ? true : false;
  }
}
