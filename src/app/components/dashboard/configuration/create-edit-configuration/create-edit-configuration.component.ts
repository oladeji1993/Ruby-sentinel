import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { RubyService } from 'src/app/core/services/ruby.service';
import { SuccessModalComponent } from 'src/app/core/shared/success-modal/success-modal.component';
import { decryptUserData, encryptUserData } from 'src/app/core/utils/helpers';

@Component({
  selector: 'app-create-edit-configuration',
  templateUrl: './create-edit-configuration.component.html',
  styleUrls: ['./create-edit-configuration.component.scss'],
})
export class CreateEditConfigurationComponent {
  channelForm!: FormGroup;
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
        channelName: this.data.data?.channelName,
        channelCode: this.data.data?.channelCode,
        description: this.data.data?.description,
      };
      this.channelForm.patchValue(matchedPayload);
    }
  }

  initializeForm() {
    this.channelForm = this.fb.group({
      channelName: ['', Validators.required],
      channelCode: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get channelFormControl() {
    return this.channelForm.controls;
  }

  getErrorMessage(instance: string) {
    if (
      instance === 'channelName' &&
      this.channelFormControl['channelName'].hasError('required')
    ) {
      return 'Channel name is required';
    } else if (
      instance === 'channelCode' &&
      this.channelFormControl['channelCode'].hasError('required')
    ) {
      return 'Channel code is required';
    } else if (
      instance === 'description' &&
      this.channelFormControl['description'].hasError('required')
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

  createAndUpdateChannel(item: any) {
    this.submitted = true;
    if (this.channelForm.invalid) {
      return;
    } else {
      this.loading = true;
      const { channelName, channelCode, description } = this.channelForm.value;
      let data = {
        id: this.data?.actionType == 'Edit' ? this.data?.data?.id : null,
        name: channelName,
        code: channelCode,
        description: description,
      };      
      let payload = encryptUserData(data);
      this.rubyService
        .ApiResponseHandler(
          this.rubyService.postApiCallTemplate(
            'Channels',
            'AddOrUpdate',
            {request: payload}
          ),
          'channels', this.data?.actionType
        )
        .subscribe({
          next: (response) => {
           this.closeModal(true)
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
