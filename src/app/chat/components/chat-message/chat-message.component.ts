import { Component, OnInit, Input } from "@angular/core";
import { IChatMessage } from "../../services/chat.service";

@Component({
  selector: "app-chat-message",
  templateUrl: "./chat-message.component.html",
  styleUrls: ["./chat-message.component.scss"]
})
export class ChatMessageComponent implements OnInit {
  @Input() message: IChatMessage;

  constructor() {}

  ngOnInit() {}
}
