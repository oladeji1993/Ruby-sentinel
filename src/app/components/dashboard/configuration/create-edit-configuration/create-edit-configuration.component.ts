import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessModalComponent } from 'src/app/core/shared/success-modal/success-modal.component';

@Component({
  selector: 'app-create-edit-configuration',
  templateUrl: './create-edit-configuration.component.html',
  styleUrls: ['./create-edit-configuration.component.scss']
})
export class CreateEditConfigurationComponent {
  channelForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateEditConfigurationComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.data?.data !== '') {
      let matchedPayload = {
        channelName: this.data.data?.channelName,
        channelCode: this.data.data?.channelCode,
        description: this.data.data?.description,
      };
      this.channelForm.patchValue(matchedPayload);
    }
  }

  initializeForm() {
    this.channelForm = this.fb.group({
      channelName: [''],
      channelCode: [''],
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
    this.closeModal('close')
    let dialogRef = this.dialog.open(SuccessModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: 'Channel', data: item },
      width: '440px',
      height: 'auto',
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }

}
