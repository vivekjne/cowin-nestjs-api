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
      '{centerId}-{date}',
      `${centerId}-${date}`,
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
            if (Object.keys(response.data)?.length > 0) {
              this.cacheService.setResponseToCache(
                CACHE_STORE_KEY,
                response.data,
                60,
              );
            }

            return response.data;
          }),
        );
    } catch (err) {
      throw Error(err);
    }
  }

  async findCalendarByDistrict(districtId: string, date: string) {
    const CACHE_STORE_KEY = CACHE_KEYS.CALENDAR_BY_DISTRICT.replace(
      '{districtId}-{date}',
      `${districtId}-${date}`,
    );

    try {
      const cacheResponse = await this.cacheService.getFromCache(
        CACHE_STORE_KEY,
      );
      if (cacheResponse) {
        console.log('FROM CACHE', CACHE_STORE_KEY);
        return cacheResponse;
      }
      console.log(districtId, date);
      return this.httpService
        .get(
          `/appointment/sessions/public/calendarByDistrict?district_id=${districtId}&date=${date}`,
        )
        .pipe(
          map((response) => {
            if (Object.keys(response.data)?.length > 0) {
              this.cacheService.setResponseToCache(
                CACHE_STORE_KEY,
                response.data,
                60,
              );
            }

            return response.data;
          }),
        );
    } catch (err) {
      throw Error(err);
    }
  }

  async findSessionsByDistrict(districtId: string, date: string) {
    const CACHE_STORE_KEY = CACHE_KEYS.SESSIONS_BY_DISTRICT.replace(
      '{districtId}-{date}',
      `${districtId}-${date}`,
    );

    try {
      const cacheResponse = await this.cacheService.getFromCache(
        CACHE_STORE_KEY,
      );
      if (cacheResponse) {
        console.log('FROM CACHE', CACHE_STORE_KEY);
        return cacheResponse;
      }
      console.log(districtId, date);
      return this.httpService
        .get(
          `/appointment/sessions/public/findByDistrict?district_id=${districtId}&date=${date}`,
        )
        .pipe(
          map((response) => {
            if (Object.keys(response.data)?.length > 0) {
              this.cacheService.setResponseToCache(
                CACHE_STORE_KEY,
                response.data,
                60,
              );
            }

            return response.data;
          }),
        );
    } catch (err) {
      throw Error(err);
    }
  }

  async findSession(pin: string, date: string){
    return {success:"ok"}
  }
}
