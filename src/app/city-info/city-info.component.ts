import { Component, OnInit } from "@angular/core";
import { TravelService } from "../travel.service";

@Component({
  selector: "app-city-info",
  templateUrl: "./city-info.component.html",
  styleUrls: ["./city-info.component.css"]
})
export class CityInfoComponent implements OnInit {
  allCities: any = [];
  currentCity: any;
  cityRank: number;
  constructor(private service: TravelService) {}

  ngOnInit(): void {
    this.currentCity = this.service.getCurrentCity();
    this.service.getPopularCities().subscribe(response => {
      this.allCities = response;
      console.log(this.allCities);
      this.allCities.forEach((city, index) => {
        if (city.city_id == this.currentCity.city_id) {
          this.cityRank = index + 1;
        }
      });
      console.log(this.cityRank);
    });
  }
}
