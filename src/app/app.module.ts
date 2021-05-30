import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { CoreModule } from '@core';
import { SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { ChangeAssetFormComponent } from './change-asset-form/change-asset-form.component';
import { ModalModule } from 'ng2-modal-module';
import { ModalComponent } from '@app/modal/modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { OAuthModule } from 'angular-oauth2-oidc';
import { ModalErrorComponent } from './modal-error/modal-error.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    CoreModule,
    SharedModule,
    ShellModule,
    HomeModule,
    AuthModule,
    MatSortModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    AppRoutingModule,
    NgbPaginationModule,
    NgbAlertModule,
    ModalModule,
    MatDialogModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:8080/api'],
        sendAccessToken: true,
      },
    }), // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent, ChangeAssetFormComponent, ModalComponent, ModalErrorComponent],
  providers: [], // { provide: LocationStrategy, useClass: HashLocationStrategy }
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule {}
