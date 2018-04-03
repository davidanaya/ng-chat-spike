import { Component, OnInit, OnDestroy } from "@angular/core";

import { Observable } from "rxjs/Observable";

import { ChatService, IChatMessage } from "../../services/chat.service";
import { DomTopicIntersectionService } from "../../services/dom-topic-intersection.service";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-chat-dashboard",
  templateUrl: "./chat-dashboard.component.html",
  styleUrls: ["./chat-dashboard.component.scss"]
})
export class ChatDashboardComponent implements OnInit {
  messages$: Observable<IChatMessage[]> = this.chatService.messagesLoaded$;

  topic = "welcome";
  navigationTopic$ = this.domTopicIntersectionService.topicInView$;

  private subscription: Subscription;

  private defaultMessage: IChatMessage = {
    text: "message",
    topic: this.topic
  };

  constructor(
    private chatService: ChatService,
    private domTopicIntersectionService: DomTopicIntersectionService
  ) {}

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
    this.chatService.loadMessages(messages);
  }
}
