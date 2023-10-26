import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBearerAuth,  ApiTags } from '@nestjs/swagger';
import { FacebookLoginDto } from 'src/dtos/facebook-login.dto';
import { AuthService } from './auth.service';
import { AllowUnauthorized } from './decorator/allow-unauthorized.decorator';


@Controller('auth')
@ApiTags('AUTH')
@ApiBearerAuth()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @AllowUnauthorized()
  @Post('login')  
  async login(@Body() input: FacebookLoginDto) {
    return this.authService.login(input); 
  }

  @Get('callback')  
  async callback(@Query() input: any) {
    console.log('callback', input)
    return input;
  }
  
}
