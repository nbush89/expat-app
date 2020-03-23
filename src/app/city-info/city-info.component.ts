import { Component, OnInit } from "@angular/core";
import { TravelService } from "../travel.service";

@Component({
  selector: "app-city-info",
  templateUrl: "./city-info.component.html",
  styleUrls: ["./city-info.component.css"]
})
export class CityInfoComponent implements OnInit {
  cityInfo: any = [];
  constructor(private service: TravelService) {}

  ngOnInit(): void {
    this.service.getPopularCities().subscribe(response => {
      this.cityInfo = response;
    });
  }
}
