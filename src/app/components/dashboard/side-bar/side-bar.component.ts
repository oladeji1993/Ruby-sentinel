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

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.userPermission = localStorage.getItem('userRight');
  }

  isActive(route: string) {
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
