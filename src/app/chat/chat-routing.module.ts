import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { ChatDashboardComponent } from "./containers/chat-dashboard/chat-dashboard.component";

const routes: Routes = [{ path: "", component: ChatDashboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule {}
