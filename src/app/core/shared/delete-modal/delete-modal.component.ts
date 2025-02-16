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
    private dialogRef: MatDialogRef<DeleteModalComponent>
  ) {}

  ngOnInit(): void {}

  closeModal(item: any) {
    document
      .getElementsByClassName('animate__animated')[0]
      .classList.add('animate__zoomOut');
    setTimeout(() => {
      this.dialogRef.close({ data: item });
    }, 700);
  }

  deleteItem() {
    switch (this.data.actionType) {
      case 'event':
        this.deleteHandler('Events');
        break;
      case 'sender/receiver':
        this.deleteHandler('SenderReceiver');
        break;
      case 'blacklist':
        this.deleteHandler('Blacklist');
        break;
      case 'channel':
        this.deleteHandler('Channels');
        break;
      case 'transaction':
        this.deleteHandler('TransactionType');
        break;
      case 'currency':
        this.deleteHandler('Currency');
        break;
      case 'bank':
        this.deleteHandler('Banks');
        break;
      default:
      // this.getAllCurrency('');
    }
  }

  deleteHandler(item: any) {
    this.loader = true;
    this.rubyService
      .ApiResponseHandler(
        this.rubyService.deleteApiCallTemplate(
          item,
          'Delete',
          this.data?.data?.id
        ),
        this.data.actionType,
        'Delete'
      )
      .subscribe({
        next: (response) => {
          this.closeModal(true);
          this.loader = false;
        },
        error: (error) => {
          this.loader = false;
          console.error('Error:', error);
        },
      });
  }
}
