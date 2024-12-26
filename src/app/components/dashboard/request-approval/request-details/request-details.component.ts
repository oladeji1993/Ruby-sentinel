import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessModalComponent } from 'src/app/core/shared/success-modal/success-modal.component';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.scss'],
})
export class RequestDetailsComponent {
  constructor(
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<RequestDetailsComponent>
  ) {}

  closeModal(item: any) {
    document
      .getElementsByClassName('animate__animated')[0]
      .classList.add('animate__slideOutRight');
    setTimeout(() => {
      this.dialogRef.close({ data: '' });
    }, 700);
  }

  approve() {
    this.closeModal('close');
    let dialogRef = this.dialog.open(SuccessModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: 'Request' },
      // data: { actionType: item == 'Create' ? 'Create' : 'Edit', data: item != 'Create' ? item : '' },
      width: '440px',
      height: 'auto',
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }
}
