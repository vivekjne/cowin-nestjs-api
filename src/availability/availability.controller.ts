import { Controller, Get, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Get('centers/latLong')
  findCentersByLocation(
    @Query('lat') lat: string,
    @Query('long') long: string,
  ) {
    const latitude = Number(lat).toFixed(2);
    const longitude = Number(long).toFixed(2);

    return this.availabilityService.findCentersByLocation(latitude, longitude);
  }
}
