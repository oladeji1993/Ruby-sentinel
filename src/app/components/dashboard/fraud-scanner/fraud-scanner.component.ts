import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fraud-scanner',
  templateUrl: './fraud-scanner.component.html',
  styleUrls: ['./fraud-scanner.component.scss']
})
export class FraudScannerComponent {

  constructor(private router: Router){}
  
  showDetails(){
    this.router.navigate(['/dashboard/fraud-scanner/transaction-details'])
  }


}
