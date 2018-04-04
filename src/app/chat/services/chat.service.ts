import { Injectable } from "@angular/core";

import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

export interface IChatMessage {
  timestamp?: number;
  text: string;
  topic: string;
}

@Injectable()
export class ChatService {
  messagesLoaded$: Subject<IChatMessage[]> = new BehaviorSubject<IChatMessage[]>([]);

  private messages: IChatMessage[] = [];

  addMessage(message: IChatMessage) {
    this.messages.push(message);
    this.messagesLoaded$.next(this.messages);
  }

  addMessages(messages: IChatMessage[]) {
    this.messages = [...messages, ...this.messages];
    this.messagesLoaded$.next(this.messages);
  }
}
