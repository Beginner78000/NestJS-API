import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    // On instancie AuthService
    constructor(private authService: AuthService) {}

    // route decorator
    @Post('signup')
    // méthode
    signup(@Body() dto: AuthDto) {
        // console.log({email, password})
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.authService.signin(dto)
    }

}