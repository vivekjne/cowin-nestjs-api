import { Controller, Get, Param } from '@nestjs/common';
import { LocationService } from './location.service';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Get('/states')
  getAllStates() {
    return this.locationService.getStates();
  }

  @Get('/states/:stateId/districts')
  getDistrictsByState(@Param('stateId') stateId: string) {
    return this.locationService.getDistrictsByStates(stateId);
  }
}
