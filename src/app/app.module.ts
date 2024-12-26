import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { DeleteModalComponent } from './core/shared/delete-modal/delete-modal.component';
import { SuccessModalComponent } from './core/shared/success-modal/success-modal.component';
import { SharedModule } from './core/shared/shared.module';

@NgModule({
  declarations: [AppComponent, DeleteModalComponent, SuccessModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    MatIconModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
