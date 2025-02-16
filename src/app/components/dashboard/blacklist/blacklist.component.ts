import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditBlacklistComponent } from './create-edit-blacklist/create-edit-blacklist.component';
import { DeleteModalComponent } from 'src/app/core/shared/delete-modal/delete-modal.component';
import { RubyService } from 'src/app/core/services/ruby.service';

@Component({
  selector: 'app-blacklist',
  templateUrl: './blacklist.component.html',
  styleUrls: ['./blacklist.component.scss'],
})
export class BlacklistComponent implements OnInit {
  allBlacklist: any;
  tableLoader: any;
  constructor(private dialog: MatDialog, private gap: RubyService) {}

  ngOnInit(): void {
    this.getAllBlacklist();
  }

  items = [
    {
      name: 'OneBank Mobile',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      name: 'OneBank Mobile',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      name: 'monie point',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
    {
      name: 'OneBank Mobile',
      type: 'channel',
      code: '123',
      description: '--',
      createdBy: 'Ruby Olawole',
      date: '25/12/2024 - 13:00',
    },
  ];

  getAllBlacklist() {
    this.tableLoader = true;
    this.gap
      .getApiResponseHandler(
        this.gap.getApiCallTemplate('Blacklist', 'GetAll'),
        ''
      )
      .subscribe({
        next: (response) => {
          this.allBlacklist = response?.value;
          this.tableLoader = false;
        },
        error: (error) => {
          this.tableLoader = false;
          console.error('Error:', error);
        },
      });
  }

  createAndEdit(item: any) {
    let dialogRef = this.dialog.open(CreateEditBlacklistComponent, {
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
      if (res?.data == true) {
        this.getAllBlacklist();
      }
    });
  }

  deleteModal(item: any) {
    let dialogRef = this.dialog.open(DeleteModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: 'blacklist', data: item },
      width: '440px',
      height: 'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res?.data == true) {
        this.getAllBlacklist();
      }
    });
  }
}
