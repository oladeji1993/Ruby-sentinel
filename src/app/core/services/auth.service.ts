import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { encryptLoginData } from '../utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  createUser(payload: any) {
    return this.http.post(`${environment.baseUrl}/register`, payload);
  }

  updateTokenInStorage(newJwtToken: string): void {
    localStorage.setItem('gapToken', newJwtToken);
  }

  public refreshTokenCall(): Observable<any> {
    const savedToken: any = localStorage.getItem('refreshGapToken');
    let data = {
      token: savedToken,
    };
    
    let payload =  encryptLoginData(data)
    return this.http
      .post(`${environment.baseUrl}/refreshAccessToken`, { request: payload})
      .pipe(map((res) => res));
  }

  IsLoggedIn() {
    let bool: boolean;
    let token = localStorage.getItem('gapToken');
    let isTokenVerified = localStorage.getItem('isTokenVerified');
    if (token && isTokenVerified) {
      bool = true;
    } else {
      bool = false;
    }
    return bool;
  }

  // IsUserLoggedIn(): boolean {
  //   return !!localStorage.getItem('accessToken');
  // }

  login(payload: any) {
    return this.http.post(`${environment.baseUrl}/login`, payload);
  }

  verifyToken(payload: any) {
    return this.http.post(
      `${environment.verifyTokenBaseUrl}/VerifyToken`,
      payload
    );
  }

  getUserById(id: any) {
    return this.http.get(
      `${environment.baseUrl}/GetUserBy/${id}`
    );
  }

  forgotPassword(email: any) {
    return this.http.post(`${environment.baseUrl}/forgotPassword`, email);
  }

  updatePassword(payload: any) {
    return this.http.post(`${environment.baseUrl}/resetPassword`, payload);
  }

  setPassword(payload: any) {
    return this.http.post(`${environment.baseUrl}/changePassword`, payload);
  }
}
