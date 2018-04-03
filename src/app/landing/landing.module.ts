import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { LandingRoutingModule } from "./landing-routing.module";

import { LandingComponent } from "./components/landing/landing.component";

@NgModule({
  imports: [CommonModule, LandingRoutingModule],
  declarations: [LandingComponent]
})
export class LandingModule {}
