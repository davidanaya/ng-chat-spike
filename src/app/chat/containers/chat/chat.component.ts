import { Component, Input, OnInit } from "@angular/core";
import { IChatMessage } from "../../services/chat.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit {
  @Input() messages: IChatMessage[];

  ngOnInit() {}
}
