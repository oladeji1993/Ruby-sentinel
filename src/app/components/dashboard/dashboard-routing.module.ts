import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './home/home.component';
import { FraudScannerComponent } from './fraud-scanner/fraud-scanner.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { MonitoredEventComponent } from './monitored-event/monitored-event.component';
import { RuleMgtComponent } from './rule-mgt/rule-mgt.component';
import { TransCheckerComponent } from './trans-checker/trans-checker.component';
import { RecvPairsComponent } from './recv-pairs/recv-pairs.component';
import { AccountBreachesComponent } from './fraud-scanner/account-breaches/account-breaches.component';
import { TransactionDetailsComponent } from './fraud-scanner/transaction-details/transaction-details.component';
import { TransactionSummaryComponent } from './trans-checker/transaction-details/transaction-details.component';
import { RequestApprovalComponent } from './request-approval/request-approval.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'fraud-scanner/suspected-transaction',
        component: FraudScannerComponent,
      },
      {
        path: 'fraud-scanner/transaction-details',
        component: TransactionDetailsComponent,
      },
      {
        path: 'fraud-scanner/account-breaches',
        component: AccountBreachesComponent,
      },
      {
        path: 'blacklist',
        component: BlacklistComponent,
      },
      {
        path: 'configuration',
        component: ConfigurationComponent,
      },
      {
        path: 'monitored-event',
        component: MonitoredEventComponent,
      },
      {
        path: 'rule-mgt',
        component: RuleMgtComponent,
      },
      {
        path: 'trans-checker',
        component: TransCheckerComponent,
      },

      {
        path: 'trans-checker/details',
        component: TransactionSummaryComponent,
      },

      {
        path: 'Send-Recv-Pairs',
        component: RecvPairsComponent,
      },
      {
        path: 'request-approval',
        component: RequestApprovalComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
