import {
  Component,
  OnInit,
  Input,
  ViewChildren,
  AfterViewInit,
  QueryList,
  ElementRef,
  OnDestroy,
  EventEmitter,
  Output
} from "@angular/core";

import { Subscription } from "rxjs/Subscription";

import { IChatMessage } from "../../services/chat.service";
import { ChatMessageComponent } from "../../components/chat-message/chat-message.component";
import { DomIntersectionService } from "../../services/dom-intersection.service";
import { DomTopicIntersectionService } from "../../services/dom-topic-intersection.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.scss"]
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() messages: IChatMessage[];
  @Output() load: EventEmitter<any> = new EventEmitter();

  @ViewChildren(ChatMessageComponent, { read: ElementRef })
  messageElements;

  @ViewChildren("topic") topicElements;

  private subscription: Subscription;
  private numberOfMessagesInView = 0;
  private numberOfTopicsInView = 0;

  constructor(
    private elementRef: ElementRef,
    private domIntersectionService: DomIntersectionService,
    private domTopicIntersectionService: DomTopicIntersectionService
  ) {}

  ngOnInit() {}

  ngOnDestroy() {
    this.domIntersectionService.stop();
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    this.subscribeToDomIntersection();
    this.subscribeToDomTopicIntersection();
  }

  loadMoreMessages() {
    console.log("emit loadMoreMessages");
    this.load.emit();
  }

  private subscribeToDomTopicIntersection() {
    this.domTopicIntersectionService.start(this.elementRef.nativeElement, []);

    this.subscription = this.topicElements.changes.subscribe((list: QueryList<ElementRef>) => {
      this.numberOfTopicsInView = list.length;

      list
        .toArray()
        .slice(-this.numberOfTopicsInView)
        .map(er => er.nativeElement)
        .forEach(el => this.domTopicIntersectionService.addTarget(el));
    });
  }

  private subscribeToDomIntersection() {
    this.domIntersectionService.start(this.elementRef.nativeElement, [], this);

    this.subscription = this.messageElements.changes.subscribe((list: QueryList<ElementRef>) => {
      this.numberOfMessagesInView = list.length;

      list
        .toArray()
        .slice(-this.numberOfMessagesInView)
        .map(er => er.nativeElement)
        .forEach(el => this.domIntersectionService.addTarget(el));

      //this.scrollIntoView(list.last);
    });
  }

  private scrollIntoView(element: ElementRef) {
    if (element) {
      element.nativeElement.scrollIntoView();
    }
  }
}
