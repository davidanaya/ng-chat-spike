import { Injectable, Inject } from "@angular/core";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class DomTopicIntersectionService {
  topicInView$: Subject<string> = new Subject<string>();

  private observer: IntersectionObserver;
  private elementsIntersecting = 0;

  constructor(@Inject("testService") private testService) {
    console.log("DomTopicIntersectionService", testService());  }

  restart(root: Element, targets: Element[]) {
    this.stop();
    this.start(root, targets);
  }

  start(root: Element, targets: Element[]) {
    const options = {
      root,
      rootMargin: "0px",
      threshold: 1.0
    };

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

    // this.logEntries(entriesIn, "TITLES IN");
    // this.logEntries(entriesOut, "TITLES OUT");

    entriesIn.forEach(entry => {
      const topic = entry.target.textContent;
      this.topicInView$.next(topic);
    });
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
