import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import {
  decryptLoginData,
  encryptLoginData,
  errorNotifier,
  regexValidator,
} from 'src/app/core/utils/helpers';
import jwt_decode from 'jwt-decode';
import { OtpComponent } from './otp/otp.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide: boolean = false;
  loginForm!: FormGroup;
  loader: boolean = false;
  submitted: boolean = false;
  encryptedData: any;
  decryptedResponse: any;

  constructor(
    public fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  public togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  initializeForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],

      password: [
        '',
        [
          Validators.required,
          regexValidator(new RegExp('^(?=.*?[A-Z])'), {
            uppercaseLetter: true,
          }),
          regexValidator(new RegExp('(?=.*?[a-z])'), { lowercaseLetter: true }),
          regexValidator(new RegExp('(?=.*?[0-9])'), { number: true }),
          regexValidator(new RegExp('(?=.*?[#?!@$%^&*-])'), {
            specialCharacter: true,
          }),
          regexValidator(new RegExp('.{12,}$'), { minimum: true }),
        ],
      ],
    });
  }

  get loginFormControl() {
    return this.loginForm.controls;
  }

  getErrorMessage(instance: string) {
    this.loginForm.get('email')?.updateValueAndValidity();
    if (
      instance === 'email' &&
      this.loginFormControl['email'].hasError('required')
    ) {
      return 'Please enter your email';
    } else if (
      instance === 'email' &&
      this.loginFormControl['email'].hasError('email')
    ) {
      return 'Sorry, this is not a valid email';
    } else if (
      instance === 'password' &&
      this.loginFormControl['password'].hasError('required')
    ) {
      return 'Please enter your password';
    } else if (
      instance === 'password' &&
      this.loginFormControl['password'].hasError('uppercaseLetter')
    ) {
      return 'Your password must have at least 1 uppercase letter';
    } else if (
      instance === 'password' &&
      this.loginFormControl['password'].hasError('lowercaseLetter')
    ) {
      return 'Your password must have at least 1 lowercase letter.';
    } else if (
      instance === 'password' &&
      this.loginFormControl['password'].hasError('number')
    ) {
      return 'Your password must have at least a digit (0-9)';
    } else if (
      instance === 'password' &&
      this.loginFormControl['password'].hasError('specialCharacter')
    ) {
      return 'Your password must have at least a special character (!@#$%^&*)';
    } else if (
      instance === 'password' &&
      this.loginFormControl['password'].hasError('minimum')
    ) {
      return 'Your password must have at least a minimum of 12 characters.';
    } else {
      return;
    }
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  loginUser() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loader = true;
    const { email, password } = this.loginForm.value;
    let data = {
      email: email,
      password: password,
    };
    const encryptedPayload = encryptLoginData(data);
    this.auth.login({ request: encryptedPayload }).subscribe(
      (response: any) => {
        const apiResponse: any = decryptLoginData(response?.response);
        const tokenInfo = this.getDecodedAccessToken(
          apiResponse?.value?.accessToken
        );
        if (apiResponse.isSuccess === true) {
          const userId =
            tokenInfo[
              'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
            ];
          this.loader = false;
          localStorage.setItem('loggedInUserEmail', email);
          localStorage.setItem('userRight', tokenInfo?.Permission);
          localStorage.setItem('userId', userId);
          localStorage.setItem(
            'refreshGapToken',
            apiResponse?.value?.refreshToken
          );
          localStorage.setItem('gapToken', apiResponse?.value?.accessToken);
          const sessionId = Math.random().toString(36).substring(2);
          sessionStorage.setItem('sessionId', sessionId);
          this.dialog.open(OtpComponent, {
            restoreFocus: false,
            panelClass: [
              'animate__animated',
              'animate__zoomIn',
              'custom-modalbox',
            ],
            width: '450px',
            height: '390px',
            disableClose: true,
          });
          this.getLoggedInUserDetails(userId);
        } else if (apiResponse.isSuccess === false) {
          this.loader = false;
          errorNotifier(this.snackBar, apiResponse?.message);
        }
      },
      (err: any) => {
        this.loader = false;
        errorNotifier(this.snackBar, err.message);
      }
    );
  }

  getLoggedInUserDetails(id: any) {
    this.auth.getUserById(id).subscribe(
      (response: any) => {
        const apiResponse: any = decryptLoginData(response?.response);
        const userCredentials = apiResponse?.value;
        if (apiResponse.isSuccess === true) {
          this.loader = false;
          localStorage.setItem('aIk', userCredentials?.appIvKey);
          localStorage.setItem('ak', userCredentials?.appKey);
        } else if (apiResponse.isSuccess === false) {
        }
      },
      (err: any) => {}
    );
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }
}
