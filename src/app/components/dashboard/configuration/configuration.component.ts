import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditConfigurationComponent } from './create-edit-configuration/create-edit-configuration.component';
import { DeleteModalComponent } from 'src/app/core/shared/delete-modal/delete-modal.component';
import { errorNotifier } from 'src/app/core/utils/helpers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateEditBankComponent } from './create-edit-bank/create-edit-bank.component';
import { CreateEditTransactionComponent } from './create-edit-transaction/create-edit-transaction.component';
import { CreateEditCurrencyComponent } from './create-edit-currency/create-edit-currency.component';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  selectedConfigurationType: any;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar) {}

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

  createConfiguration(item: any) {
    if (
      this.selectedConfigurationType == '' ||
      this.selectedConfigurationType == undefined
    ) {
      errorNotifier(this.snackBar, 'Select a configuration type');
    } else if (this.selectedConfigurationType == 'channel') {
      let dialogRef = this.dialog.open(CreateEditConfigurationComponent, {
        panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
        data: {
          actionType: item == 'Create' ? 'Create' : 'Edit',
          data: item != 'Create' ? item : '',
        },
        width: '440px',
        height: 'auto',
        disableClose: true,
      });
    } else if (this.selectedConfigurationType == 'bank') {
      let dialogRef = this.dialog.open(CreateEditBankComponent, {
        panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
        data: {
          actionType: item == 'Create' ? 'Create' : 'Edit',
          data: item != 'Create' ? item : '',
        },
        width: '440px',
        height: 'auto',
        disableClose: true,
      });
    } else if (this.selectedConfigurationType == 'currency') {
      let dialogRef = this.dialog.open(CreateEditCurrencyComponent, {
        panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
        data: {
          actionType: item == 'Create' ? 'Create' : 'Edit',
          data: item != 'Create' ? item : '',
        },
        width: '440px',
        height: 'auto',
        disableClose: true,
      });
    } else {
      let dialogRef = this.dialog.open(CreateEditTransactionComponent, {
        panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
        data: {
          actionType: item == 'Create' ? 'Create' : 'Edit',
          data: item != 'Create' ? item : '',
        },
        width: '440px',
        height: 'auto',
        disableClose: true,
      });
    }
    // dialogRef.afterClosed().subscribe(() => {});
  }

  deleteModal(item: any) {
    let dialogRef = this.dialog.open(DeleteModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: 'channel', data: item },
      width: '440px',
      height: 'auto',
      disableClose: true,
    });
    // dialogRef.afterClosed().subscribe(() => {});
  }

  actionType(item: any) {
    this.selectedConfigurationType = item.target.value;
  }
}
