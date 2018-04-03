import { Injectable } from "@angular/core";

import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

const NUMBER_OF_MESSAGES_TO_LOAD = 10;

export interface IChatMessage {
  timestamp?: number;
  text: string;
  topic: string;
}

@Injectable()
export class ChatService {
  messagesLoaded$: Subject<IChatMessage[]> = new Subject<IChatMessage[]>();

  private messages: IChatMessage[] = [];

  constructor() {}

  addMessage(message: IChatMessage) {
    this.messages.push(message);
    this.messagesLoaded$.next(this.messages);
  }

  loadMessages(messages: IChatMessage[]) {
    this.messages = [...messages, ...this.messages];
    this.messagesLoaded$.next(this.messages);
  }
}
