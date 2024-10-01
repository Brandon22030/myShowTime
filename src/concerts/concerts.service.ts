import { Injectable } from '@nestjs/common';
import { Concert } from './concerts.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConcertDto } from './dto/concerts.dto';
import { UpdateConcertDto } from './dto/updateConcerts.dto';

@Injectable()
export class ConcertsService {
  constructor(
    @InjectModel(Concert.name) private ConcertModel: Model<Concert>,
  ) {}

  async createConcert(validateConcert: CreateConcertDto): Promise<Concert> {
    const {
      title,
      date,
      genre,
      location,
      availableTickets,
      description,
      group,
    } = validateConcert;

    const newConcert = await this.ConcertModel.create({
      title,
      date,
      genre,
      location,
      availableTickets,
      description,
      group,
    });

    return newConcert.save();
  }
  async getConcert(id: string): Promise<Concert> {
    return await this.ConcertModel.findById(id).exec();
  }
  async getAllConcerts(): Promise<Concert[]> {
    return await this.ConcertModel.find().exec();
  }
  async updateConcert(id: string, concert: UpdateConcertDto): Promise<Concert> {
    const oldConcert = this.getConcert(id);
    if (oldConcert) {
      return await this.ConcertModel.findByIdAndUpdate(id, concert, {
        new: true,
      }).exec();
    }
  }
  async deleteConcert(id: string) {
    return await this.ConcertModel.findByIdAndDelete(id).exec();
  }
}
