import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateEditConfigurationComponent } from './create-edit-configuration/create-edit-configuration.component';
import { DeleteModalComponent } from 'src/app/core/shared/delete-modal/delete-modal.component';
import { errorNotifier } from 'src/app/core/utils/helpers';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CreateEditBankComponent } from './create-edit-bank/create-edit-bank.component';
import { CreateEditTransactionComponent } from './create-edit-transaction/create-edit-transaction.component';
import { CreateEditCurrencyComponent } from './create-edit-currency/create-edit-currency.component';
import { RubyService } from 'src/app/core/services/ruby.service';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  selectedConfigurationType: any = 'channel';
  tableLoader: any;
  bankTableLoader: any;
  allAvailableChannels: any;
  allAvailableBanks: any;
  transactionTableLoader: any = false;
  allAvailableTransactions: any;
  allAvailableCurrency: any;
  currencyTableLoader: any = false;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private rubyService: RubyService
  ) {}

  ngOnInit(): void {
    this.getAllchannels();
  }

  createConfiguration(item: any) {
    let dialogRef: any;
    if (
      this.selectedConfigurationType == '' ||
      this.selectedConfigurationType == undefined
    ) {
      errorNotifier(this.snackBar, 'Select a configuration type');
    } else if (this.selectedConfigurationType == 'channel') {
      this.getAllchannels();
      dialogRef = this.dialog.open(CreateEditConfigurationComponent, {
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
      dialogRef = this.dialog.open(CreateEditBankComponent, {
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
      dialogRef = this.dialog.open(CreateEditCurrencyComponent, {
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
      dialogRef = this.dialog.open(CreateEditTransactionComponent, {
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
    dialogRef.afterClosed().subscribe((res: any) => {
      console.log(res);
      
      if (res.data == true) {
        switch (this.selectedConfigurationType) {
          case 'bank':
            this.getAllbanks();
            break;
          case 'channel':
            this.getAllchannels();
            break;
          case 'transaction':
            this.getAllTransactions();
            break;
          default:
            this.getAllCurrency();
        }
      }
    });
  }

  deleteModal(item: any) {
    let dialogRef = this.dialog.open(DeleteModalComponent, {
      panelClass: ['animate__animated', 'animate__zoomIn', 'custom-modalbox'],
      data: { actionType: this.selectedConfigurationType, data: item },
      width: '440px',
      height: 'auto',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res.data == true) {
        switch (this.selectedConfigurationType) {
          case 'bank':
            this.getAllbanks();
            break;
          case 'channel':
            this.getAllchannels();
            break;
          case 'transaction':
            this.getAllTransactions();
            break;
          default:
            this.getAllCurrency();
        }
      }
    });
  }

  actionType(item: any) {
    this.selectedConfigurationType = item.target.value;
    switch (this.selectedConfigurationType) {
      case 'bank':
        this.getAllbanks();
        break;
      case 'channel':
        this.getAllchannels();
        break;
      case 'transaction':
        this.getAllTransactions();
        break;
      default:
        this.getAllCurrency();
    }
  }

  getAllchannels() {
    this.tableLoader = true;
    this.rubyService
      .getApiResponseHandler(
        this.rubyService.getApiCallTemplate('Channels', 'GetAll'),
        ''
      )
      .subscribe({
        next: (response) => {
          this.allAvailableChannels = response?.value;
          this.tableLoader = false;
        },
        error: (error) => {
          this.tableLoader = false;
          console.error('Error:', error);
        },
      });
  }
  getAllbanks() {
    this.bankTableLoader = true;
    this.rubyService
      .getApiResponseHandler(
        this.rubyService.getApiCallTemplate('Banks', 'GetAll'),
        ''
      )
      .subscribe({
        next: (response) => {
          this.allAvailableBanks = response?.value;
          this.bankTableLoader = false;
        },
        error: (error) => {
          this.bankTableLoader = false;
          console.error('Error:', error);
        },
      });
  }
  getAllTransactions() {
    this.transactionTableLoader = true;
    this.rubyService
      .getApiResponseHandler(
        this.rubyService.getApiCallTemplate('TransactionType', 'GetAll'),
        ''
      )
      .subscribe({
        next: (response) => {
          this.allAvailableTransactions = response?.value;
          this.transactionTableLoader = false;
        },
        error: (error) => {
          this.transactionTableLoader = false;
          console.error('Error:', error);
        },
      });
  }
  
  getAllCurrency() {
    this.currencyTableLoader = true;
    this.rubyService
      .getApiResponseHandler(
        this.rubyService.getApiCallTemplate('Currency', 'GetAll'),
        ''
      )
      .subscribe({
        next: (response) => {
          this.allAvailableCurrency = response?.value;
          this.currencyTableLoader = false;
        },
        error: (error) => {
          this.currencyTableLoader = false;
          console.error('Error:', error);
        },
      });
  }
}
