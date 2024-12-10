import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'

})
export class SignUpComponent {
  constructor(public authService: AuthService, private router: Router) {}

  onSignUp(signUpForm: NgForm) {
    if (signUpForm.invalid) return;

    const { email, password, role, userName } = signUpForm.value;
    this.authService.signUp(email, password, role, userName)
      .then(() => {
        this.router.navigate(['verifyE']);
      })
      .catch((error) => {
        console.error('Error during sign-up:', error);
      });
  }
}

