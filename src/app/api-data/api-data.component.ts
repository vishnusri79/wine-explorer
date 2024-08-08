import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WineService } from '../wine.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-api-data',
  standalone: true,
  templateUrl: './api-data.component.html',
  styleUrls: ['./api-data.component.css'],
  imports: [CommonModule, HttpClientModule],
  providers: [WineService]
})
export class ApiDataComponent implements OnInit {
  redWines: any[] = [];
  whiteWines: any[] = [];
  sparklingWines: any[] = [];
  roseWines: any[] = [];
  portWines: any[] = [];
  selectedCategory: string = 'red';

  constructor(private wineService: WineService) {}

  ngOnInit(): void {
    this.fetchRedWines();
  }

  fetchRedWines(): void {
    this.wineService.getRedWines().subscribe(
      (data) => {
        this.redWines = data;
        this.selectedCategory = 'red';
      },
      (error) => {
        console.error('Error fetching red wines:', error);
      }
    );
  }

  fetchWhiteWines(): void {
    this.wineService.getWhiteWines().subscribe(
      (data) => {
        this.whiteWines = data;
        this.selectedCategory = 'white';
      },
      (error) => {
        console.error('Error fetching white wines:', error);
      }
    );
  }

  fetchSparklingWines(): void {
    this.wineService.getSparklingWines().subscribe(
      (data) => {
        this.sparklingWines = data;
        this.selectedCategory = 'sparkling';
      },
      (error) => {
        console.error('Error fetching sparkling wines:', error);
      }
    );
  }

  fetchRoseWines(): void {
    this.wineService.getRoseWines().subscribe(
      (data) => {
        this.roseWines = data;
        this.selectedCategory = 'rose';
      },
      (error) => {
        console.error('Error fetching rose wines:', error);
      }
    );
  }

  fetchPortWines(): void {
    this.wineService.getPortWines().subscribe(
      (data) => {
        this.portWines = data;
        this.selectedCategory = 'port';
      },
      (error) => {
        console.error('Error fetching port wines:', error);
      }
    );
  }
}
