export default {
  BUILD: 'build',
  DEVELOP: 'develop',
  INSTALL: 'install',
  LINT: 'lint',
  TEST: 'test',
  INTEGRATION_TEST: 'integration_test',
  TYPECHECK: 'typecheck',
  isTest: (action) => {
    return ['test', 'integration_test'].includes(action)
  }
}
