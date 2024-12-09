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
    CreateStaticRuleComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatInputModule,
    MatMenuModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
