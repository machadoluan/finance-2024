// authentication.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // private apiUrl = 'http://localhost:3001';
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  login(email: string, senha: string): Observable<any> {
    const body = { email, senha };
    return this.http.post(`${this.apiUrl}/autenticacao`, body).pipe(
      tap(response => {
        if (response && response.token) {
          // Exiba a data/hora de expiração do token
          const expirationDate = new Date();
          expirationDate.setSeconds(expirationDate.getSeconds() + 100000); // Adapte para a expiração real do token (2 minutos)
          console.log('Token expira em:', expirationDate);
          localStorage.setItem('token', response.token);
          // Armazene a data/hora de expiração
          localStorage.setItem('tokenExpiration', expirationDate.toString());
          return true;
        } else {
          return false;
        }
      })
    );
  }

  cadastro(nome: string, email: string, senha: string): Observable<any> {
    const body = {nome, email, senha};

    return this.http.post(`${this.apiUrl}/registro`, body)
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUserFromToken(): any | null {
    const token = this.getToken();
    if (token) {
      const tokenPayload = token.split('.')[1];
      const decodedPayload = JSON.parse(atob(tokenPayload));
      return decodedPayload;
    }
    return null;
  }

}
