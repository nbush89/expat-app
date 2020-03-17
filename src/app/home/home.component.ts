import { Component, OnInit } from "@angular/core";
import { TravelService } from "../travel.service";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  popularCities: any = [];
  showWeatherIndex: number;
  constructor(
    private service: TravelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.getPopularCities().subscribe(response => {
      this.popularCities = response;
  
    });
    this.getCities();
  }
  getCostOfLiving() {
    this.service.getCostOfLiving().subscribe(response => {
      console.log(response);
    });
  }
  showWeatherFilter(index: number) {
    this.showWeatherIndex = index;
  }
  getCities() {
    this.service.getCities().subscribe(response => {
      console.log(response);
    });
  }
}
