import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SharedModule } from "../../../../core/shared/shared.module";

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss'],
  standalone: true,
  imports: [SharedModule]
})
export class TransactionSummaryComponent {
   constructor( private router: Router, private dialog: MatDialog){}
  
    back(){
      this.router.navigate(['/dashboard/trans-checker'])
    }
  
    data: any = {
      cardName: 'Source Account Info',
      Customer_name:'helo',
      Customer_age:10,
      Customer_ehs:4,
      addresss:'cjehnjene'
    }
  
    destinationData: any = {
      cardName: 'Destination Account/s info',
      Customer_name:'helo',
      Customer_age:10,
      Customer_ehs:4,
      addresss:'cjehnjene'
    }
}
