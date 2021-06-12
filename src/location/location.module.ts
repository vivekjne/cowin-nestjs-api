import { CacheModule, HttpModule, Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';

@Module({
  imports: [HttpModule, CacheModule.register()],
  controllers: [LocationController],
  providers: [LocationService],
})
export class LocationModule {}
