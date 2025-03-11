import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =  'http://10.0.2.2:4000/api/auth' ; // URL to MOVIL api
  // private apiUrl = 'http://localhost:4000/api/auth'; // URL to WEB api

  constructor(private http: HttpClient) {}

  register(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/register`, { username, password })
        .subscribe({
          next: () => resolve(),
          error: (err) => reject(err.error?.msg || 'Error al registrar')
        });
    });
  }

// auth.service.ts
login(username: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.post(`${this.apiUrl}/login`, { username, password })
        .subscribe({
          next: (res: any) => {
            if (res && res.token) {
              localStorage.setItem('token', res.token);
              resolve();
            } else {
              reject("Token no recibido");
            }
          },
          error: (err) => {
            reject(err.error?.msg || 'Error al iniciar sesión');
          }
        });
    });
  }
  

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
