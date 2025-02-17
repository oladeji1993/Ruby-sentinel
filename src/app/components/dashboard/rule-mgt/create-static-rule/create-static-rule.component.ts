import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RubyService } from 'src/app/core/services/ruby.service';
import { encryptUserData } from 'src/app/core/utils/helpers';

@Component({
  selector: 'app-create-static-rule',
  templateUrl: './create-static-rule.component.html',
  styleUrls: ['./create-static-rule.component.scss'],
})
export class CreateStaticRuleComponent implements OnInit {
  allAvailableCurrency: any;
  staticRuleForm!: FormGroup;
  submitted: boolean = false;
  loading: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<CreateStaticRuleComponent>,
    private rubyService: RubyService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getAllCurrency();
    this.initializeForm();
  }

  initializeForm() {
    this.staticRuleForm = this.fb.group({
      name: ['', Validators.required],
      criteria: ['', Validators.required],
      criteriaValue: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  get staticRuleFormControl() {
    return this.staticRuleForm.controls;
  }

  getErrorMessage(controlName: string): string {
    const control = this.staticRuleFormControl[controlName];
    if (control.hasError('required')) {
      return `${controlName.replace(/([A-Z])/g, ' $1')} is required.`;
    }
    return '';
  }

  closeModal(item: any) {
    document
      .getElementsByClassName('animate__animated')[0]
      .classList.add('animate__slideOutRight');
    setTimeout(() => {
      this.dialogRef.close({ data: item });
    }, 700);
  }

  getAllCurrency() {
    this.rubyService
      .getApiResponseHandler(
        this.rubyService.getApiCallTemplate('Currency', 'GetAll'),
        ''
      )
      .subscribe({
        next: (response) => {
          this.allAvailableCurrency = response?.value;
        },
        error: (error) => {
          console.error('Error:', error);
        },
      });
  }

  setRule() {
    this.submitted = true;
    if (this.staticRuleForm.invalid) {
      return;
    } else {
      this.loading = true;
      const { name, criteria, description, criteriaValue } = this.staticRuleForm.value;
      let data = {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        staticRuleId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: name,
        eventId: 'string',
        transactionCriterias: [
          {
            id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
            value: criteriaValue,
            criteria: criteria,
          },
        ],
        description: description,
        isEscalated: false,
        isActivated: false,
        escalationLevel: 0,
        frequencyTreshold: 'string',
        timeFrame: 'string',
        alertTypes: [0],
        transactionDirection: 0,
        action: 0,
        customerAction: 'string',
      };
      let payload = encryptUserData(data);
      this.rubyService
        .ApiResponseHandler(
          this.rubyService.postApiCallTemplate('Rules', 'AddOrUpdate', {
            request: payload,
          }),
          'Rules',
          'Create'
        )
        .subscribe({
          next: (response) => {
            this.closeModal(true);
            this.loading = false;
          },
          error: (error) => {
            this.loading = false;
            console.error('Error:', error);
          },
        });
    }
  }
}
