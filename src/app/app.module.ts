// Angular
import { NgModule } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Modulos
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PrimengModule } from 'src/app/shared/primeng.module';
/* Providers / Services */
import { MessageService, ConfirmationService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
/* Components */
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({ declarations: [AppComponent, LoginComponent],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA], imports: [BrowserModule,
        AppRoutingModule,
        PrimengModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule], providers: [MessageService, ConfirmationService, DialogService, provideHttpClient(withInterceptorsFromDi())] })
export class AppModule {}
