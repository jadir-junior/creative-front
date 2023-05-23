import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CreativeConfigService {
  zIndex = {
    modal: 1100,
    overlay: 1000,
    menu: 1000,
    tooltip: 1100,
  };

  constructor() {}
}
