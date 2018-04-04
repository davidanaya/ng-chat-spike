import { Component, OnInit, OnDestroy } from "@angular/core";

import { Observable } from "rxjs/Observable";
import { tap } from "rxjs/operators";

import { ChatService, IChatMessage } from "../../services/chat.service";

@Component({
  selector: "app-chat-dashboard",
  templateUrl: "./chat-dashboard.component.html",
  styleUrls: ["./chat-dashboard.component.scss"]
})
export class ChatDashboardComponent implements OnInit {
  messages$ = this.chatService.messagesLoaded$;

  topic = "welcome";

  private defaultMessage: IChatMessage = {
    text: "message",
    topic: this.topic
  };

  constructor(private chatService: ChatService) {}

  ngOnInit() {
    this.addFakeMessage({ text: "hi there!", topic: this.topic });
  }

  addFakeMessage(message: IChatMessage = this.defaultMessage) {
    this.chatService.addMessage({ ...message, timestamp: Date.now() });
  }

  changeFakeTopic() {
    this.topic = `topic ${Date.now()}`;
    this.defaultMessage.topic = this.topic;
  }

  loadMoreMessages() {
    const messages = [];
    for (let i = 0; i < 5; i++) {
      messages.push({ ...this.defaultMessage, timestamp: Date.now() });
    }
    this.chatService.addMessages(messages);
  }
}
