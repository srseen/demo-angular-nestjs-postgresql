import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isLoading = false;

  loginForm;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;
    const { email, password } = this.loginForm.value;
    this.authService
      .login({
        email: email ?? '',
        password: password ?? '',
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          alert('เข้าสู่ระบบสำเร็จ!');
        },
        error: () => {
          this.isLoading = false;
          alert('เข้าสู่ระบบไม่สำเร็จ');
        },
      });
  }
  errorMessage: string | null = null;
  clearError() {
    this.errorMessage = null;
  }
  successMessage: string | null = null;
  clearSuccess() {
    this.successMessage = null;
  }
}
