import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  checked: any;

  constructor(private router: Router){}

  logOut(){
    this.router.navigate(['/login'])
  }


  settings(){
    this.router.navigate(['/dashboard/settings'])

  }
}
