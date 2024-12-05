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
        path: 'fraud-scanner',
        component: FraudScannerComponent,
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
