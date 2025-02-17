import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RubyService } from 'src/app/core/services/ruby.service';
import {
  encryptUserData,
  errorNotifier,
  successNotifier,
} from 'src/app/core/utils/helpers';

@Component({
  selector: 'app-create-edit-blacklist',
  templateUrl: './create-edit-blacklist.component.html',
  styleUrls: ['./create-edit-blacklist.component.scss'],
})
export class CreateEditBlacklistComponent implements OnInit {
  blacklistForm!: FormGroup;
  loader: boolean = false;
  submitted: boolean = false;
  eventForm!: FormGroup;
  selectedItemType: any;
  isReadOnly: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private rubyService: RubyService,
    private dialogRef: MatDialogRef<CreateEditBlacklistComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.blacklistForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get blacklistFormControl() {
    return this.blacklistForm.controls;
  }

  closeModal(item: any) {
    document
      .getElementsByClassName('animate__animated')[0]
      .classList.add('animate__zoomOut');
    setTimeout(() => {
      this.dialogRef.close({ data: item });
    }, 700);
  }

  getErrorMessage(controlName: string): string {
    const control = this.blacklistFormControl[controlName];
    if (control.hasError('required')) {
      return `${controlName.replace(/([A-Z])/g, ' $1')} is required.`;
    }
    return '';
  }

  selectedItem(item: any) {
    this.selectedItemType = item.target.value;
    if (this.data?.data !== '') {
      this.isReadOnly = true;
      let matchedPayload = {
        type: this.data.data?.type,
        name: this.data.data?.name,
        code: this.data.data?.number,
        description: this.data.data?.description,
      };      
      this.blacklistForm.patchValue(matchedPayload);
    }
  }

  createOrUpdateBlacklist() {
    this.submitted = true;
    if (this.blacklistForm.invalid) {
      return;
    } else {
      this.loader = true;
      const { name, type, code, description } = this.blacklistForm.value;
      const data = {
        id: this.data?.actionType === 'Edit' ? this.data?.data?.id : null,
        name: name,
        type: type,
        number: code,
        description: description,
      };
      let payload = encryptUserData(data);
      this.rubyService
        .ApiResponseHandler(
          this.rubyService.postApiCallTemplate('Blacklist', 'AddOrUpdate', {
            request: payload,
          }),
          'Blacklist',
          this.data?.actionType
        )
        .subscribe({
          next: (response) => {
            this.loader = false;
            this.closeModal(true);
          },
          error: (error) => {
            this.loader = false;
            console.error('Error:', error);
          },
        });
    }
  }
}
