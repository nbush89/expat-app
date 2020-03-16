import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TravelService {
  apiKey: string = "pijdd4yhi5g4cz";

  constructor(private http: HttpClient) {}
  getPopularCities() {
    return this.http.get(
      "https://www.numbeo.com/api/rankings_by_city_current?section=12",
      {
        params: { api_key: this.apiKey }
      }
    );
  }
}
