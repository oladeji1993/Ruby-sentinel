import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { HeaderComponent } from './header/header.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { HomeComponent } from './home/home.component';
import { FraudScannerComponent } from './fraud-scanner/fraud-scanner.component';
import { MonitoredEventComponent } from './monitored-event/monitored-event.component';
import { RuleMgtComponent } from './rule-mgt/rule-mgt.component';
import { TransCheckerComponent } from './trans-checker/trans-checker.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { CreateAndEditEventComponent } from './monitored-event/create-and-edit-event/create-and-edit-event.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateStaticRuleComponent } from './rule-mgt/create-static-rule/create-static-rule.component';
import { DetailsComponent } from './rule-mgt/details/details.component';
import { CreateEditConfigurationComponent } from './configuration/create-edit-configuration/create-edit-configuration.component';
import { CreateEditBlacklistComponent } from './blacklist/create-edit-blacklist/create-edit-blacklist.component';
import { RecvPairsComponent } from './recv-pairs/recv-pairs.component';
import { CreateEditSendRecPairComponent } from './recv-pairs/create-edit-send-rec-pair/create-edit-send-rec-pair.component';
import { AccountBreachesComponent } from './fraud-scanner/account-breaches/account-breaches.component';
import { TransactionDetailsComponent } from './fraud-scanner/transaction-details/transaction-details.component';
import { CardContentComponent } from 'src/app/core/shared/card-content/card-content.component';
import { ReleaseTransactionComponent } from './fraud-scanner/release-transaction/release-transaction.component';
import { SharedModule } from 'src/app/core/shared/shared.module';
import { RequestApprovalComponent } from './request-approval/request-approval.component';
import { RequestDetailsComponent } from './request-approval/request-details/request-details.component';
import { SettingsComponent } from './header/settings/settings.component';
import { AddUserComponent } from './header/settings/add-user/add-user.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CreateEditBankComponent } from './configuration/create-edit-bank/create-edit-bank.component';
import { CreateEditTransactionComponent } from './configuration/create-edit-transaction/create-edit-transaction.component';
import { CreateEditCurrencyComponent } from './configuration/create-edit-currency/create-edit-currency.component';
import { FilterPipe } from 'src/app/core/utils/search.pipe';




@NgModule({
  declarations: [
    DashboardComponent,
    HeaderComponent,
    SideBarComponent,
    HomeComponent,
    FraudScannerComponent,
    MonitoredEventComponent,
    RuleMgtComponent,
    TransCheckerComponent,
    BlacklistComponent,
    ConfigurationComponent,
    CreateAndEditEventComponent,
    CreateStaticRuleComponent,
    DetailsComponent,
    CreateEditConfigurationComponent,
    CreateEditBlacklistComponent,
    RecvPairsComponent,
    TransactionDetailsComponent,
    CreateEditSendRecPairComponent,
    AccountBreachesComponent,
    ReleaseTransactionComponent,
    RequestApprovalComponent,
    RequestDetailsComponent,
    SettingsComponent,
    AddUserComponent,
    FilterPipe,
    CreateEditBankComponent,
    CreateEditTransactionComponent,
    CreateEditCurrencyComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSnackBarModule,
    SharedModule,
    MatInputModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
