import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

interface Review {
  username: string;
  wineName: string;
  review: string;
  rating: number;
}

@Component({
  selector: 'app-form',
  standalone: true,
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
  imports: [ReactiveFormsModule, CommonModule]
})
export class FormComponent implements OnInit {
  reviewForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.reviewForm = this.fb.group({
      wineName: ['', Validators.required],
      review: ['', Validators.required],
      rating: ['', [Validators.required, Validators.min(1), Validators.max(5)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    this.formSubmitted = true;
    if (this.reviewForm.valid) {
      const user = localStorage.getItem('user');
      if (user) {
        const parsedUser = JSON.parse(user);
        const reviews: Review[] = JSON.parse(localStorage.getItem('reviews') || '[]');
        reviews.push({
          username: parsedUser.username,
          wineName: this.reviewForm.value.wineName,
          review: this.reviewForm.value.review,
          rating: this.reviewForm.value.rating
        });
        localStorage.setItem('reviews', JSON.stringify(reviews));
        alert('Review submitted successfully!');
        this.reviewForm.reset();
        this.formSubmitted = false;
        this.router.navigate(['/profile']); // Redirect to profile after successful submission
      } else {
        alert('User not logged in');
        this.router.navigate(['/login']);
      }
    }
  }
}
