import { HttpService, HttpStatus, Injectable } from '@nestjs/common';
import { CACHE_KEYS, EXTERNAL_API_BASE } from 'src/utils/constants';
import { map } from 'rxjs/operators';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { response } from 'express';
import { CACHE_MANAGER } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class LocationService {
  constructor(
    private httpService: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getFromCache(key) {
    const responseFromCache = await this.cacheManager.get(key);
    if (responseFromCache) {
      return JSON.parse(responseFromCache as any);
    }
    return null;
  }

  async setResponseToCache(key, data, ttl = 300) {
    this.cacheManager.set(key, JSON.stringify(data), { ttl });
  }

  async getStates() {
    try {
      const cacheResponse = await this.getFromCache(CACHE_KEYS.LOCATION_STATES);
      if (cacheResponse) {
        console.log('FROM CACHE');
        return cacheResponse;
      }
      return this.httpService
        .get(`${EXTERNAL_API_BASE}/admin/location/states`)
        .pipe(
          map((response) => {
            this.setResponseToCache(CACHE_KEYS.LOCATION_STATES, response.data);
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

      const cacheResponse = await this.getFromCache(DISTRICTS_KEY);

      if (cacheResponse) {
        console.log('FROM CACHE with CACHEKEY', DISTRICTS_KEY);
        return cacheResponse;
      }
      return this.httpService
        .get(`${EXTERNAL_API_BASE}/admin/location/districts/${stateId}`)
        .pipe(
          map((response) => {
            this.setResponseToCache(DISTRICTS_KEY, response.data);
            return response.data;
          }),
        );
    } catch (err) {
      throw Error(err.message);
    }
  }
}
