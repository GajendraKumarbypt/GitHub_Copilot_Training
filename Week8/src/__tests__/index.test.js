/**
 * Importing index.js should mount the app root without throwing.
 */
test('index.js mounts root element', () => {
  // require so that file runs once under test environment
  // eslint-disable-next-line global-require
  require('../index.jsx');
  const root = document.getElementById('root');
  expect(root).toBeTruthy();
});
