import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  formSubmitted: boolean = false;
  loading: boolean = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.formSubmitted = true;
    this.loading = true;
    this.errorMessage = '';

    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value.username, this.registerForm.value.email, this.registerForm.value.password).subscribe(
        success => {
          this.loading = false;
          if (success) {
            this.router.navigate(['/login']);
          } else {
            this.errorMessage = 'Registration failed';
          }
        },
        error => {
          this.loading = false;
          this.errorMessage = 'Registration failed';
        }
      );
    } else {
      this.loading = false;
    }
  }
}
