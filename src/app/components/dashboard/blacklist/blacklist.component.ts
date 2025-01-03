import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditBlacklistComponent } from './create-edit-blacklist/create-edit-blacklist.component';
import { DeleteModalComponent } from 'src/app/core/shared/delete-modal/delete-modal.component';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss']
})
export class BlacklistComponent {
  constructor(private dialog: MatDialog) {}

  items = [
    {
      name: 'OneBank Mobile',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      name: 'OneBank Mobile',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      name: 'monie point',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      name: 'OneBank Mobile',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
  ];


  createAndEdit(item: any) {
    let dialogRef = this.dialog.open(CreateEditBlacklistComponent, {
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
      data: { actionType: 'blacklist', data: item },
      width: '440px',
      height: 'auto',
      disableClose: true
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }


}
