import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/core/shared/delete-modal/delete-modal.component';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent {

  constructor(private dialog: MatDialog){}
  items = [
    {
      userName: 'Ruby Olawole ',
      email: 'ruby.olawole@sterling.ng',
      role: 'Viewer',
      profild_by: 'Davis Uche',
      Status: 'Active',
      date: '25/12/2024 - 13:00',
    },
    {
      userName: 'Ruby Olawole ',
      email: 'ruby.olawole@sterling.ng',
      role: 'Viewer',
      profild_by: 'Davis Uche',
      Status: 'Initiator',
      date: '25/12/2024 - 13:00',
    },
    {
      userName: 'Ruby Olawole ',
      email: 'ruby.olawole@sterling.ng',
      role: 'Viewer',
      profild_by: 'Davis Uche',
      Status: 'Active',
      date: '25/12/2024 - 13:00',
    },
    {
      userName: 'Ruby Olawole ',
      email: 'ruby.olawole@sterling.ng',
      role: 'Approver',
      profild_by: 'Davis Uche',
      Status: 'Active',
      date: '25/12/2024 - 13:00',
    },
  ];


   addUser(item: any) {
      let dialogRef = this.dialog.open(AddUserComponent, {
        panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
        data: { actionType: item == 'Create' ? 'Create' : 'Edit', data: item != 'Create' ? item : '' },
        width: '440px',
        height: 'auto',
        disableClose: true
      });
      // dialogRef.afterClosed().subscribe(() => {});
    }

  deleteModal(item: any) {
    let dialogRef = this.dialog.open(DeleteModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: 'user', data: item },
      width: '440px',
      height: 'auto',
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }
}
