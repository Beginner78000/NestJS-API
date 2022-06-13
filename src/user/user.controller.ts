import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard/jwt.guard';

// protect all the routes /users
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    // get /users/me
    @Get('me')
    getMe(@GetUser() user: User) {
        // console.log({ user: req.user });
        return user;
    }
}
