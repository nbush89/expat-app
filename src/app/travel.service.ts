import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TravelService {
  apiKey: string = "pijdd4yhi5g4cz";
  API_KEY: string = "21fd5ac3710ae23f3172c9ff88d289bd";
  favorites: any[] = [];
  favPlacesList: any[] = [];
  cityInfo: any[] = [];

  constructor(private http: HttpClient) {}
  getPopularCities() {
    return this.http.get(
      "https://www.numbeo.com/api/rankings_by_city_current?section=12",
      {
        params: { api_key: this.apiKey }
      }
    );
  }

  getCityInfo() {
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

  getFavorites() {
    return this.favorites;
  }

  setFavoritePlaces(favorites: any[]) {
    this.favorites = favorites;
  }

  setFavIds(ids: any[]) {
    this.favPlacesList = ids;
  }

  getFavIds() {
    return this.favPlacesList;
  }

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

  getPollution() {
    return this.http.get(
      "https://www.numbeo.com/api/rankings_by_city_current?section=8",
      {
        params: { api_key: this.apiKey }
      }
    );
  }

  getWeather(location: any) {
    return this.http.get("https://api.openweathermap.org/data/2.5/weather?", {
      params: {
        q: `${location.city}, ${location.country}`,
        appid: this.API_KEY,
        units: "imperial"
      }
    });
  }
}
