import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { CityInfoComponent } from "./city-info/city-info.component";
import { SearchComponent } from "./search/search.component";
import { FavoriteCitiesComponent } from "./favorite-cities/favorite-cities.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "home", component: HomeComponent, data: {animation:"Home"} },
  { path: "favorite-cities", component: FavoriteCitiesComponent },
  { path: "search", component: SearchComponent },
  { path: "city-info", component: CityInfoComponent, data:{animation:"City-Info"} },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
