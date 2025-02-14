import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RubyService } from '../../services/ruby.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss'],
})
export class DeleteModalComponent implements OnInit {
  loader: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private rubyService: RubyService,
    private dialogRef: MatDialogRef<DeleteModalComponent>){};

    ngOnInit(): void {
    }

  closeModal(item: any) {
    document
      .getElementsByClassName('animate__animated')[0]
      .classList.add('animate__zoomOut');
    setTimeout(() => {
      this.dialogRef.close({ data: '' });
    }, 700);
  }

  deleteItem(){
    if(this.data.actionType == 'event'){
      this.deleteEvent()
    }
  }


  deleteEvent(){
    this.loader = true
    this.rubyService.ApiResponseHandler(
      this.rubyService.deleteApiCallTemplate('Events', 'Delete', this.data?.data?.id),
      'Event', 'Delete'
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
