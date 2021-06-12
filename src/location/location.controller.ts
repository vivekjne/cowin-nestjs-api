import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocationService } from './location.service';
@ApiTags('locations')
@Controller('api/v1/locations')
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
