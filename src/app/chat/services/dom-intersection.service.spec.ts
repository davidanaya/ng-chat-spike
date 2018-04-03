import { TestBed, inject } from "@angular/core/testing";

import { DomIntersectionService } from "./dom-intersection.service";

describe("DomIntersectionService", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DomIntersectionService]
    });
  });

  it(
    "should be created",
    inject([DomIntersectionService], (service: DomIntersectionService) => {
      expect(service).toBeTruthy();
    })
  );
});
