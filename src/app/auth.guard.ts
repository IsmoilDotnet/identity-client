import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

var userRouter = true;
var adminRouter = false;
var tokenKey = 'token';


export const loginGuard: CanActivateFn = (route, state) => {
  return true;
};

export const registerGuard: CanActivateFn = (route, state) => {
  return true;
};

export const usersGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)



 if(localStorage.getItem(tokenKey) != null) {
  const tokenDecoded: any = jwtDecode(localStorage.getItem(tokenKey)!)

  const data = tokenDecoded.role;

  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    if(element == 'Admin') {
      router.navigate(['/login'])
      return true
    } else if(element == 'Student') {
      router.navigate(['/student-profile'])
      return true
    }
  }
 }

  router.navigate(['/login'])
  return false;
};

export const studentProfileGuard: CanActivateFn = (route, state) => {
  return false;
};