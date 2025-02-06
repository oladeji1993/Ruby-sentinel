import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { RubyService } from 'src/app/core/services/ruby.service';
import { encryptUserData } from 'src/app/core/utils/helpers';

@Component({
  selector: 'app-create-edit-transaction',
  templateUrl: './create-edit-transaction.component.html',
  styleUrls: ['./create-edit-transaction.component.scss'],
})
export class CreateEditTransactionComponent {
  transactionForm!: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private rubyService: RubyService,
    private dialogRef: MatDialogRef<CreateEditTransactionComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.data?.data !== '') {
      let matchedPayload = {
        transactionName: this.data.data?.transactionName,
        transactionCode: this.data.data?.transactionCode,
        description: this.data.data?.description,
      };
      this.transactionForm.patchValue(matchedPayload);
    }
  }

  initializeForm() {
    this.transactionForm = this.fb.group({
      transactionName: ['', Validators.required],
      transactionCode: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get transactionFormControl() {
    return this.transactionForm.controls;
  }

  getErrorMessage(instance: string) {
    if (
      instance === 'transactionName' &&
      this.transactionFormControl['transactionName'].hasError('required')
    ) {
      return 'Transaction name is required';
    } else if (
      instance === 'transactionCode' &&
      this.transactionFormControl['transactionCode'].hasError('required')
    ) {
      return 'Transaction code is required';
    } else if (
      instance === 'description' &&
      this.transactionFormControl['description'].hasError('required')
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

  createTransaction(item: any) {
    this.submitted = true;
    if (this.transactionForm.invalid) {
      return;
    } else {
      this.loading = true;
      const { transactionName, transactionCode, description } = this.transactionForm.value;
      let data = {
        id: null,
        name: transactionName,
        code: transactionCode,
        description: description,
      };
      let payload = encryptUserData(data);
      this.rubyService
        .postApiResponseHandler(
          this.rubyService.postApiCallTemplate(
            'Transactions',
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
