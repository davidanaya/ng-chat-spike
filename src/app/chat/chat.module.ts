import { NgModule } from "@angular/core";
import { CommonModule, DatePipe } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";

import { MatButtonModule, MatListModule, MatCardModule, MatToolbarModule } from "@angular/material";

import { ChatRoutingModule } from "./chat-routing.module";

import { ChatDashboardComponent } from "./containers/chat-dashboard/chat-dashboard.component";
import { ChatComponent } from "./containers/chat/chat.component";
import { ChatMessageComponent } from "./components/chat-message/chat-message.component";

// services
import { ChatService } from "./services/chat.service";
import { DomIntersectionService } from "./services/dom-intersection.service";
import { DomTopicIntersectionService } from "./services/dom-topic-intersection.service";
import { TestService } from "./services/test.service";

const materialImports = [MatButtonModule, MatListModule, MatCardModule, MatToolbarModule];

@NgModule({
  imports: [CommonModule, HttpClientModule, ChatRoutingModule, ...materialImports],
  providers: [
    DatePipe,
    ChatService,
    DomIntersectionService,
    DomTopicIntersectionService,
    { provide: "testService", useFactory: () => () => new TestService() }
  ],
  declarations: [ChatDashboardComponent, ChatComponent, ChatMessageComponent]
})
export class ChatModule {}
