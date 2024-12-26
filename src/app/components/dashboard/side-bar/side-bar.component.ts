import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss'],
})
export class SideBarComponent {
  path!: String | any;
  isProfileCompleted: any;
  isKycComplete: any;
  userPermission: any;

  menus: any = {
    fraudScan: false, // Initially closed
  };

  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url);

    this.userPermission = localStorage.getItem('userRight');
  }

  toggleMenu(menu: string): void {
    this.menus[menu] = !this.menus[menu];
    console.log(this.menus[menu]);
  }

  isActive(route: string) {
    if (
      this.router.url == '/dashboard/fraud-scanner/suspected-transaction' ||
      this.router.url == '/dashboard/fraud-scanner/account-breaches' || this.router.url == '/dashboard/fraud-scanner/transaction-details'
    ){
      this.menus.fraudScan = true;
    }else{
      this.menus.fraudScan = false;
    };

    return this.router.url.includes(route);
  }

  // setRoutePath(item: string) {
  //   localStorage.setItem('routePath', item);
  //   this.customvalidationService.emitValue.next(item);
  //   if (
  //     this.breakpointObserver.isMatched([
  //       Breakpoints.Small,
  //       Breakpoints.Handset,
  //     ])
  //   ) {
  //     this.customvalidationService.sideBarMessenger.next(true);
  //   } else {
  //     this.customvalidationService.sideBarMessenger.next(null);
  //   }
  // }
}
