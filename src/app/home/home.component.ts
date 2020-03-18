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
  markers: any[] = [];
  constructor(
    private service: TravelService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.service.getPopularCities().subscribe(response => {
      this.popularCities = response;
      console.log(response[0]);
      for (let i = 0; i < 10; i++) {
        // let location: any;
        this.service
          .getLatLon({
            city: this.popularCities[i].city_name,
            country: this.popularCities[i].country
          })
          .subscribe(response => {
            let location: any = response;
            console.log(response);
            let marker: any = {};
            console.log(location.results[0].geometry.location.lat);
            console.log(location.results[0].geometry.location.lng);
            marker.position = new google.maps.LatLng({
              lat: Number(location.results[0].geometry.location.lat),
              lng: Number(location.results[0].geometry.location.lng)
            });
            console.log(marker);
            this.markers.push(marker);
          });
      }
    });
  }
  getCostOfLiving() {
    this.service.getCostOfLiving().subscribe(response => {
      console.log(response);
    });
  }
  showWeatherFilter(index: number) {
    this.showWeatherIndex = index;
  }
  // getLatLon(location: any) {
  //   this.service.getLatLon(location).subscribe(response => {
  //     return response;
  //   });
  // }
}
