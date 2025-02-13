import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, EMPTY } from 'rxjs';
import { catchError, switchMap, filter, take, finalize } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment.prod';
import { transformMenu } from '@angular/material/menu';
import { decryptLoginData } from '../utils/helpers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );
  private omitRoutes: string[] = ['signout'];

  constructor(
    private authService: AuthService,
    // private toastr: ToastrService
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (this.shouldSkipInterceptor(request)) {
      return next.handle(request);
    }
    const XApiKey = environment.XApiKey;
    const token = localStorage.getItem('gapToken');
    if (token) {
      request = this.addToken(request, token);
    }

    if (request.url.includes('/VerifyToken')) {
      request = request.clone({
        setHeaders: {
          XApiKey: `${XApiKey}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error) => {                
        if (error instanceof HttpErrorResponse && error.status === 401 || error.status === 0) {
          // this.toastr.info(
          //   '',
          //   'Token expired, Please wait while we fetch a new token'
          // );
          return this.handle401Error(request, next);
        } else {
          // this.authService.handleError(
          //   'An error occurred while processing your request.'
          // );
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    const target = localStorage.getItem('target');
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        targetBearer: `${target}`,
      },
    });
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // this.generalService.appLoader(true);
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.authService.refreshTokenCall().pipe(
        switchMap((response) => {
          const apiResponse: any = decryptLoginData(response?.response);   
          
          const newToken: any = apiResponse?.value?.accessToken;
          localStorage.setItem('refreshGapToken', apiResponse?.value?.refreshToken)

          // const newRefreshToken = response?.data?.refreshToken;
          this.isRefreshing = false;
          this.refreshTokenSubject.next(newToken);

          if (!newToken) {
            return throwError(
              'New token or refresh token not found in the response.'
            );
          }
          // this.generalService.appLoader(false);
          this.authService.updateTokenInStorage(newToken); // Update tokens in local storage
          return next.handle(this.addToken(request, newToken));
        }),
        catchError((error) => {
          this.isRefreshing = false;
          return throwError(error);

          // if (error instanceof HttpErrorResponse && error.status === 401) {
          //   this.isRefreshing = true;
          //   return this.handle401Error(request, next);
          // } else {
          //   return throwError(error);
          //   this.isRefreshing = false;
          //   this.authService.handleError(error);
          // }
          // this.toastr.error('Request to server failed');

          // this.utilityService.handleErrorDialog("Unauthorized", "User unauthorized, kindly log in to your account.");
          // this.authService.logoutUser();
          return EMPTY;
        }),
        finalize(() => {
          this.isRefreshing = false;
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter((token) => token != null),
        take(1),
        switchMap((token) => {
          return next.handle(this.addToken(request, token));
        })
      );
    }
  }

  private shouldSkipInterceptor(request: HttpRequest<any>): boolean {
    return this.omitRoutes.some((route) => request.url.includes(route));
  }
}
