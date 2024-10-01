import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ConcertDocument = HydratedDocument<Concert>;

@Schema({ timestamps: true })
export class Concert {
  @Prop({ required: true })
  title: string;

  @Prop({ type: String })
  date: string;

  @Prop({ required: true })
  genre: string;

  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  availableTickets: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  group: string;
}

export const ConcertSchema = SchemaFactory.createForClass(Concert);
