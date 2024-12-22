import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ProfileService } from './profile.service';
import { User } from 'src/user/entities/user.entity';
describe('ProfileController', () => {
  let profileService;
  beforeEach(() => {
    const UserRepository = {};
    const HashPassword = { hash: vi.fn() };

    profileService = new ProfileService(
      UserRepository as any,
      HashPassword as any,
    );
  });
  describe('get ME', () => {
    it('get ME test', async () => {
      const user = {
        sub: 'samandarshavkatov07@gmail.com',
        username: 'jhon',
        role: 'User',
      };
      vi.spyOn(profileService, 'getMe').mockResolvedValue({ success: true });

      const result = await profileService.getMe(user);

      expect(result).toEqual({ success: true });
    });
  });

  describe('Update', () => {
    it('Update test', async () => {
      const user = {
        sub: 'samandarshavkatov07@gmail.com',
        username: 'jhon',
        role: 'User',
      };
      const updateProfile = {
        name: 'Ali',
      };

      vi.spyOn(profileService, 'updateProfile').mockResolvedValue({
        success: true,
      });

      const result = await profileService.updateProfile(user, updateProfile);

      expect(result).toEqual({ success: true });
    });
  });

  describe('deleteProfile', () => {
    it('deleteProfile test', async () => {
      const user = {
        sub: 'samandarshavkatov07@gmail.com',
        username: 'jhon',
        role: 'User',
      };

      vi.spyOn(profileService, 'deleteProfile').mockResolvedValue({
        success: true,
      });

      const result = await profileService.deleteProfile(user);

      expect(result).toEqual({ success: true });
    });
  });

  describe('updatePassword', () => {
    it('deleteProfile test', async () => {
      const user = {
        sub: 'samandarshavkatov07@gmail.com',
        username: 'jhon',
        role: 'User',
      };
      const usersPasswords = {
        oldPassword: 'qwert12345',
        newPassword: '12345rewq',
      };

      vi.spyOn(profileService, 'updatePassword').mockResolvedValue({
        success: true,
      });

      const result = await profileService.updatePassword(user, usersPasswords);

      expect(result).toEqual({ success: true });
    });
  });
});
