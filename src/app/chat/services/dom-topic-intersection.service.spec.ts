import { TestBed, inject } from "@angular/core/testing";

import { DomTopicIntersectionService } from "./dom-topic-intersection.service";

describe("DomTopicIntersectionService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomTopicIntersectionService]
    });
  });

  it(
    "should be created",
    inject([DomTopicIntersectionService], (service: DomTopicIntersectionService) => {
      expect(service).toBeTruthy();
    })
  );
});
