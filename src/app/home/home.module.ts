import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '@shared';
import { MaterialModule } from '@app/material.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { PropertyComponent } from '@app/property/property.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { SliderModule } from 'primeng/slider';
import { MultiSelectModule } from 'primeng/multiselect';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { ProgressBarModule } from 'primeng/progressbar';
import { InputTextModule } from 'primeng/inputtext';
import { NgxPaginationModule } from 'ngx-pagination';
import { PropertyDetailComponent } from '@app/property-detail/property-detail.component';
import { CommentComponent } from '@app/comment/comment.component';
import { AddAssetComponent } from '@app/add-asset/add-asset.component';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from '@app/app-routing.module';
import { AuthModule } from '@app/auth';

@NgModule({
  // tslint:disable-next-line:max-line-length
  imports: [
    CommonModule,
    TranslateModule,
    SharedModule,
    FlexLayoutModule,
    MaterialModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ButtonModule,
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule,
    SliderModule,
    DialogModule,
    MultiSelectModule,
    ContextMenuModule,
    DropdownModule,
    ToastModule,
    InputTextModule,
    ProgressBarModule,
    NgxPaginationModule,
    NgbPaginationModule,
    NgbAlertModule,
    AuthModule,
  ],
  declarations: [
    HomeComponent,
    PropertyComponent,
    PropertyDetailComponent,
    SearchBarComponent,
    CommentComponent,
    AddAssetComponent,
  ],
})
export class HomeModule {}
