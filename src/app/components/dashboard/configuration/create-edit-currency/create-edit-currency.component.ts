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
        currencyName: this.data.data?.name,
        currencyCode: this.data.data?.code,
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
      instance === 'currencyName' &&
      this.currencyFormControl['currencyName'].hasError('required')
    ) {
      return 'Currency name is required';
    } else if (
      instance === 'currencyCode' &&
      this.currencyFormControl['currencyCode'].hasError('required')
    ) {
      return 'Currency code is required';
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
      this.dialogRef.close({ data: item });
    }, 700);
  }

  createCurrency(item: any) {
    this.submitted = true;
    if (this.currencyForm.invalid) {
      return;
    } else {
      this.loading = true;
      const { currencyName, currencyCode, description } = this.currencyForm.value;
      console.log(this.currencyForm.value);

      let data = {
        id: this.data?.actionType == 'Edit' ? this.data?.data?.id : null,
        name: currencyName,
        code: currencyCode,
        description: description,
      };

      console.log(data);
      
      let payload = encryptUserData(data);
      this.rubyService
        .ApiResponseHandler(
          this.rubyService.postApiCallTemplate(
            'Currency',
            'AddOrUpdate',
            {request: payload}
          ),
          'currency',this.data.actionType
        )
        .subscribe({
          next: (response) => {
            this.closeModal(true)
            this.loading = false;
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
