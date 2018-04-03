import { Injectable, Inject } from "@angular/core";
import { ChatComponent } from "../containers/chat/chat.component";

@Injectable()
export class DomIntersectionService {
  private observer: IntersectionObserver;
  private elementsIntersecting = 0;

  private chat: ChatComponent;

  constructor(@Inject("testService") private testService) {
    console.log("DomIntersectionService", testService());
  }

  restart(root: Element, targets: Element[], chat?: ChatComponent) {
    this.stop();
    this.start(root, targets, chat);
  }

  start(root: Element, targets: Element[], chat?: ChatComponent) {
    const options = {
      root,
      rootMargin: "0px",
      threshold: 1.0
    };

    this.chat = chat;

    this.observer = new IntersectionObserver(this.handleIntersect.bind(this), options);
    targets.forEach(target => this.addTarget(target));
  }

  addTarget(target: Element) {
    this.observer.observe(target);
  }

  stop() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private handleIntersect(entries: IntersectionObserverEntry[], observer: IntersectionObserver) {
    const entriesIn = entries.filter(entry => entry.intersectionRatio === 1);
    const entriesOut = entries.filter(entry => entry.intersectionRatio !== 1);

    // const entriesIn = entries.filter(entry => entry.isIntersecting);
    // const entriesOut = entries.filter(entry => !entry.isIntersecting);

    // this.logEntries(entriesIn, "IN");
    // this.logEntries(entriesOut, "OUT");

    this.updateElementsIntersecting(entries);

    if (this.isFirstMessageIn(entriesIn) && entriesIn.length > 1) {
      console.log("**** HAS TO LOAD MORE DATA! ****");
      if (this.chat) {
        // this.chat.loadMoreMessages();
      }
    }
  }

  private updateElementsIntersecting(entries: IntersectionObserverEntry[]) {
    this.elementsIntersecting = entries.reduce(
      (a, b) => a + (b.intersectionRatio === 1 ? 1 : -1),
      this.elementsIntersecting
    );
    console.log("elementsIntersecting", this.elementsIntersecting);
  }

  private isFirstMessageIn(entries: IntersectionObserverEntry[]): boolean {
    return !!entries.find(entry => entry.target.classList.contains("first"));
  }

  private logEntries(entries: IntersectionObserverEntry[], label: string) {
    if (!entries || !entries.length) {
      return;
    }
    console.group(label);
    entries.forEach(entry => console.log(entry.target, entry));
    console.groupEnd();
  }
}
