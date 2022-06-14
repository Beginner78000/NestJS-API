import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';

// protect all the routes /users
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService: UserService ) {}
    // get /users/me
    @Get('me')
    getMe(@GetUser() user: User) {
        // console.log({ user: req.user });
        return user;
    }

    @Patch()
    editUser(
        @GetUser('id') userId: number, 
        @Body() dto: EditUserDto
    ) {
        return this.userService.editUser(userId, dto);
    }
}
