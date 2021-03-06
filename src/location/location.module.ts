import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { CacheService } from 'src/cache.service';
import { EXTERNAL_API_BASE } from 'src/utils/constants';

@Module({
  imports: [
    HttpModule.register({
      baseURL: EXTERNAL_API_BASE,
      headers: {
        'user-agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
      },
    }),
    CacheModule.register(),
  ],
  controllers: [LocationController],
  providers: [LocationService, CacheService],
})
export class LocationModule {}
