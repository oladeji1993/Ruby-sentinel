import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  hide: boolean = false;

  public togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

}
