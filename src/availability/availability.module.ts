import { Module } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { CacheService } from 'src/cache.service';
import { HttpModule } from '@nestjs/common';
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
  ],
  controllers: [AvailabilityController],
  providers: [AvailabilityService, CacheService],
})
export class AvailabilityModule {}
