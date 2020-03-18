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
  combinedFilteredArray: any;
  showWeatherIndex: number;
  showMoneyFilter: boolean = false;
  showWeatherFilter: boolean = false;
  showPopulationFilter: boolean = false;
  moneyRange: number;
  weatherRange: number;
  popRange: number;
  markers: any[] = [];
  data: any;
  zoom: number = 2;
  constructor(
    private service: TravelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.getPopularCities().subscribe(response => {
      this.popularCities = response;
      for (let i = 0; i < 10; i++) {
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
      // this.costOfLiving.forEach(object => {
      //   let location: any = {};
      //   location.city = object.city_name;
      //   location.country = object.country;
      //   this.service.getWeather(location).subscribe(response => {
      //     let temp: any = response;
      //     object.temperature = temp.main.temp;
      //   });
      // });
      console.log(this.costOfLiving);
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
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.moneyRange == 50) {
      let filteredArray = this.costOfLiving.filter(cpi => {
        return cpi.cpi_index > 25 && cpi.cpi_index <= 50;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.moneyRange == 75) {
      let filteredArray = this.costOfLiving.filter(cpi => {
        return cpi.cpi_index > 50 && cpi.cpi_index <= 75;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.moneyRange == 100) {
      let filteredArray = this.costOfLiving.filter(cpi => {
        return cpi.cpi_index > 75 && cpi.cpi_index <= 100;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else {
      let filteredArray = this.costOfLiving.filter(cpi => {
        return cpi.cpi_index > 100 && cpi.cpi_index <= 130;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    }
  }
  setWeatherRange(temp: number) {
    this.weatherRange = temp;
    console.log(this.weatherRange);
    this.combinedFilteredArray.forEach(object => {
      let location: any = {};
      location.city = object.city_name;
      location.country = object.country;
      this.service.getWeather(location).subscribe(response => {
        let temp: any = response;
        object.temperature = temp.main.temp;
      });
    });
    console.log(this.combinedFilteredArray);
    if (this.weatherRange == 45) {
      let filteredArray = this.combinedFilteredArray.filter(object => {
        return object.temperature <= 45;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    }
  }

  getWeather(city: string) {
    this.route.queryParams.subscribe(queryParams => {
      this.service.getWeather(queryParams.city).subscribe(data => {
        this.data = data;
      });
    });
  }
  setMarkers(array: any[]) {
    this.markers = [];
    array.forEach(object => {
      this.service
        .getLatLon({
          city: object.city_name,
          country: object.country
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
    });
  }

  // toggleDisplay() {
  //   this.showCostIndex = null;
  // }
}
