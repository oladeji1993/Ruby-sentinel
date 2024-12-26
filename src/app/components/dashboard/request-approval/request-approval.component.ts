import { Component } from '@angular/core';
import { DetailsComponent } from '../rule-mgt/details/details.component';
import { MatDialog } from '@angular/material/dialog';
import { RequestDetailsComponent } from './request-details/request-details.component';

@Component({
  selector: 'app-request-approval',
  templateUrl: './request-approval.component.html',
  styleUrls: ['./request-approval.component.scss'],
})
export class RequestApprovalComponent {
  isEmpty: boolean = false;

  constructor(private dialog: MatDialog) {}

  createRule(item: any) {}

  rules = [
    {
      request_type: 'Release Transaction',
      item_type: 'Transfer',
      reason: 'Legitimate Transaction',
      requested_by: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      request_type: 'Add to Blacklist',
      item_type: 'Bank',
      reason: '---',
      requested_by: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      request_type: 'Add to Send/Rev. Pairs',
      item_type: '012345678',
      reason: '---',
      requested_by: 'Ruby Olawole',
      date: 'Fill (136) x 20 Hug',
    },
    {
      request_type: 'Add Static Rule',
      item_type: 'Unusual Transaction Activity time',
      reason: 'Detects transaction activities done w...',
      requested_by: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      request_type: 'Remove from Blacklist',
      item_type: 'Currency',
      reason: '---',
      requested_by: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      request_type: 'Add New Configuration',
      item_type: 'Channels',
      reason: '---',
      requested_by: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      request_type: 'Add New Event Based Rule',
      item_type: 'First transaction after updating passw...',
      reason: 'Detects and blocks transfer transacti...',
      requested_by: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      request_type: 'Remove Configuration',
      item_type: 'Transaction Type',
      reason: '---',
      requested_by: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      request_type: 'Add New Monitored Event',
      item_type: 'Authentication Event',
      reason: 'Describes when a user resets their se...',
      requested_by: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
  ];

  veiwRuleDetails(item: any) {
    let dialogRef = this.dialog.open(RequestDetailsComponent, {
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
