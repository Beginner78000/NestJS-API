import { Controller, Post } from "@nestjs/common";
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    // On instancie AuthService
    constructor(private authService: AuthService) {}

    // route
    @Post('signup')
    // méthode
    signup() {
        return this.authService.signup()
    }

    @Post('signin')
    signin() {
        return this.authService.signin()
    }

}