import { Module } from '@nestjs/common';
import { TranscriptService } from './transcript.service';
import { TranscriptController } from './transcript.controller';
import { YouTubeApiService } from './youtube-api.service';
import { CacheModule } from '@nestjs/common';
import { RateLimiterModule } from 'nestjs-rate-limiter';

@Module({
  imports: [
    CacheModule.register(),
    RateLimiterModule,
  ],
  providers: [
    TranscriptService,
    YouTubeApiService,
  ],
  controllers: [TranscriptController],
})
export class TranscriptModule {}
