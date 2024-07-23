import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TokenUpdateDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly token: string;
}
export class LoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
export class ResetPasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly currentPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly newPassword: string;
}
export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly mobile: string;

  @ApiProperty()
  @IsNotEmpty()
  readonly newPassword: string;
}
export class OtpDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly mobile: string;
  @ApiProperty()
  @IsNotEmpty()
  readonly isRegistering: boolean;
}
export class RefreshTokenDto {
  @ApiProperty()
  @IsNotEmpty()
  readonly refreshToken: string;
}
export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;
  @IsNotEmpty()
  @ApiProperty()
  password: string;
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;
  @IsNotEmpty()
  @ApiProperty()
  email: string;
}

export class VerifyOtpDto {
  @IsNotEmpty()
  @ApiProperty()
  mobile: string;
  @IsNotEmpty()
  @ApiProperty()
  otpCode: string;
}
