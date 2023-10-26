import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsPositive } from 'class-validator';

export class FacebookLoginDto {

  @ApiProperty({
    example: 'abc@gmail.com',
    description: 'user email',
    required: false,
  })
  @IsOptional()
  @Type(() => String)
  email: string;

  @ApiProperty({
    example: 'EAAJjmJ...',
    description: 'Facebook access token',
    required: true,
  })
  @IsNotEmpty({ message: 'SHOP_IS_REQUIRED' })
  @Type(() => String)
  accessToken: string;

  @ApiProperty({
    example: 1000,
    description: 'Facebook access token expire time',
    required: true,
  })
  @IsPositive({ message: 'EXPIRED_TIME_IS_REQUIRED' })
  @Type(() => Number)
  expiredTime: number;

  @ApiProperty({
    example: '543252523535',
    description: 'Facebook user Id',
    required: true,
  })
  @IsNotEmpty({ message: 'FACEBOOK_USER_ID_IS_REQUIRED' })
  @Type(() => String)
  facebookUserId: string;

  @ApiProperty({
    example: "VOcghwBWCpj2wsgSaSSTpVMIKvF3ZDRfeSVJr7F5aJU.eyJ1c2VyX2lkIjoiMzIxOTY4NTkxMTY3MzEwNyIsImNvZGUiOiJBUUMweHppSlRRaFEySW90OVJzd21vQUh0QmJ2czJlOEtLb3hxTHotVVl1aWJoVUFXeTNxQlhhUE80ZzZOSHlRb05Ma0toOW9taVlvbXc4UWFrdWp5R3ZtVlozTEFMWmR6WHNnM2tZd3otRC1sc1JsTDJQY1d3cVo1QkVHam8wYjJUYVlrNkF4SEFGSWNFaVQ1NUw1ekZQZENFYUE3WE1rNDlpZWlKUEhFYkRKQmlBdGVIaG5oVWR4NFBDY2I0N0VhVFgyMDd0SnZoQXdqYkZMNEczd3lHd0FWMjlmYVFpRHZTMkUyTkJwenFUUndiVmdkNXBnUGFtUEkyOThiUW5mX29TLXRvQ1JOdFBFNEJoLVkyVUh3aXlBZGI5Y0V3dF9adWpLVEhESDlXY25lUjRpajU4TDV4RjNfZjFMbnU5MGVfUlRYcU1aZ3BKaU9tV1AyeXhDN3ZvZSIsImFsZ29yaXRobSI6IkhNQUMtU0hBMjU2IiwiaXNzdWVkX2F0IjoxNjk4MjIzOTg3fQ",
    description: 'signin request code',
    required: true,
  })
  @IsNotEmpty({ message: 'SIGN_IN_IS_REQUIRED' })
  @Type(() => String)
  signinRequest: string;

  @ApiProperty({
    example: 'public_profile',
    description: 'Facebook scopes',
    required: true,
  })
  @IsNotEmpty({ message: 'SCOPES_IS_REQUIRED' })
  @Type(() => String)
  scopes: string;
}
