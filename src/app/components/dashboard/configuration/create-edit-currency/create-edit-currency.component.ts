import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RubyService } from 'src/app/core/services/ruby.service';
import { CreateEditConfigurationComponent } from '../create-edit-configuration/create-edit-configuration.component';
import { encryptUserData } from 'src/app/core/utils/helpers';

@Component({
  selector: 'app-create-edit-currency',
  templateUrl: './create-edit-currency.component.html',
  styleUrls: ['./create-edit-currency.component.scss'],
})
export class CreateEditCurrencyComponent {
  currencyForm!: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private rubyService: RubyService,
    private dialogRef: MatDialogRef<CreateEditConfigurationComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.data?.data !== '') {
      let matchedPayload = {
        currencyName: this.data.data?.channelName,
        currencyCode: this.data.data?.channelCode,
        description: this.data.data?.description,
      };
      this.currencyForm.patchValue(matchedPayload);
    }
  }

  initializeForm() {
    this.currencyForm = this.fb.group({
      currencyName: ['', Validators.required],
      currencyCode: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get currencyFormControl() {
    return this.currencyForm.controls;
  }

  getErrorMessage(instance: string) {
    if (
      instance === 'channelName' &&
      this.currencyFormControl['channelName'].hasError('required')
    ) {
      return 'Channel name is required';
    } else if (
      instance === 'channelCode' &&
      this.currencyFormControl['channelCode'].hasError('required')
    ) {
      return 'Channel code is required';
    } else if (
      instance === 'description' &&
      this.currencyFormControl['description'].hasError('required')
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

  createCurrency(item: any) {
    this.submitted = true;
    if (this.currencyForm.invalid) {
      return;
    } else {
      this.loading = true;
      const { channelName, channelCode, description } = this.currencyForm.value;
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
            'Currency',
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
