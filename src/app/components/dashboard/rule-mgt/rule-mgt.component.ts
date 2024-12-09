import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateStaticRuleComponent } from './create-static-rule/create-static-rule.component';

@Component({
  selector: 'app-rule-mgt',
  templateUrl: './rule-mgt.component.html',
  styleUrls: ['./rule-mgt.component.scss']
})
export class RuleMgtComponent {

  constructor(private dialog: MatDialog) {}

  createRule(item: any) {
    let dialogRef = this.dialog.open(CreateStaticRuleComponent, {
      panelClass: ['animate__animated', 'animate__slideInRight', 'custom-modalbox'],
      // data: { actionType: item == 'Create' ? 'Create' : 'Edit', data: item != 'Create' ? item : '' },
      width: '500px',
      maxWidth: 'none',
      height: '100%',
      position: { right: '0' },
      disableClose: true
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }

}
