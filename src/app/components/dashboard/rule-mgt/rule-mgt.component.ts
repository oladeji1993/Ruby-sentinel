import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateStaticRuleComponent } from './create-static-rule/create-static-rule.component';
import { DetailsComponent } from './details/details.component';

@Component({
  selector: 'app-rule-mgt',
  templateUrl: './rule-mgt.component.html',
  styleUrls: ['./rule-mgt.component.scss'],
})
export class RuleMgtComponent {
  isEmpty: boolean = false;

  constructor(private dialog: MatDialog) {}

  createRule(item: any) {
    let dialogRef = this.dialog.open(CreateStaticRuleComponent, {
      panelClass: [
        'animate__animated',
        'animate__slideInRight',
        'custom-modalbox',
      ],
      // data: { actionType: item == 'Create' ? 'Create' : 'Edit', data: item != 'Create' ? item : '' },
      width: '500px',
      maxWidth: 'none',
      height: '100%',
      position: { right: '0' },
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }

  rules = [
    {
      name: 'Transactions of more than NGN 50,000 to certain banks in period.',
      Criteria:
        'currency = ngn AND amount > 50,000 AND channels = onebank AND Amount > 50,000 AND transaction_time = 21:00-04:00 AND BankCode IN (345,334,222,111,222,111,490)',
      Description:
        "Doesn't allow more than 50,000 to go to certain banks from 9:00pm and 4:00am",
      Action: 'HOLD',
      Status: 'Active',
    },
    {
      name: 'Unusual Transaction Activity time',
      Criteria:
        'payment_type = transfer AND Amount >= 20,000 AND transaction_time = 21:00-04:00 AND BankCode IN (345,334,222,111,222,111,490)',
      Description:
        'Detects transaction activities done within unusual times of the day from 09:00pm to 4:00am',
      Action: 'FREEZE',
      Status: 'Deactivated',
    },
    {
      name: 'High Volume in USSD Transactions',
      Criteria: 'channels = USSD AND Amount > 100,000 AND currency = ngn',
      Description: 'Detects USSD transactions that are greater than N10,000',
      Action: 'HOLD',
      Status: 'Active',
    },
    {
      name: 'Transactions of more than NGN 50,000 to certain banks in period.',
      Criteria:
        'currency = ngn AND amount > 50,000 AND channels = onebank AND Amount > 50,000 AND transaction_time = 21:00-04:00 AND BankCode IN (345,334,222,111,222,111,490)',
      Description:
        "Doesn't allow more than 50,000 to go to certain banks from 9:00pm and 4:00am",
      Action: 'DELAY',
      Status: 'Active',
    },
    {
      name: 'Unusual Transaction Activity time',
      Criteria:
        'channels = onebank AND Amount > 50,000 AND transaction_time = 21:00-04:00 AND BankCode IN (345,334,222,111,222,111,490)',
      Description:
        'Detects transaction activities done within unusual times of the day from 09:00pm to 4:00am',
      Action: 'FREEZE',
      Status: 'Deactivated',
    },
    {
      name: 'Over N100,000 in USSD Transactions',
      Criteria: 'channels = USSD AND Amount > 100,000 AND currency = ngn',
      Description: 'Detects USSD transactions that are greater than N10,000',
      Action: 'HOLD',
      Status: 'Active',
    },
    {
      name: 'Transactions of more than NGN 50,000 to certain banks in period.',
      Criteria:
        'currency = ngn AND amount > 50,000 AND channels = onebank AND Amount > 50,000 AND transaction_time = 21:00-04:00 AND BankCode IN (345,334,222,111,222,111,490)',
      Description:
        "Doesn't allow more than 50,000 to go to certain banks from 9:00pm and 4:00am",
      Action: 'HOLD',
      Status: 'Active',
    },
    {
      name: 'Over N100,000 in USSD Transactions',
      Criteria: 'channels = USSD AND Amount > 100,000 AND currency = ngn',
      Description: 'Detects USSD transactions that are greater than N10,000',
      Action: 'DELAY',
      Status: 'Active',
    },
  ];

  veiwRuleDetails(item: any) {
    let dialogRef = this.dialog.open(DetailsComponent, {
      panelClass: [
        'animate__animated',
        'animate__slideInRight',
        'custom-modalbox',
      ],
      // data: { actionType: item == 'Create' ? 'Create' : 'Edit', data: item != 'Create' ? item : '' },
      width: '500px',
      maxWidth: 'none',
      height: '100%',
      position: { right: '0' },
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }
}
