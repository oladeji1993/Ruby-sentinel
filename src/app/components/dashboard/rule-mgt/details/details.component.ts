import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent {

  constructor(private dialogRef: MatDialogRef<DetailsComponent>){}

  closeModal(item: any) {
    document
      .getElementsByClassName('animate__animated')[0]
      .classList.add('animate__slideOutRight');
    setTimeout(() => {
      this.dialogRef.close({ data: '' });
    }, 700);
  }

}
