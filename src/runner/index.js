import actions from '../actions'
import build from './build'
import developmentServer from './development-server'
import install from './install'
import lint from './lint'
import test from './test'
import integrationTest from './integration-test'
import typecheck from './typecheck'

const actionsMap = {
  [actions.BUILD]: build,
  [actions.DEVELOP]: developmentServer,
  [actions.INSTALL]: install,
  [actions.LINT]: lint,
  [actions.TEST]: test,
  [actions.INTEGRATION_TEST]: integrationTest,
  [actions.TYPECHECK]: typecheck
}

// throw actionsMap.develop
export default (saguiOptions) => {
  // throw JSON.stringify(actionsMap)
  return actionsMap[saguiOptions.action]
    ? actionsMap[saguiOptions.action](saguiOptions)
    : Promise.reject('A valid action is required.')
}
