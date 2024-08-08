import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';

interface Review {
  username: string;
  wineName: string;
  review: string;
  rating: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  reviews: Review[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.fetchReviews();
  }

  fetchReviews(): void {
    const storedReviews: Review[] = JSON.parse(localStorage.getItem('reviews') || '[]');
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.reviews = storedReviews.filter((review: Review) => review.username === parsedUser.username);
    }
  }
}
