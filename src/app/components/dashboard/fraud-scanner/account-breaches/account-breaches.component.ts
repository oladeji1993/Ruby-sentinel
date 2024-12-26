import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-breaches',
  templateUrl: './account-breaches.component.html',
  styleUrls: ['./account-breaches.component.scss']
})
export class AccountBreachesComponent {

  constructor(private router: Router){}

  showDetails(){
    this.router.navigate(['/dashboard/fraud-scanner/transaction-details'])
  }

}
