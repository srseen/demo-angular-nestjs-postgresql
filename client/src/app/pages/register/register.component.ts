import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  isLoading = false;
  errorMessage: string = '';
  successMessage: string = '';
  showPassword = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.registerForm.invalid) return;

    this.isLoading = true;
    this.errorMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        this.isLoading = false;
        // เปลี่ยน route ไปหน้า verify หรือ login
      },
      error: (err) => {
        this.errorMessage = err.error?.message || 'เกิดข้อผิดพลาด';
        this.isLoading = false;
      },
    });
  }

  clearError() {
    this.errorMessage = '';
  }

  clearSuccess() {
    this.successMessage = '';
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
