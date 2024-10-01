import {
  Controller,
  Post,
  Request,
  Response,
  Get,
  Render,
  Redirect,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { UserService } from '../user/user.service';
import { Session } from '@nestjs/common';
import { UserGuard } from './user.guard';
// import { UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AuthController {
  constructor(private readonly authService: UserService) {}

  @Get('/login')
  @Render('login')
  renderLoginPage() {
    return;
  }

  @Get('/dashboard/users')
  @Render('usersDashboard.hbs')
  async findAll() {
    const users = await this.authService.findAll();
    return { users };
  }

  @Get('users/:id')
  @Render('detail')
  async findOne(@Param('id') id: string) {
    const user = await this.authService.findOneById(id);
    return { user };
  }

  @Post('/login')
  // @Render('indexConcert')
  async login(@Session() ses, @Request() req, @Response() res) {
    const { email } = req.body;
    const user = await this.authService.findOneByEmail(email);
    console.log(user);
    if (user.role == 'admin') {
      // req.session.userId = user.id;
      // console.log(req.session.userId);
      res.redirect('/concerts/dashboard/m-concerts');
    } else {
      res.redirect('/concerts');
    }
  }

  @Get('register')
  @Render('register')
  renderRegisterPage() {
    return;
  }

  @Post('register')
  // @Redirect('login')
  async register(@Request() req, @Response() res) {
    const { username, email, password, role } = req.body;
    await this.authService.create(username, email, password, role);
    res.redirect('/login');
  }

  @Post('logout')
  logout(@Request() req, @Response() res) {
    req.session.destroy(() => {
      res.redirect('/login');
    });
  }

  @Get('/:id/edit')
  @Render('editUser')
  async editConcert(@Param('id') id: string) {
    const user = await this.authService.findOneById(id);
    return { user };
  }

  @Post('/:id/edit')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateAuthDto,
    @Response() res,
  ) {
    await this.authService.updateUser(id, updateUserDto);
    res.redirect('/dashboard/users');
  }

  @Post('/delete/:id')
  async deleteUser(@Param('id') id: string, @Response() res) {
    await this.authService.deleteUser(id);
    res.redirect('/dashboard/users');
  }
}
