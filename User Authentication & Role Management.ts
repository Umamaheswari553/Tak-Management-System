
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';  // Replace with your backend URL

  constructor(private http: HttpClient, private router: Router) {}

  logIn(credentials: any) {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    const token = localStorage.getItem('token');
    return !!token && !this.isTokenExpired(token);
  }

  getRole(): string {
    const token = localStorage.getItem('token');
    if (!token) return '';
    const decodedToken = new JwtHelperService().decodeToken(token);
    return decodedToken.role;
  }

  getToken() {
    return localStorage.getItem('token');
  }

  private isTokenExpired(token: string) {
    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(token);
  }
}
