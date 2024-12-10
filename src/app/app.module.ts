import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environment';

import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SliceIntoGroupsPipe } from './userApp/items/items.component';
import { AngularEditorModule } from '@kolkov/angular-editor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './creatingAcc/sign-up/sign-up.component';
import { SignInComponent } from './creatingAcc/sign-in/sign-in.component';
import { VerifyEmailComponent } from './creatingAcc/verify-email/verify-email.component';
import { ForgetPasswordComponent } from './creatingAcc/forget-password/forget-password.component';
import { CategoryComponent } from './adminApp/category/category.component';
import { AddItemComponent } from './adminApp/add-item/add-item.component';
import { AllItemComponent } from './adminApp/all-item/all-item.component';
import { DisplayComponent } from './adminApp/display/display.component';
import { ItemsComponent } from './userApp/items/items.component';
import { ItemDetailsComponent } from './userApp/item-details/item-details.component';
import { CategoryListComponent } from './userApp/category-list/category-list.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BuyComponent } from './userApp/buy/buy.component';
import { NavbarComponent } from './userApp/navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    SignInComponent,
    VerifyEmailComponent,
    ForgetPasswordComponent,
    CategoryComponent,
    AddItemComponent,
    AllItemComponent,
    DisplayComponent,
    ItemsComponent,
    ItemDetailsComponent,
    SliceIntoGroupsPipe,
    CategoryListComponent,
    BuyComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AngularEditorModule,
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
