import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RubyService } from 'src/app/core/services/ruby.service';
import { encryptUserData } from 'src/app/core/utils/helpers';

@Component({
  selector: 'app-create-edit-bank',
  templateUrl: './create-edit-bank.component.html',
  styleUrls: ['./create-edit-bank.component.scss'],
})
export class CreateEditBankComponent {
  bankForm!: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private rubyService: RubyService,
    private dialogRef: MatDialogRef<CreateEditBankComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.data?.data !== '') {
      let matchedPayload = {
        bankName: this.data.data?.bankName,
        bankCode: this.data.data?.bankCode,
        description: this.data.data?.description,
      };
      this.bankForm.patchValue(matchedPayload);
    }
  }

  initializeForm() {
    this.bankForm = this.fb.group({
      bankName: ['', Validators.required],
      bankCode: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get bankFormControl() {
    return this.bankForm.controls;
  }

  getErrorMessage(instance: string) {
    if (
      instance === 'channelName' &&
      this.bankFormControl['bankName'].hasError('required')
    ) {
      return 'Bank name is required';
    } else if (
      instance === 'channelCode' &&
      this.bankFormControl['bankCode'].hasError('required')
    ) {
      return 'Bank code is required';
    } else if (
      instance === 'description' &&
      this.bankFormControl['description'].hasError('required')
    ) {
      return 'Please enter a description';
    } else {
      return;
    }
  }

  closeModal(item: any) {
    document
      .getElementsByClassName('animate__animated')[0]
      .classList.add('animate__zoomOut');
    setTimeout(() => {
      this.dialogRef.close({ data: '' });
    }, 700);
  }

  createBank(item: any) {
    this.submitted = true;
    if (this.bankForm.invalid) {
      return;
    } else {
      this.loading = true;
      const { channelName, channelCode, description } = this.bankForm.value;
      let data = {
        id: null,
        name: channelName,
        code: channelCode,
        description: description,
      };
      let payload = encryptUserData(data);
      this.rubyService
        .postApiResponseHandler(
          this.rubyService.postApiCallTemplate(
            'Banks',
            'AddOrUpdate',
            // {request: payload}
            data
          ),
          item
        )
        .subscribe({
          next: (response) => {
            console.log('Success:', response);
            this.loading = false;
            // Perform additional actions if needed
          },
          error: (error) => {
            this.loading = false;
            console.error('Error:', error);
          },
        });
    }
    // let dialogRef = this.dialog.open(SuccessModalComponent, {
    //   panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
    //   data: { actionType: 'Channel', data: item },
    //   width: '440px',
    //   height: 'auto',
    //   disableClose: true,
    // });
    // dialogRef.afterClosed().subscribe(() => {});
  }
}
