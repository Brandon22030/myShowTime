import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Render,
  Response,
  UseGuards,
} from '@nestjs/common';
import { ConcertsService } from './concerts.service';
import { CreateConcertDto } from './dto/concerts.dto';
import { UpdateConcertDto } from './dto/updateConcerts.dto';
import { UserGuard } from 'src/auth/user.guard';

@Controller('concerts')
// @UseGuards(UserGuard)
export class ConcertsController {
  constructor(private concertsService: ConcertsService) {}

  @Get('/book')
  @Render('bookConcert.hbs')
  display() {
    return;
  }

  @Post('/book')
  // @UseGuards(UserGuard)
  async postConcert(@Body() createDto: CreateConcertDto, @Response() res) {
    const concert = await this.concertsService.createConcert(createDto);
    // res.redirect('/concerts');
    return { concert };
  }

  @Get()
  @Render('indexConcert.hbs')
  async getAll() {
    const concerts = await this.concertsService.getAllConcerts();
    concerts.forEach((value, index) => {
      const time = new Date(concerts[index]['date']);
      const month = time.toLocaleString('en-US', { month: 'short' });
      value['date'] = String(time.getDate()).concat(' ', month);
    });
    return { concerts };
  }

  @Get('/dashboard/m-concerts')
  @Render('dashboardConcert.hbs')
  async getAllCon() {
    const concerts = await this.concertsService.getAllConcerts();
    concerts.forEach((value, index) => {
      const time = new Date(concerts[index]['date']);
      const month = time.toLocaleString('en-US', { month: 'short' });
      value['date'] = month.concat(
        ' ',
        String(time.getDate()),
        ', ',
        String(time.getFullYear()),
      );
    });
    return { concerts };
  }

  @Get(':id/details')
  @Render('concertDetails.hbs')
  async getOne(@Param('id') id: string) {
    const concert = await this.concertsService.getConcert(id);
    const time = new Date(concert['date']);
    const month = time.toLocaleString('en-US', { month: 'short' });
    concert['date'] = month.concat(
      ' ',
      String(time.getDate()),
      ', ',
      String(time.getFullYear()),
    );
    return { concert };
  }

  @Get('/:id/edit')
  @Render('editConcert.hbs')
  async editConcert(@Param('id') id: string) {
    const concert = await this.concertsService.getConcert(id);
    return { concert };
  }

  @Post('/:id/edit')
  async updateOne(
    @Param('id') id: string,
    @Body() updateDto: UpdateConcertDto,
    @Response() res,
  ) {
    await this.concertsService.updateConcert(id, updateDto);
    res.redirect('/concerts/dashboard/m-concerts');
  }

  @Post('/delete/:id')
  async deleteOne(@Param('id') id: string, @Response() res) {
    await this.concertsService.deleteConcert(id);
    res.redirect('/concerts/dashboard/m-concerts');
  }

  @Get('/aProfile')
  @Render('adminProfile.hbs')
  adminProfile() {
    return;
  }

  @Get('/tickets/:id')
  @Render('buyTickets.hbs')
  async buyTicket(@Param('id') id: string) {
    const concert = await this.concertsService.getConcert(id);
    return { concert };
  }
}
