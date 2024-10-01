import { Module } from '@nestjs/common';
import { ConcertsController } from './concerts.controller';
import { ConcertsService } from './concerts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConcertSchema } from './concerts.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Concert', schema: ConcertSchema }]),
  ],
  controllers: [ConcertsController],
  providers: [ConcertsService],
})
export class ConcertsModule {}
