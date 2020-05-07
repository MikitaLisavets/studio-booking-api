import convertAttributesToUser from './convertAttributesToUser';

describe('convertAttributesToUser', () => {
  it('returns empty user object when attributes are empty', () => {
    expect(convertAttributesToUser([])).toEqual({});
  });

  it('returns user object when attributes', () => {
    const attributes = [
      { Name: 'email', Value: 'email@email.com' },
      { Name: 'email_verified', Value: 'true'}
    ];

    expect(convertAttributesToUser(attributes)).toEqual({
      email: 'email@email.com',
      email_verified: 'true'
    });
  });
});