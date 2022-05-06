import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatSliderModule} from "@angular/material/slider";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpClient, HttpClientModule, HttpHandler} from "@angular/common/http";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {CdkAccordionModule} from "@angular/cdk/accordion";
import {MatChipsModule} from "@angular/material/chips";
import {DxSelectBoxModule, DxTextBoxModule} from "devextreme-angular";
import {MatDialogModule} from "@angular/material/dialog";
import { EditComponent } from './entities/components/edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    EditComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatOptionModule,
    MatSelectModule,
    CdkAccordionModule,
    MatChipsModule,
    DxTextBoxModule,
    DxSelectBoxModule,
    MatDialogModule,
  ],
  providers: [HttpClient],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }

