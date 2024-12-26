import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Route, Router } from '@angular/router';
import { ReleaseTransactionComponent } from '../release-transaction/release-transaction.component';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.scss']
})
export class TransactionDetailsComponent {
 constructor( private router: Router, private dialog: MatDialog){}

  back(){
    this.router.navigate(['/dashboard/fraud-scanner/suspected-transaction'])
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


  releaseTransaction() {
    let dialogRef = this.dialog.open(ReleaseTransactionComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      // data: { actionType: item == 'Create' ? 'Create' : 'Edit', data: item != 'Create' ? item : '' },
      disableClose: true,
      width: '440px',
      height: 'auto',
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }
}
