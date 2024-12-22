import { beforeEach, describe, expect, it, vi } from 'vitest';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserStatus } from 'src/common/enums/user.status';
describe('AuthController', () => {
  let authController;
  let authService;

  beforeEach(() => {
    const OtpModel = { generateOtp: vi.fn() };
    const EmailService = { sendEmail: vi.fn() };
    const ConfigService = {};
    const UserRepository = {};
    const HashPassword = { hash: vi.fn() };
    const JwtService = {};

    authService = new AuthService(
      OtpModel as any,
      EmailService as any,
      ConfigService as any,
      UserRepository as any,
      HashPassword as any,
      JwtService as any,
    );
    authController = new AuthController(authService);
  });
  describe('signup', () => {
    it('register user test', async () => {
      const createAuthDto = {
        name: 'John Doe',
        username: 'johndoe123',
        email: 'samandarshavkatov07@gmail.com',
        password: 'qwert1234',
        age: 25,
        gender: 'male',
        status: UserStatus.inactive,
        role: 'student',
      };

      const createSpy = vi
        .spyOn(authService, 'create')
        .mockResolvedValue({ success: true });

      const result = await authController.register(createAuthDto);

      expect(createSpy).toHaveBeenCalledWith(createAuthDto);
      expect(result).toEqual({ success: true });
    });
  });

  describe('signin', () => {
    it('login user test', async () => {
      const signInAuthDto = {
        email: 'samandarshavkatov07@gmail.com',
        password: 'qwert1234',
      };

      const loginSpy = vi
        .spyOn(authService, 'login')
        .mockResolvedValue({ success: true });

      const result = await authController.login(signInAuthDto);

      expect(loginSpy).toHaveBeenCalledWith(signInAuthDto);
      expect(result).toEqual({ success: true });
    });
  });
  describe('ActiveOtp', () => {
    it('ActiveOtp user test', async () => {
      const ActiveOtp = {
        email: 'samandarshavkatov07@gmail.com',
        otp: 456456,
      };

      const activeOtp = vi
        .spyOn(authService, 'activeOtp')
        .mockResolvedValue({ success: true });

      const result = await authController.actioveOtp(ActiveOtp);

      expect(activeOtp).toHaveBeenCalledWith(ActiveOtp);
      expect(result).toEqual({ success: true });
    });
  });

  describe('refreshToken ', () => {
    it('refreshToken  test', async () => {
      vi.spyOn(authService, 'refreshToken').mockResolvedValue({
        success: true,
      });

      const result = await authController.refreshToken();

      expect(result).toEqual({ success: true });
    });
  });

  describe('forgetPassword', () => {
    it('forgerEmail test', async () => {
      const forgetPass = {
        userId: 1,
        newPassword: 'samandarshavkatov07@gmail.com',
        otp: 412456,
      };
      vi.spyOn(authService, 'forgerEmail').mockResolvedValue({
        success: true,
      });

      const result = await authController.forgetPassword(forgetPass);

      expect(result).toEqual({ success: true });
    });
  });
  describe('restorationPassword', () => {
    it('restorationPassword test', async () => {
      const forgetPass = {
        userId: 1,
        newPassword: 'samandarshavkatov07@gmail.com',
        otp: 412456,
      };
      vi.spyOn(authService, 'restorationPassword').mockResolvedValue({
        success: true,
      });

      const result = await authController.restorationPassword(forgetPass);

      expect(result).toEqual({ success: true });
    });
  });
});
