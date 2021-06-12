import { Module, CacheModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheService } from './cache.service';
import { LocationModule } from './location/location.module';

@Module({
  imports: [LocationModule, CacheModule.register()],
  controllers: [AppController],
  providers: [AppService, CacheService],
  exports: [CacheService],
})
export class AppModule {}
