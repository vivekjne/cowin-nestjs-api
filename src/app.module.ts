import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheService } from './cache.service';
import { LocationModule } from './location/location.module';
import { AvailabilityModule } from './availability/availability.module';

@Module({
  imports: [LocationModule, CacheModule.register(), AvailabilityModule],
  controllers: [AppController],
  providers: [AppService, CacheService],
  exports: [CacheService],
})
export class AppModule {}
