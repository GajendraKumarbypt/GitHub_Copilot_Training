// Manual Jest mock for axios to avoid importing ESM axios in Jest runtime.
const axios = {
  get: jest.fn(),
};

module.exports = axios;
