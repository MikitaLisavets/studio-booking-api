import convertAttributesToUser from './convertAttributesToUser';

describe('convertAttributesToUser', () => {
  it('returns empty user object when attributes are empty', () => {
    expect(convertAttributesToUser([])).toEqual({});
  });

  it('returns user object when attributes', () => {
    const attributes = [
      { Name: 'email', Value: 'email@email.com' },
      { Name: 'email_verified', Value: 'true'},
      { Name: 'phone_number', Value: '+12345678' },
      { Name: 'phone_number_verified', Value: 'false'}
    ];

    expect(convertAttributesToUser(attributes)).toEqual({
      email: 'email@email.com',
      email_verified: 'true',
      phone_number: '+12345678',
      phone_number_verified: 'false'
    });
  });
});