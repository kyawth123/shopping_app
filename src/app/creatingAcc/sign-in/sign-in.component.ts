import { Component, ViewChild } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  constructor(public authService: AuthService, private router: Router) {}

  onSubmit(signInForm: NgForm) {
    if (signInForm.invalid) return;

    const { email, password } = signInForm.value;
    this.authService.login(email, password)
      .then(() => {
        this.authService.getUserRole().subscribe((role) => {
          if (role === 'admin') {
            this.router.navigate(['display']);
          } else if (role === 'user') {
            this.router.navigate(['items']);
          } else {
            console.error('Failed to retrieve user role.');
          }
        });
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      });
  }
}

