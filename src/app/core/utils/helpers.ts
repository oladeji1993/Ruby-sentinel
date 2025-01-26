import {
  ValidationErrors,
  ValidatorFn,
  AbstractControl,
  FormArray,
  FormGroup,
} from '@angular/forms';
import { environment } from 'src/environments/environment.prod';
import * as CryptoJS from 'crypto-js';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

let horizontalPosition: MatSnackBarHorizontalPosition = 'center';
let verticalPosition: MatSnackBarVerticalPosition = 'top';


export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve((<string>reader.result).split(',')[1]);
    };
    reader.onerror = (error) => reject(error);
  });
};

export const regexValidator = (
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | any => {
    if (!control.value) {
      return null;
    }
    const valid = regex.test(control.value);
    return valid ? null : error;
  };
};

export const textareaRegexValidator = (
  regex: RegExp,
  error: ValidationErrors
): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } | null => {
    if (!control.value) {
      return null;
    }
    // Remove newline characters from the input value
    const valueWithoutNewlines = control.value.replace(/[\r\n]+/g, '');
    const valid = regex.test(valueWithoutNewlines);
    return valid ? null : error;
  };
};



export const base64ToBlob = (
  b64Data: any,
  contentType: any = '',
  sliceSize: any = 512
) => {
  const byteCharacters = atob(b64Data);

  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });

  return blob;
};

let durationInSeconds = 10;

export const errorNotifier = (snackBar: MatSnackBar, data: string) => {
  return snackBar.open(data, 'Close', {
    horizontalPosition: horizontalPosition,
    verticalPosition: verticalPosition,
    panelClass: ['err-notification'],
    duration: durationInSeconds * 1000,
  });
};

export const successNotifier = (snackBar: MatSnackBar, data: any) => {
  return snackBar.open(data, 'Close', {
    horizontalPosition: horizontalPosition,
    panelClass: ['success-notification'],
    verticalPosition: verticalPosition,
    duration: durationInSeconds * 1000,
  });
};

// encrption for payload
export const encryptUserData = (data: any) => {
  // let appIVKey: any = localStorage.getItem('aIk');
  // let appKey: any = localStorage.getItem('ak');

  // temporary encyption details
  let appIVKey: any = environment.Api_IV;
  let appKey: any = environment.Api_Key;

  var transformedData = JSON.stringify(data);
  const key = CryptoJS.enc.Utf8.parse(appKey);
  const iv = CryptoJS.enc.Utf8.parse(appIVKey);
  // const key = CryptoJS.enc.Utf8.parse(environment.APP_Key);
  // const iv = CryptoJS.enc.Utf8.parse(environment.APP_IV_KEY);
  const encrypted = CryptoJS.AES.encrypt(transformedData, key, {
    iv: iv,
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};

// decryption for payload
export const decryptUserData = (data: any) => {
  // let appIVKey: any = localStorage.getItem('aIk');
  // let appKey: any = localStorage.getItem('ak');

  // temporary encyption details
  let appIVKey: any = environment.Api_IV;
  let appKey: any = environment.Api_Key;

  const key = CryptoJS.enc.Utf8.parse(appKey);
  const iv = CryptoJS.enc.Utf8.parse(appIVKey);

  // Parse the Base64 encoded data directly
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(data),
  });

  // Decrypt the parsed Base64 string
  const decrypt = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
};

// encryption for login data
export const encryptLoginData = (data: any) => {
  var transformedData = JSON.stringify(data);
  const key = CryptoJS.enc.Utf8.parse(environment.static_app_Key);
  const iv = CryptoJS.enc.Utf8.parse(environment.static_IV_KEY);
  const encrypted = CryptoJS.AES.encrypt(transformedData, key, {
    iv: iv,
  });
  return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
};

// decryption for login data
export const decryptLoginData = (data: any) => {
  const secretKey: any = environment.static_app_Key;
  const ivKey: any = environment.static_IV_KEY;
  const key = CryptoJS.enc.Utf8.parse(secretKey);
  const iv = CryptoJS.enc.Utf8.parse(ivKey);
  // Parse the Base64 encoded data directly
  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: CryptoJS.enc.Base64.parse(data),
  });
  // Decrypt the parsed Base64 string
  const decrypt = CryptoJS.AES.decrypt(cipherParams, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
};

export const patternValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!control.value) {
      return null as any;
    }
    const regex = new RegExp(
      '^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[@$!%*?&])[A-Za-zd@$!%*?&]{12,}$'
    );
    const valid = regex.test(control.value);
    return valid ? (null as any) : { pattern: true };
  };
};

export const MatchPassword = (
  password: string,
  confirmPassword: string
): any => {
  return (formGroup: FormGroup) => {
    const passwordControl = formGroup.controls[password];
    const confirmPasswordControl = formGroup.controls[confirmPassword];

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (
      confirmPasswordControl.errors &&
      !confirmPasswordControl.errors['passwordMismatch']
    ) {
      return null;
    }

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
    }

    return null;
  };
};

function handleError(err: any, any: any) {
  throw new Error('Function not implemented.');
}
