import requestLogger from './requestLogger';

describe('requestLogger', () => {
  const consoleInfoOriginal = console.info;
  const consoleInfoMock = jest.fn();
  const nextMock = jest.fn();
  const reqMock = { method: 'GET', originalUrl: '/api' };
  const resMock = { on: (_type, cb) => cb(), statusCode: 200 };

  beforeAll(() => {
    console.info = consoleInfoMock;
    requestLogger(reqMock, resMock, nextMock);
  });

  afterAll(() => {
    console.info = consoleInfoOriginal;
  });

  it('calls console info 2 times', () => {
    expect(consoleInfoMock).toBeCalledTimes(2);
  });
});