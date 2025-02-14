import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { decryptUserData, errorNotifier } from '../utils/helpers';
import { Observable } from 'rxjs';
import { SuccessModalComponent } from '../shared/success-modal/success-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class RubyService {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  statusValue: boolean = false;

  setLoaderStatus(status: boolean) {
    this.statusValue = status;
  }

  getLoaderStatus(): boolean {
    return this.statusValue;
  }

  postApiCallTemplate(apiPath: any, endpoint: any, payload: any) {
    return this.http.post(
      `${environment.apiBaseUrl}/${apiPath}/${endpoint}`,
      payload
    );
  }

  updateApiCallTemplate(apiPath: any, endpoint: any, payload: any) {
    return this.http.put(
      `${environment.apiBaseUrl}/${apiPath}/${endpoint}`,
      payload
    );
  }

  getApiCallTemplate(apiPath: any, endpoint: any) {
    return this.http.get(`${environment.apiBaseUrl}/${apiPath}/${endpoint}`);
  }

  deleteApiCallTemplate(apiPath: any, endpoint: any, id: any) {
    return this.http.delete(`${environment.apiBaseUrl}/${apiPath}/${endpoint}?Id=${id}`);
  }

  ApiResponseHandler(
    observable: Observable<any>,
    actionName: any, apiAction: any
  ): Observable<any> {
    return new Observable((observer) => {
      observable.subscribe({
        next: (res: any) => {
          const apiResponse: any = decryptUserData(res?.response);
          console.log(apiResponse);
          if (apiResponse.isSuccess) {
            this.dialog.open(SuccessModalComponent, {
              panelClass: [
                'animate__animated',
                'animate__zoomIn',
                'custom-modalbox',
              ],
              data: {
                actionType: actionName,
                actionMessage: apiResponse.value,
                apiAction: apiAction,
              },
              width: '440px',
              height: 'auto',
              disableClose: true,
            });

            observer.next(apiResponse); // Emit the response
            observer.complete();
          } else {
            // this.setLoaderStatus(false);
            errorNotifier(this.snackBar, apiResponse.responseDescription);
            observer.error(apiResponse); // Emit error response
          }
        },
        error: (error: any) => {
          // this.setLoaderStatus(false);
          errorNotifier(this.snackBar, 'Unable to process');
          observer.error(error); // Emit error
        },
        complete: () => {
          // this.setLoaderStatus(false);
          console.log('Response returned');
          observer.complete();
        },
      });
    });
  }


  getApiResponseHandler(
    observable: Observable<any>,
    item: any
  ): Observable<any> {
    return new Observable((observer) => {
      observable.subscribe({
        next: (res: any) => {
          const apiResponse: any = decryptUserData(res?.response);
          if (apiResponse.isSuccess === true) {            
            observer.next(apiResponse);
            observer.complete();
          } else {
            errorNotifier(this.snackBar, apiResponse.responseDescription);
            observer.error(apiResponse); // Emit error response
          }
        },
        error: (error: any) => {
          errorNotifier(this.snackBar, 'Unable to process');
          observer.error(error); // Emit error
        },
        complete: () => {
          console.log('Response returned');
          observer.complete();
        },
      });
    });
  }


  // updateApiResponseHandler(
  //   observable: Observable<any>,
  //   item: any
  // ): Observable<any> {
  //   return new Observable((observer) => {
  //     observable.subscribe({
  //       next: (res: any) => {
  //         const apiResponse: any = decryptUserData(res?.response);
  //         if (apiResponse.isSuccess) {
  //           // this.setLoaderStatus(false);
  //           this.dialog.open(SuccessModalComponent, {
  //             panelClass: [
  //               'animate__animated',
  //               'animate__zoomIn',
  //               'custom-modalbox',
  //             ],
  //             data: {
  //               actionType: item == 'Create' ? 'Create' : 'Edit',
  //               data: item != 'Create' ? item : '',
  //             },
  //             width: '440px',
  //             height: 'auto',
  //             disableClose: true,
  //           });

  //           observer.next(apiResponse); // Emit the response
  //           observer.complete();
  //         } else {
  //           // this.setLoaderStatus(false);
  //           errorNotifier(this.snackBar, apiResponse.responseDescription);
  //           observer.error(apiResponse); // Emit error response
  //         }
  //       },
  //       error: (error: any) => {
  //         // this.setLoaderStatus(false);
  //         errorNotifier(this.snackBar, 'Unable to process');
  //         observer.error(error); // Emit error
  //       },
  //       complete: () => {
  //         // this.setLoaderStatus(false);
  //         console.log('Response returned');
  //         observer.complete();
  //       },
  //     });
  //   });
  // }
}
