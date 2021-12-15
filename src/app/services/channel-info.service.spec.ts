import { TestBed } from '@angular/core/testing';

import { ChannelInfoService } from './channel-info.service';

describe('ChannelInfoService', () => {
  let service: ChannelInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChannelInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
