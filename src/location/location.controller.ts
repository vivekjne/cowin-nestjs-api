import { Controller, Get } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/states')
  getLocationByStates() {
    return this.locationService.getStates();
  }
}
