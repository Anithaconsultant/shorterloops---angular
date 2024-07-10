// auth.service.ts

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn(): boolean {
    // Logic to check if the user is logged in
    // For example, check if there is a token in local storage
    return !!localStorage.getItem('token');
  }
}
