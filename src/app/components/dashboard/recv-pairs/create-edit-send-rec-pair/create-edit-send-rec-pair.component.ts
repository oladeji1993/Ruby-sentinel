import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessModalComponent } from 'src/app/core/shared/success-modal/success-modal.component';

@Component({
  selector: 'app-create-edit-send-rec-pair',
  templateUrl: './create-edit-send-rec-pair.component.html',
  styleUrls: ['./create-edit-send-rec-pair.component.scss'],
})
export class CreateEditSendRecPairComponent {
  eventForm!: FormGroup;
  selectedItemType: any;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateEditSendRecPairComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.data?.data !== '') {
      let matchedPayload = {
        senderAccount: this.data.data?.senderAccount,
        receiverAccount: this.data.data?.recepientAccount,
        eventTitle: this.data.data?.title,
        description: this.data.data?.description,
      };
      this.eventForm.patchValue(matchedPayload);
    }
  }

  initializeForm() {
    this.eventForm = this.fb.group({
      senderAccount: [''],
      receiverAccount: [''],
      eventTitle: [''],
      description: [''],
    });
  }

  closeModal(item: any) {
    document
      .getElementsByClassName('animate__animated')[0]
      .classList.add('animate__zoomOut');
    setTimeout(() => {
      this.dialogRef.close({ data: '' });
    }, 700);
  }

  createEvent(item: any) {
    this.closeModal('close');
    let dialogRef = this.dialog.open(SuccessModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: 'Sender/Receiver Pair', data: item },
      // data: { actionType: item == 'Create' ? 'Create' : 'Edit', data: item != 'Create' ? item : '' },
      width: '440px',
      height: 'auto',
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }

  selectedItem(item: any) {
    this.selectedItemType = item.target.value;
  }
}
