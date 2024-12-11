import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditConfigurationComponent } from './create-edit-configuration/create-edit-configuration.component';
import { DeleteModalComponent } from 'src/app/core/shared/delete-modal/delete-modal.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  constructor(private dialog: MatDialog) {}

  items = [
    {
      channelName: 'Nigerian Naira',
      channelCode: 'ngn',
      description: '---',
    },
    {
      channelName: 'US Dollar',
      channelCode: 'usd',
      description: '---',
    },
    {
      channelName: 'Pounds Sterling',
      channelCode: 'gbp',
      description: '---',
    },
    { channelName: 'Euro', channelCode: 'eur', description: '---' },
    {
      channelName: 'Canadian Dollar',
      channelCode: 'cad',
      description: '---',
    },
    {
      channelName: 'Chinese Yen',
      channelCode: 'yen',
      description: '---',
    },
    {
      channelName: 'Nigerian Naira',
      channelCode: 'ngn',
      description: '---',
    },
    {
      channelName: 'US Dollar',
      channelCode: 'usd',
      description: '---',
    },
    {
      channelName: 'Pounds Sterling',
      channelCode: 'gbp',
      description: '---',
    },
    { channelName: 'Euro', channelCode: 'eur', description: '---' },
    {
      channelName: 'Canadian Dollar',
      channelCode: 'cad',
      description: '---',
    },
    {
      channelName: 'Chinese Yen',
      channelCode: 'yen',
      description: '---',
    },
    {
      channelName: 'Nigerian Naira',
      channelCode: 'ngn',
      description: '---',
    },
    {
      channelName: 'US Dollar',
      channelCode: 'usd',
      description: '---',
    },
    {
      channelName: 'Pounds Sterling',
      channelCode: 'gbp',
      description: '---',
    },
    { channelName: 'Euro', channelCode: 'eur', description: '---' },
    {
      channelName: 'Canadian Dollar',
      channelCode: 'cad',
      description: '---',
    },
    {
      channelName: 'Chinese Yen',
      channelCode: 'yen',
      description: '---',
    },
  ];


  createAndEdit(item: any) {
    let dialogRef = this.dialog.open(CreateEditConfigurationComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: item == 'Create' ? 'Create' : 'Edit', data: item != 'Create' ? item : '' },
      width: '440px',
      height: 'auto',
      disableClose: true
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }


  deleteModal(item: any) {
    let dialogRef = this.dialog.open(DeleteModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: 'channel', data: item },
      width: '440px',
      height: 'auto',
      disableClose: true
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }
}
