import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RubyService } from 'src/app/core/services/ruby.service';
import { SuccessModalComponent } from 'src/app/core/shared/success-modal/success-modal.component';
import { encryptUserData } from 'src/app/core/utils/helpers';

@Component({
  selector: 'app-create-edit-send-rec-pair',
  templateUrl: './create-edit-send-rec-pair.component.html',
  styleUrls: ['./create-edit-send-rec-pair.component.scss'],
})
export class CreateEditSendRecPairComponent implements OnInit {
  eventForm!: FormGroup;
  selectedItemType: any;
  loader: boolean = false;
  submitted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private rubyService: RubyService,
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
      senderAccount: ['', Validators.required],
      receiverAccount: ['', Validators.required],
      eventCategory: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get eventFormControl() {
    return this.eventForm.controls;
  }

  getErrorMessage(controlName: string): string {
    const control = this.eventFormControl[controlName];
    if (control.hasError('required')) {
      return `${controlName.replace(/([A-Z])/g, ' $1')} is required.`;
    }
    return '';
  }

  closeModal(item: any) {
    document
      .getElementsByClassName('animate__animated')[0]
      .classList.add('animate__zoomOut');
    setTimeout(() => {
      this.dialogRef.close({ data: item });
    }, 700);
  }

  createAndUpdate() {
    this.submitted = true;
    if (this.eventForm.invalid) {
      return;
    } else {
      this.loader = true;
      const { senderAccount, receiverAccount, eventCategory, description } = this.eventForm.value;
      let data = {
        id: this.data?.actionType === 'Edit' ? this.data?.data?.id : null,
        sender: senderAccount,
        recepientBank: receiverAccount,
        recipient: eventCategory,
        description: description,
      };      
      let payload = encryptUserData(data);
      this.rubyService
      .ApiResponseHandler(
        this.rubyService.postApiCallTemplate('SenderReceiver', 'AddOrUpdate', {
          request: payload,
        }),
        'Sender/Receiver Pair', this.data?.actionType
      )
      .subscribe({
        next: (response) => {
          this.closeModal(true)
          this.loader = false;
        },
        error: (error) => {
          this.loader = false;
          console.error('Error:', error);
        },
      });
  }
  }

  selectedItem(item: any) {
    this.selectedItemType = item.target.value;
  }
}
