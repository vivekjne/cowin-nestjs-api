import { HttpService, Injectable } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { CacheService } from 'src/cache.service';
import { CACHE_KEYS } from 'src/utils/constants';

@Injectable()
export class AvailabilityService {
  constructor(
    private httpService: HttpService,
    private cacheService: CacheService,
  ) {}

  findAll() {
    return `This action returns all availability`;
  }

  async findCentersByLocation(lat: string, long: string) {
    const CACHE_STORE_KEY = CACHE_KEYS.CENTERS_BY_LATLONG.replace(
      '{lat}-{long}',
      `${lat}-${long}`,
    );

    try {
      const cacheResponse = await this.cacheService.getFromCache(
        CACHE_STORE_KEY,
      );
      if (cacheResponse) {
        console.log('FROM CACHE', CACHE_STORE_KEY);
        return cacheResponse;
      }
      return this.httpService
        .get(
          `/appointment/centers/public/findByLatLong?lat=${lat}&long=${long}`,
        )
        .pipe(
          map((response) => {
            this.cacheService.setResponseToCache(
              CACHE_STORE_KEY,
              response.data,
            );
            return response.data;
          }),
        );
    } catch (err) {
      throw Error(err);
    }
  }

  async findCalendarByCenter(centerId: string, date: string) {
    const CACHE_STORE_KEY = CACHE_KEYS.CALENDAR_BY_CENTER.replace(
      '{centerId}',
      centerId,
    );

    try {
      const cacheResponse = await this.cacheService.getFromCache(
        CACHE_STORE_KEY,
      );
      if (cacheResponse) {
        console.log('FROM CACHE', CACHE_STORE_KEY);
        return cacheResponse;
      }
      return this.httpService
        .get(
          `/appointment/sessions/public/calendarByCenter?center_id=${centerId}&date=${date}`,
        )
        .pipe(
          map((response) => {
            this.cacheService.setResponseToCache(
              CACHE_STORE_KEY,
              response.data,
            );
            return response.data;
          }),
        );
    } catch (err) {
      throw Error(err);
    }
  }
}
