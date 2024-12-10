import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { AuthGuard } from './shared/guard/auth.guard';
import { CategoryListComponent } from './userApp/category-list/category-list.component';
import { BuyComponent } from './userApp/buy/buy.component';
import { NavbarComponent } from './userApp/navbar/navbar.component';

const routes: Routes = [
  {path: 'sign-up', component:SignUpComponent },
  {path: 'sign-in', component:SignInComponent },
  {path: 'verifyE', component: VerifyEmailComponent },
  {path: 'forget', component: ForgetPasswordComponent },

  {path: 'category', component: CategoryComponent, canActivate: [AuthGuard], data: {role: 'admin'}},
  {path: 'add', component: AddItemComponent, canActivate: [AuthGuard], data: {role: 'admin'}},
  {path: 'all', component: AllItemComponent, canActivate: [AuthGuard], data: {role: 'admin'}},
  {path: 'display', component:DisplayComponent, canActivate: [AuthGuard], data: {role: 'admin'}},

  {path: 'items', component:ItemsComponent, canActivate: [AuthGuard], data: {role: 'user'}},
  {path: 'item/:id', component: ItemDetailsComponent, canActivate: [AuthGuard], data: {role: 'user'}},
  {path: 'category/:categoryId', component: CategoryListComponent, canActivate: [AuthGuard], data: {role: 'user'}},
  {path: 'buy', component: BuyComponent, canActivate: [AuthGuard], data: {role: 'user'}},
  {path: '', redirectTo: 'sign-in', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
