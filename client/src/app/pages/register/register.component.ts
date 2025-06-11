import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [CommonModule, ReactiveFormsModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  isLoading = false;

  registerForm;

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    const { name, email, password } = this.registerForm.value;
    this.authService
      .register({
        name: name ?? '',
        email: email ?? '',
        password: password ?? '',
      })
      .subscribe({
        next: () => {
          this.isLoading = false;
          this.successMessage = 'สมัครสมาชิกสำเร็จ!';
        },
        error: () => {
          this.isLoading = false;
          this.errorMessage = 'เกิดข้อผิดพลาด';
        },
      });
  }
  errorMessage = '';
  clearError() {
    this.errorMessage = '';
  }

  successMessage = '';
  clearSuccess() {
    this.successMessage = '';
  }
}
