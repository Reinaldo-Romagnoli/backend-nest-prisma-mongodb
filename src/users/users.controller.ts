import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userData: {name: string, email: string}): Promise<User>
{
    const { name, email } = userData
    return this.usersService.create({ name, email});
  }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne({id : id});
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body()
    userData: { name: string, email: string }): Promise<User> {
      const {name, email } = userData
    return this.usersService.update({
      where: {id: id},
      data: {name, email}
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<User> {
    return this.usersService.remove({id: id});
  }
}