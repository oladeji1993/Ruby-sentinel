import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { decryptUserData } from '../utils/helpers';

@Injectable({
  providedIn: 'root',
})
export class RubyService {
  constructor(private http: HttpClient) {}

  postApiCallTemplate(apiPath: any, endpoint: any, payload: any) {
    return this.http.post(
      `${environment.apiBaseUrl}/${apiPath}/${endpoint}`,
      payload
    );
  }

  getApiCallTemplate(apiPath: any, endpoint: any) {
    return this.http.get(`${environment.apiBaseUrl}/${apiPath}/${endpoint}`);
  }





}
