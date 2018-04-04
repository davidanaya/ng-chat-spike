import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { MatToolbarModule } from "@angular/material";

import { AppRoutingModule } from "./app-routing.module";
import { ChatModule } from "./chat/chat.module";

import { AppComponent } from "./app.component";

const imports = [AppRoutingModule, ChatModule];

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, MatToolbarModule, ...imports],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
