import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { RubyService } from 'src/app/core/services/ruby.service';
import { SuccessModalComponent } from 'src/app/core/shared/success-modal/success-modal.component';
import {
  decryptUserData,
  encryptUserData,
  errorNotifier,
  successNotifier,
} from 'src/app/core/utils/helpers';

@Component({
  selector: 'app-create-and-edit-event',
  templateUrl: './create-and-edit-event.component.html',
  styleUrls: ['./create-and-edit-event.component.scss'],
})
export class CreateAndEditEventComponent implements OnInit {
  eventForm!: FormGroup;
  loader: boolean = false;
  requestSubscription!: any;
  submitted: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private rubyService: RubyService,
    private dialogRef: MatDialogRef<CreateAndEditEventComponent>
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    if (this.data?.data !== '') {
      let matchedPayload = {
        eventCategory: this.data.data?.type,
        eventName: this.data.data?.name,
        eventTitle: this.data.data?.keyWord,
        description: this.data.data?.description,
      };
      this.eventForm.patchValue(matchedPayload);
    }
  }

  initializeForm() {
    this.eventForm = this.fb.group({
      eventCategory: ['', Validators.required],
      eventName: ['', Validators.required],
      eventTitle: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get eventFormControl() {
    return this.eventForm.controls;
  }

  getErrorMessage(instance: string) {
    if (
      instance === 'eventCategory' &&
      this.eventFormControl['eventCategory'].hasError('required')
    ) {
      return 'Please select a categoty';
    } else if (
      instance === 'eventName' &&
      this.eventFormControl['eventName'].hasError('required')
    ) {
      return 'Please enter an event name';
    } else if (
      instance === 'eventTitle' &&
      this.eventFormControl['eventTitle'].hasError('required')
    ) {
      return 'Please enter an event title';
    } else if (
      instance === 'description' &&
      this.eventFormControl['description'].hasError('required')
    ) {
      return 'Please enter an event description';
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

  createEvent(item: any) {
    this.submitted = true;
    if (this.eventForm.invalid) {
      return;
    } else {
      this.loader = true;
      const { eventCategory, eventName, eventTitle, description } =
        this.eventForm.value;
      let data = {
        id: this.data?.actionType == 'Edit' ? this.data?.data?.id : null,
        name: eventName,
        keyWord: eventTitle,
        category: eventCategory,
        description: description,
      };  
      console.log(data);
          
      let payload = encryptUserData(data);
      this.rubyService
        .ApiResponseHandler(
          this.rubyService.postApiCallTemplate('Events', 'AddOrUpdate', {
            request: payload,
          }),
          'Event', this.data?.actionType
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
}
