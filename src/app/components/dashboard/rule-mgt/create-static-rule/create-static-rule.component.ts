import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-static-rule',
  templateUrl: './create-static-rule.component.html',
  styleUrls: ['./create-static-rule.component.scss'],
})
export class CreateStaticRuleComponent {
  constructor(private dialogRef: MatDialogRef<CreateStaticRuleComponent>){}

  closeModal(item: any) {
    document
      .getElementsByClassName('animate__animated')[0]
      .classList.add('animate__slideOutRight');
    setTimeout(() => {
      this.dialogRef.close({ data: '' });
    }, 700);
  }
}
