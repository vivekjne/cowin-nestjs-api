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

  async getStates() {
    try {
      const statesResponseFromCache = await this.cacheManager.get(
        CACHE_KEYS.LOCATION_STATES,
      );
      console.log(statesResponseFromCache);
      if (statesResponseFromCache) {
        console.log('FROM CACHE');
        return JSON.parse(statesResponseFromCache as any);
      }
      return this.httpService
        .get(`${EXTERNAL_API_BASE}/admin/location/states`, {
          headers: {
            'user-agent':
              'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
          },
        })
        .pipe(
          map((response) => {
            this.cacheManager.set(
              CACHE_KEYS.LOCATION_STATES,
              JSON.stringify(response.data),
              { ttl: 300 },
            );
            return response.data;
          }),
        );
    } catch (err) {
      throw Error(err.message);
    }
  }
}
