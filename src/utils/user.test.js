import { convertDBAttributesToUser, convertUserToDBAttributes, mapOutputUser } from './user';

describe('user utils', () => {
  describe('convertDBAttributesToUser', () => {
    it('returns empty user object when attributes are empty', () => {
      expect(convertDBAttributesToUser({})).toEqual({});
    });
  
  
    it('returns user object when attributes', () => {
      const attrs = {
        'emailVerified': { 'BOOL': true },
        'phoneNumber': { 'S': '+12345678' },
        'ID': { 'S': 'abc123' },
        'email': { 'S': 'email@email.com'},
        'phoneNumberVerified': { 'BOOL': false }
      };

      expect(convertDBAttributesToUser(attrs)).toEqual({
        ID: 'abc123',
        email: 'email@email.com',
        emailVerified: true,
        phoneNumber: '+12345678',
        phoneNumberVerified: false
      });
    });
  });

  describe('convertUserToDBAttributes', () => {
    it('returns empty user object when attributes are empty', () => {
      expect(convertUserToDBAttributes({})).toEqual({});
    });
  
  
    it('returns user object when attributes', () => {
      const user = {
        ID: 'abc123',
        email: 'email@email.com',
        emailVerified: true,
        phoneNumber: '+12345678',
        phoneNumberVerified: false
      };

      expect(convertUserToDBAttributes(user)).toEqual({
        'emailVerified': { 'BOOL': true },
        'phoneNumber': { 'S': '+12345678' },
        'ID': { 'S': 'abc123' },
        'email': { 'S': 'email@email.com'},
        'phoneNumberVerified': { 'BOOL': false }
      });
    });
  });

  describe('mapOutputUser', () => {
    it('returns user for output', () => {
      expect(mapOutputUser({})).toEqual({});
      expect(mapOutputUser({
        email: 'email',
        emailVerified: true,
        phoneNumber: '+12345678',
        phoneNumberVerified: false
      })).toEqual({
        email: 'email',
        phoneNumber: '+12345678'
      });
    });
  });
});