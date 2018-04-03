import { Injectable } from "@angular/core";

@Injectable()
export class TestService {
  private now = Date.now();
  constructor() {}
}
