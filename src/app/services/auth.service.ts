import { EnvironmentInjector, Inject, inject, Injectable } from '@angular/core';
import { LoginRequest } from '../interfaces/login-request';
import { map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';
import { InvokeFunctionExpr } from '@angular/compiler';
import { RegisterRequest } from '../interfaces/register-request';
import { RegisterResponse } from '../interfaces/register-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  apiUrl = environment.apiUrl;
  tokenKey: string = 'token';
  router = Inject(Router)
  
  register(data1: RegisterRequest): Observable<RegisterResponse>{
    return this.http.post<RegisterResponse>(`${this.apiUrl}Users/Register`, data1)
  }

  login(data: LoginRequest): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${this.apiUrl}Users/Login`, data).pipe(
      map((response)=>{
        if(response.isSuccess){
          //localStorage.clear();
          localStorage.setItem(this.tokenKey, response.token)
        }
        this.router.navigate(['/register'])
        return response
      })
    );
  }

  logout(){
    localStorage.setItem(this.tokenKey, '');
  }

  checkRouting(data: string[]): boolean {


    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(element == 'Admin') {
  
        this.router.navigate(['/users'])
        return true
      } else if(element == 'Student') {
        this.router.navigate(['/student-profile'])
        return true
      }
    }
  
    return false;
  };
}
