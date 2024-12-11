import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessModalComponent } from 'src/app/core/shared/success-modal/success-modal.component';

@Component({
  selector: 'app-create-edit-blacklist',
  templateUrl: './create-edit-blacklist.component.html',
  styleUrls: ['./create-edit-blacklist.component.scss']
})
export class CreateEditBlacklistComponent {

  eventForm!: FormGroup;
  selectedItemType: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private dialogRef: MatDialogRef<CreateEditBlacklistComponent>
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
      eventCategory: [''],
      eventName: [''],
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
    this.closeModal('close')
    let dialogRef = this.dialog.open(SuccessModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: 'BlackList', data: item },
      // data: { actionType: item == 'Create' ? 'Create' : 'Edit', data: item != 'Create' ? item : '' },
      width: '440px',
      height: 'auto',
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }

  selectedItem(item:any){
    this.selectedItemType = item.target.value;
  }



}
