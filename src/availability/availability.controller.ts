import { Controller, Get, Param, Query } from '@nestjs/common';
import { AvailabilityService } from './availability.service';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  // Get centers by latitude and longitude
  @Get('centers/latLong')
  findCentersByLocation(
    @Query('lat') lat: string,
    @Query('long') long: string,
  ) {
    const latitude = Number(lat).toFixed(2);
    const longitude = Number(long).toFixed(2);

    return this.availabilityService.findCentersByLocation(latitude, longitude);
  }

  // Get Calendar by center
  @Get('calendar/center/:centerId')
  findCalendarByCenter(
    @Param('centerId') centerId: string,
    @Query('date') date: string,
  ) {
    console.log('IN API');
    return this.availabilityService.findCalendarByCenter(centerId, date);
  }

  @Get('calendar/district/:districtId')
  findCalendarByDistrict(
    @Param('districtId') districtId: string,
    @Query('date') date: string,
  ) {
    return this.availabilityService.findCalendarByDistrict(districtId, date);
  }
}
