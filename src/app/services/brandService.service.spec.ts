/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BrandServiceService } from './brandService.service';

describe('Service: BrandService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BrandServiceService]
    });
  });

  it('should ...', inject([BrandServiceService], (service: BrandServiceService) => {
    expect(service).toBeTruthy();
  }));
});
