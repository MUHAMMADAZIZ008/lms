import { Otp } from './otp';

export const otpProviders = [
  {
    provide: 'OTP_PROVIDER',
    useValue: Otp,
  },
];
