import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { environment } from 'src/environments/environment.prod';
// import { BlackListService } from 'src/app/core/services/black-list.service';
// import { ToastrService } from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
})
export class OtpComponent {
  otpCode!: number;
  notValid: any = false;
  loader: boolean = false;
  encryptedData: any;
  decryptedResponse: any;

  ngOnInit(): void {}

  constructor(
    private router: Router,
    private auth: AuthService,
    private dialogRef: MatDialogRef<OtpComponent>
  ) // private toastr: ToastrService
  {}

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    // inputStyles: {
    //   width: '2rem',
    //   height: '2rem',
    //   color: '#000000',
    // },
    containerClass: 'otp-container',
  };

  onOtpChange(item: any) {
    this.otpCode = item;
    if (item.length != 6) {
      this.notValid = true;
    } else {
      this.notValid = false;
    }
  }

  encryptData(payload: any) {
    var key = CryptoJS.enc.Utf8.parse(environment.static_app_Key);
    var iv = CryptoJS.enc.Utf8.parse(environment.static_IV_KEY);
    const encrypted = CryptoJS.AES.encrypt(payload, key, {
      iv: iv,
    });
    this.encryptedData = CryptoJS.enc.Hex.stringify(encrypted.ciphertext);
  }

  decryptData(encryptedata: any) {
    const secretKey: any = environment.static_app_Key;
    const ivKey: any = environment.static_IV_KEY;
    var key = CryptoJS.enc.Utf8.parse(secretKey);
    var iv = CryptoJS.enc.Utf8.parse(ivKey);
    var cipher = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Hex.parse(encryptedata)
    );
    var decrypt = CryptoJS.AES.decrypt(cipher, key, {
      iv: iv,
      keySize: 128,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    });

    this.decryptedResponse = decrypt.toString(CryptoJS.enc.Utf8);
  }

  validateOTP() {
    if (!this.otpCode) {
      this.notValid = true;
    } else {
      // this.router.navigate(['/dashboard/microservices']);
      let username = localStorage.getItem('loggedInUserEmail');
      let data = {
        userName: username,
        token: this.otpCode,
      };

      var transformedData = JSON.stringify(data);
      this.encryptData(transformedData);
      this.loader = true;
      this.auth.verifyToken({ data: this.encryptedData }).subscribe(
        (response: any) => {
          this.decryptData(response?.data);
          let apiResponse = JSON.parse(this.decryptedResponse);
          if (apiResponse.isSuccessful == true) {
            localStorage.setItem('isTokenVerified', 'true');
            this.loader = false;
            let role = localStorage.getItem('userRight');
            this.close();
            this.router.navigate(['/dashboard']);
          } else {
            this.loader = false;
            // this.toastr.error('error', 'An error Occurred');
          }
        },
        (err) => {
          this.loader = false;
          if (err?.error?.data) {
            let returnedError = err?.error?.data;
            this.decryptData(returnedError);
            let errorResponse = JSON.parse(this.decryptedResponse);            
            // this.toastr.error(errorResponse?.message, 'Error');
          }
        }
      );
    }
  }

  close() {
    document
      .getElementsByClassName('animate__animated')[0]
      .classList.add('animate__zoomOut');
    setTimeout(() => {
      this.dialogRef.close({ data: true });
    }, 700);
  }
}
