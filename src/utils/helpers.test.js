import * as helpers from './helpers';

describe('helpers', () => {
  describe('defaultErrorHandler', () => {
    const responseMock = {
      status: jest.fn(),
      send: jest.fn()
    };

    const error = {
      code: 'Error',
      message: 'Error message',
      statusCode: '500'
    };

    beforeAll(() => {
      helpers.defaultErrorHandler(responseMock, error);
    });

    it('returns calls "status" method', () => {
      expect(responseMock.status).toBeCalledWith(error.statusCode);
    });

    it('returns calls "send" method', () => {
      expect(responseMock.send).toBeCalledWith(error);
    });
  });
});