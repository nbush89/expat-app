import { Component, OnInit } from '@angular/core';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-favorite-cities',
  templateUrl: './favorite-cities.component.html',
  styleUrls: ['./favorite-cities.component.css']
})
export class FavoriteCitiesComponent implements OnInit {
  favorites: any[] = [];
  placesFavoriteIds: any[] = [];
  constructor(private service: TravelService) { }

  ngOnInit(): void {
    this.favorites = this.service.getFavorites();
    this.placesFavoriteIds = this.service.getFavIds();
  }

}
