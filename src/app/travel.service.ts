import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TravelService {
  apiKey: string = "pijdd4yhi5g4cz";
  API_KEY: string = "0aba1dd596b09e7d0fc50914d50dbac1";

  constructor(private http: HttpClient) {}
  getPopularCities() {
    return this.http.get(
      "https://www.numbeo.com/api/rankings_by_city_current?section=12",
      {
        params: { api_key: this.apiKey }
      }
    );
  }
  getCities() {
    return this.http.get("https://www.numbeo.com/api/cities", {
      params: { api_key: this.apiKey }
    });
  }
  // getWeather(){

  // }
  getCostOfLiving() {
    return this.http.get(
      "https://www.numbeo.com/api/rankings_by_city_current?section=1",
      {
        params: { api_key: this.apiKey }
      }
    );
  }
  getLatLon(location: any) {
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json", {
      params: {
        key: "AIzaSyDj4cvTBS38pmt0A7T-ZNrenwm1rerRojI",
        address: `${location.city}, ${location.country}`
      }
    });
  }

  getWeather(city: string="Detroit") {
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?", {
      params: { q: city, appid: this.API_KEY, units: "imperial" }
    });
  }
}
