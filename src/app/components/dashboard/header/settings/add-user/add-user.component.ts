import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessModalComponent } from 'src/app/core/shared/success-modal/success-modal.component';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  eventForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<AddUserComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.data?.data !== '') {
      let matchedPayload = {
        eventCategory: this.data.data?.category,
        eventName: this.data.data?.event,
        eventTitle: this.data.data?.title,
        description: this.data.data?.description,
      };
      this.eventForm.patchValue(matchedPayload);
    }
  }

  initializeForm() {
    this.eventForm = this.fb.group({
      email: [''],
      userName: [''],
      role: [''],
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

  createUser(item: any) {
    this.closeModal('close');
    let dialogRef = this.dialog.open(SuccessModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: 'User', data: item },
      // data: { actionType: item == 'Create' ? 'Create' : 'Edit', data: item != 'Create' ? item : '' },
      width: '440px',
      height: 'auto',
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }
}
