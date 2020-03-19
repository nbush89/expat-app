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
  pollution: any = [];
  combinedFilteredArray: any;
  showWeatherIndex: number;
  showMoneyFilter: boolean = false;
  showPollutionFilter: boolean = false;
  showPopulationFilter: boolean = false;
  moneyRange: number;
  pollutionRange: number;
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
    this.getPollution();
  }
  getCostOfLiving() {
    this.service.getCostOfLiving().subscribe(response => {
      this.costOfLiving = response;
      console.log(this.costOfLiving);
    });
  }

  getPollution() {
    this.service.getPollution().subscribe(response => {
      this.pollution = response;
      console.log(this.pollution);
    });
  }

  toggleMoneyFilter() {
    this.showMoneyFilter = !this.showMoneyFilter;
  }

  togglePollutionFilter() {
    this.showPollutionFilter = !this.showPollutionFilter;
  }

  togglePopulationFilter() {
    this.showPopulationFilter = !this.showPopulationFilter;
  }

  setMoneyRange(price: number) {
    this.moneyRange = price;
    console.log(this.moneyRange);
    let array: any = [];
    if (!this.combinedFilteredArray) {
      array = this.costOfLiving;
    } else {
      array = this.combinedFilteredArray;
    }
    console.log(array);

    if (this.moneyRange == 25) {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 0 && cpi.cpi_index <= 25;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.moneyRange == 50) {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 25 && cpi.cpi_index <= 50;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.moneyRange == 75) {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 50 && cpi.cpi_index <= 75;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.moneyRange == 100) {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 75 && cpi.cpi_index <= 100;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 100 && cpi.cpi_index <= 130;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    }
  }

  setPollutionRange(pollution: number) {
    this.pollutionRange = pollution;
    console.log(this.pollutionRange);
    let array: any = [];
    if (!this.combinedFilteredArray) {
      array = this.pollution;
    } else {
      array = this.combinedFilteredArray;
    }
    console.log(array);

    if (this.pollutionRange == 33) {
      let filteredArray = array.filter(object => {
        return object.pollution_index <= 33;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.pollutionRange == 50) {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 25 && cpi.cpi_index <= 50;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.pollutionRange == 75) {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 50 && cpi.cpi_index <= 75;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.pollutionRange == 100) {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 75 && cpi.cpi_index <= 100;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 100 && cpi.cpi_index <= 130;
      });
      console.log(filteredArray);
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    }
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
}
