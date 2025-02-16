import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteModalComponent } from 'src/app/core/shared/delete-modal/delete-modal.component';
import { CreateEditSendRecPairComponent } from './create-edit-send-rec-pair/create-edit-send-rec-pair.component';
import { RubyService } from 'src/app/core/services/ruby.service';

@Component({
  selector: 'app-recv-pairs',
  templateUrl: './recv-pairs.component.html',
  styleUrls: ['./recv-pairs.component.scss'],
})
export class RecvPairsComponent implements OnInit {
  allrecvPairlist: any;
  tableLoader: boolean = false;

  constructor(private dialog: MatDialog, private gap: RubyService) {}

  ngOnInit(): void {
    this.getAllSenderReciver();
  }

  items = [
    {
      senderAccount: '0012345678 ',
      recepientAccount: '0012345678',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      senderAccount: '0012345678',
      recepientAccount: '0012345678',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      senderAccount: '0012345678',
      recepientAccount: '0012345678',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      senderAccount: '0012345678 ',
      recepientAccount: '0012345678',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
  ];

  createAndEdit(item: any) {
    let dialogRef = this.dialog.open(CreateEditSendRecPairComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: {
        actionType: item == 'Create' ? 'Create' : 'Edit',
        data: item != 'Create' ? item : '',
      },
      width: '440px',
      height: 'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res: any) => {      
      if (res.data === true) {
        this.getAllSenderReciver();
      }
    });
  }

  deleteModal(item: any) {
    let dialogRef = this.dialog.open(DeleteModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: 'sender/receiver', data: item },
      width: '440px',
      height: 'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res: any) => {      
      if (res.data == true) {
        this.getAllSenderReciver();
      }
    });
  }

  getAllSenderReciver() {
    this.tableLoader = true;
    this.gap
      .getApiResponseHandler(
        this.gap.getApiCallTemplate('SenderReceiver', 'GetAll'),
        ''
      )
      .subscribe({
        next: (response) => {
          this.allrecvPairlist = response?.value;
          this.tableLoader = false;
        },
        error: (error) => {
          this.tableLoader = false;
          console.error('Error:', error);
        },
      });
  }
}
