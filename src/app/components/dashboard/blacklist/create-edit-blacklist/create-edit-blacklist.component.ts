import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RubyService } from 'src/app/core/services/ruby.service';
import { errorNotifier, successNotifier } from 'src/app/core/utils/helpers';

@Component({
  selector: 'app-create-edit-blacklist',
  templateUrl: './create-edit-blacklist.component.html',
  styleUrls: ['./create-edit-blacklist.component.scss']
})
export class CreateEditBlacklistComponent implements OnInit {
  blacklistForm!: FormGroup;
  loader: boolean = false;
  submitted: boolean = false;
  eventForm!: FormGroup;
  selectedItemType: any
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private rubyService: RubyService,
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
    this.blacklistForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      createdBy: ['', Validators.required],
      date: ['', Validators.required],
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
      this.dialogRef.close({ data: '' });
    }, 700);
  }

  getErrorMessage(controlName: string): string {
    const control = this.blacklistFormControl[controlName];
    if (control.hasError('required')) {
      return `${controlName.replace(/([A-Z])/g, ' $1')} is required.`;
    }
    return '';
  }

  selectedItem(item:any){
    this.selectedItemType = item.target.value;
  }

  createOrUpdateBlacklist() {
    this.submitted = true;
    if (this.blacklistForm.invalid) {
      return;
    } else {
      this.loader = true;
      const { name, type, code, description, createdBy, date } = this.blacklistForm.value;
      const data = {
        id: this.data?.actionType === 'Edit' ? this.data?.data?.id : null,
        name,
        type,
        code,
        description,
        createdBy,
        date,
      };

      this.rubyService
        .ApiResponseHandler(
          this.rubyService.postApiCallTemplate('Blacklist', 'AddOrUpdate', {
            request: data,
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
