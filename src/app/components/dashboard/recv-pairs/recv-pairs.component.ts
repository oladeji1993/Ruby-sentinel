import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/core/shared/delete-modal/delete-modal.component';
import { CreateEditSendRecPairComponent } from './create-edit-send-rec-pair/create-edit-send-rec-pair.component';

@Component({
  selector: 'app-recv-pairs',
  templateUrl: './recv-pairs.component.html',
  styleUrls: ['./recv-pairs.component.scss']
})
export class RecvPairsComponent {
  constructor(private dialog: MatDialog) {}

  items = [
    {
      senderAccount: '0012345678 ',
      recepientAccount: '0012345678',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      senderAccount: '0012345678',
      recepientAccount: '0012345678',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      senderAccount: '0012345678',
      recepientAccount: '0012345678',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      senderAccount: '0012345678 ',
      recepientAccount: '0012345678',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
  ];


  createAndEdit(item: any) {
    let dialogRef = this.dialog.open(CreateEditSendRecPairComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: item == 'Create' ? 'Create' : 'Edit', data: item != 'Create' ? item : '' },
      width: '440px',
      height: 'auto',
      disableClose: true
    });
  }

  deleteModal(item: any) {
    let dialogRef = this.dialog.open(DeleteModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: 'sender/rece pair', data: item },
      width: '440px',
      height: 'auto',
      disableClose: true
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }


}
