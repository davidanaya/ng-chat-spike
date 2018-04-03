import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    pathMatch: "full",
    redirectTo: "chat"
  },
  {
    path: "chat",
    loadChildren: "./chat/chat.module#ChatModule"
  },
  {
    path: "landing",
    loadChildren: "./landing/landing.module#LandingModule"
  },
  {
    path: "**",
    redirectTo: "chat"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
