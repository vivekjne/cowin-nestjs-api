import { Injectable } from '@nestjs/common';

import { CACHE_MANAGER } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

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
}
