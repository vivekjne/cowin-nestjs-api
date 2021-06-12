import { HttpService, Injectable } from '@nestjs/common';
import { CACHE_KEYS, EXTERNAL_API_BASE } from 'src/utils/constants';
import { map } from 'rxjs/operators';
import { CACHE_MANAGER } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { CacheService } from 'src/cache.service';

@Injectable()
export class LocationService {
  constructor(
    private httpService: HttpService,
    private cacheService: CacheService,
  ) {}

  async getStates() {
    try {
      const cacheResponse = await this.cacheService.getFromCache(
        CACHE_KEYS.LOCATION_STATES,
      );
      if (cacheResponse) {
        console.log('FROM CACHE');
        return cacheResponse;
      }
      return this.httpService
        .get(`${EXTERNAL_API_BASE}/admin/location/states`)
        .pipe(
          map((response) => {
            this.cacheService.setResponseToCache(
              CACHE_KEYS.LOCATION_STATES,
              response.data,
            );
            return response.data;
          }),
        );
    } catch (err) {
      throw Error(err.message);
    }
  }

  // get districts by states
  async getDistrictsByStates(stateId: string) {
    try {
      const DISTRICTS_KEY = CACHE_KEYS.LOCATION_DISTRICT.replace(
        '{id}',
        stateId,
      );

      const cacheResponse = await this.cacheService.getFromCache(DISTRICTS_KEY);

      if (cacheResponse) {
        console.log('FROM CACHE with CACHEKEY', DISTRICTS_KEY);
        return cacheResponse;
      }
      return this.httpService
        .get(`${EXTERNAL_API_BASE}/admin/location/districts/${stateId}`)
        .pipe(
          map((response) => {
            this.cacheService.setResponseToCache(DISTRICTS_KEY, response.data);
            return response.data;
          }),
        );
    } catch (err) {
      throw Error(err.message);
    }
  }
}
