import { Component, OnInit, ViewChild } from "@angular/core";
import { TravelService } from "../travel.service";
import { Router, ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { MapInfoWindow, MapMarker, GoogleMap } from "@angular/google-maps";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  cityInfo: any = {};
  infoContent: any;
  allCities: any = [];
  popularCities: any = [];
  costOfLiving: any = [];
  pollution: any = [];
  combinedFilteredArray: any;
  showWeatherIndex: number;
  showMoneyFilter: boolean = false;
  showPollutionFilter: boolean = false;
  showClimateFilter: boolean = false;
  moneyRange: number;
  pollutionRange: number;
  climateRange: number;
  options: google.maps.MapOptions;
  markers: any[] = [];
  data: any;
  zoom: number = 2;
  center: any;

  constructor(
    private service: TravelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.getPopularCities().subscribe(response => {
      console.log(response);
      this.popularCities = response;
      let topTen: any = [];
      for (let i = 0; i < 10; i++) {
        topTen.push(this.popularCities[i]);
      }
      this.setMarkers(topTen);
    });
    this.service.getCities().subscribe(response => {
      let cities: any = response;
      this.allCities = cities.cities;
    });
  }
  openInfo(marker: MapMarker, content) {
    this.infoWindow.open(marker);
    this.infoContent = content;
  }
  dblClick(marker: MapMarker, content, position) {
    this.infoWindow.open(marker);
    this.infoContent = content;
    this.zoom = 12;
    this.center = position;
  }
  ngAfterViewInit() {
    this.options = {
      styles: [
        {
          elementType: "geometry",
          stylers: [
            {
              color: "#1d2c4d"
            }
          ]
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#8ec3b9"
            }
          ]
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1a3646"
            }
          ]
        },
        {
          featureType: "administrative.country",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#4b6878"
            }
          ]
        },
        {
          featureType: "administrative.land_parcel",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#64779e"
            }
          ]
        },
        {
          featureType: "administrative.province",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#4b6878"
            }
          ]
        },
        {
          featureType: "landscape.man_made",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#334e87"
            }
          ]
        },
        {
          featureType: "landscape.natural",
          elementType: "geometry",
          stylers: [
            {
              color: "#023e58"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#283d6a"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#6f9ba5"
            }
          ]
        },
        {
          featureType: "poi",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#023e58"
            }
          ]
        },
        {
          featureType: "poi.park",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#3C7680"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "geometry",
          stylers: [
            {
              color: "#304a7d"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#98a5be"
            }
          ]
        },
        {
          featureType: "road",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry",
          stylers: [
            {
              color: "#2c6675"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#255763"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#b0d5ce"
            }
          ]
        },
        {
          featureType: "road.highway",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#023e58"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#98a5be"
            }
          ]
        },
        {
          featureType: "transit",
          elementType: "labels.text.stroke",
          stylers: [
            {
              color: "#1d2c4d"
            }
          ]
        },
        {
          featureType: "transit.line",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#283d6a"
            }
          ]
        },
        {
          featureType: "transit.station",
          elementType: "geometry",
          stylers: [
            {
              color: "#3a4762"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#0e1626"
            }
          ]
        },
        {
          featureType: "water",
          elementType: "labels.text.fill",
          stylers: [
            {
              color: "#4e6d70"
            }
          ]
        }
      ]
    };
  }
  findCity(form: NgForm) {
    let tempArray = [];
    let foundCity = this.popularCities.find(place => {
      return (
        place.city_name == form.value.city &&
        place.country == form.value.country
      );
    });
    let cityLocation = this.allCities.find(place => {
      return place.city_id == foundCity.city_id;
    });
    this.center = new google.maps.LatLng({
      lat: Number(cityLocation.latitude),
      lng: Number(cityLocation.longitude)
    });
    tempArray.push(foundCity);
    this.setMarkers(tempArray);
    this.zoom = 12;
  }
  toggleMoneyFilter() {
    this.showMoneyFilter = !this.showMoneyFilter;
  }
  togglePollutionFilter() {
    this.showPollutionFilter = !this.showPollutionFilter;
  }
  toggleClimateFilter() {
    this.showClimateFilter = !this.showClimateFilter;
  }
  setMoneyRange(price: number) {
    this.moneyRange = price;
  }
  addMoneyFilter() {
    let array: any = [];
    if (!this.combinedFilteredArray) {
      array = this.popularCities;
    } else {
      array = this.combinedFilteredArray;
    }
    if (this.moneyRange == 25) {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 0 && cpi.cpi_index <= 25;
      });
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.moneyRange == 50) {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 25 && cpi.cpi_index <= 50;
      });
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.moneyRange == 75) {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 50 && cpi.cpi_index <= 75;
      });
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else {
      let filteredArray = array.filter(cpi => {
        return cpi.cpi_index > 75 && cpi.cpi_index <= 130;
      });
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    }
  }
  setPollutionRange(pollution: number) {
    this.pollutionRange = pollution;
  }
  addPollutionFilter() {
    let array: any = [];
    if (!this.combinedFilteredArray) {
      array = this.popularCities;
    } else {
      array = this.combinedFilteredArray;
    }
    if (this.pollutionRange == 33) {
      let filteredArray = array.filter(object => {
        return object.pollution_index <= 33;
      });
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.pollutionRange == 66) {
      let filteredArray = array.filter(object => {
        return object.pollution_index > 33 && object.pollution_index <= 66;
      });
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else {
      let filteredArray = array.filter(object => {
        return object.pollution_index > 66;
      });
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    }
  }
  setClimateRange(climate: number) {
    this.climateRange = climate;
  }
  addClimateFilter() {
    let array: any = [];
    if (!this.combinedFilteredArray) {
      array = this.popularCities;
    } else {
      array = this.combinedFilteredArray;
    }
    if (this.climateRange == 33) {
      let filteredArray = array.filter(object => {
        return object.climate_index <= 33;
      });
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else if (this.climateRange == 66) {
      let filteredArray = array.filter(object => {
        return object.climate_index > 33 && object.climate_index <= 66;
      });
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    } else {
      let filteredArray = array.filter(object => {
        return object.climate_index > 66;
      });
      this.combinedFilteredArray = filteredArray;
      this.setMarkers(this.combinedFilteredArray);
    }
  }
  setMarkers(array: any[]) {
    this.markers = [];
    array.forEach((object, index) => {
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
          this.setMarkerColor(object, marker);
          let cityRank = this.popularCities.findIndex(city => {
            return object.city_id == city.city_id;
          });
          marker.info = {
            city: object.city_name,
            country: object.country,
            rank: cityRank + 1,
            qol: Number.parseFloat(object.quality_of_life_index).toFixed(2),
            city_id: object.city_id
          };
          this.markers.push(marker);
        });
    });
    this.zoom = 2;
  }
  moreInfo() {
    let city = this.popularCities.find(city => {
      return city.city_id == this.infoContent.city_id;
    });
    this.service.setCurrentCity(city);
    console.log(city);
    this.router.navigate(["city-info"]);
  }
  toggleMoneyButton() {
    this.showMoneyFilter = !this.showMoneyFilter;
  }
  togglePollutionButton() {
    this.showPollutionFilter = !this.showPollutionFilter;
  }
  toggleClimateButton() {
    this.showClimateFilter = !this.showClimateFilter;
  }
  setMarkerColor(object: any, marker: any) {
    if (
      object.quality_of_life_index >= 0 &&
      object.quality_of_life_index <= 60
    ) {
      marker.icon = "http://maps.google.com/mapfiles/ms/micons/red-dot.png";
    } else if (
      object.quality_of_life_index > 60 &&
      object.quality_of_life_index <= 120
    ) {
      marker.icon = "http://maps.google.com/mapfiles/ms/micons/orange-dot.png";
    } else if (
      object.quality_of_life_index > 120 &&
      object.quality_of_life_index <= 180
    ) {
      marker.icon = "http://maps.google.com/mapfiles/ms/micons/yellow-dot.png";
    } else {
      marker.icon = "http://maps.google.com/mapfiles/ms/micons/green-dot.png";
    }
  }
}
