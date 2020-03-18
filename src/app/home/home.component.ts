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
  costOfLiving: any = [];
  showWeatherIndex: number;
  showMoneyFilter: boolean = false;
  showWeatherFilter: boolean = false;
  showPopulationFilter: boolean = false;
  moneyRange: number;
  markers: any[] = [];
  data: any;
  constructor(
    private service: TravelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.getPopularCities().subscribe(response => {
      this.popularCities = response;

      for (let i = 0; i < 10; i++) {
        // let location: any;
        this.service
          .getLatLon({
            city: this.popularCities[i].city_name,
            country: this.popularCities[i].country
          })
          .subscribe(response => {
            let location: any = response;

            let marker: any = {};

            marker.position = new google.maps.LatLng({
              lat: Number(location.results[0].geometry.location.lat),
              lng: Number(location.results[0].geometry.location.lng)
            });

            this.markers.push(marker);
          });
      }
    });
    this.getCostOfLiving();
  }
  getCostOfLiving() {
    this.service.getCostOfLiving().subscribe(response => {
      this.costOfLiving = response;
      console.log(response);
    });
  }

  toggleMoneyFilter() {
    this.showMoneyFilter = !this.showMoneyFilter;
  }

  toggleWeatherFilter() {
    this.showWeatherFilter = !this.showWeatherFilter;
  }

  togglePopulationFilter() {
    this.showPopulationFilter = !this.showPopulationFilter;
  }

  setMoneyRange(price: number) {
    this.moneyRange = price;
    console.log(this.moneyRange);
    if (this.moneyRange == 25) {
      let filteredArray = this.costOfLiving.filter(cpi => {
        return cpi.cpi_index > 0 && cpi.cpi_index <= 25;
      });
      console.log(filteredArray);
    }
  }

  getWeather(city: string) {
    this.route.queryParams.subscribe(queryParams => {
      this.service.getWeather(queryParams.city).subscribe(data => {
        this.data = data;
      });
    });
  }

  // toggleDisplay() {
  //   this.showCostIndex = null;
  // }
}
