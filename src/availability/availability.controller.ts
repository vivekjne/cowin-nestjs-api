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
  @Get('centers/:centerId/calendar')
  findCalendarByCenter(
    @Param('centerId') centerId: string,
    @Query('date') date: string,
  ) {
    console.log('IN API');
    // const dateForamtted = `${date.getDay()}-${(date.getMonth() + 1)
    //   .toString()
    //   .padStart(2, '0')}-${date.getFullYear()}`;

    return this.availabilityService.findCalendarByCenter(centerId, date);
  }
}
