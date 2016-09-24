import { execFile } from 'child_process'
import flow from 'flow-bin'
import { logError, log } from '../util/log'

const errorCodes = {
  TYPECHECK_ERROR: 2
}

export default (saguiOptions) => new Promise((resolve, reject) => {
  const commandArgs = ['check', '--color=always']

  if (saguiOptions.javaScript && saguiOptions.javaScript.typeCheckAll) {
    commandArgs.push('--all')
  }

  execFile(flow, commandArgs, { cwd: saguiOptions.projectPath }, (err, stdout, stderr) => {
    console.log('SOMETHING FAILED 👾')

    console.error(err)
    console.error(stderr)

    console.log('END OF FAILURE 👾')

    if (err) {
      logError('Type check failed:\n')

      switch (err.code) {
        case errorCodes.TYPECHECK_ERROR:
          console.log(stdout)
          break

        default:
          console.log(err)
      }

      reject()
    } else {
      log('Type check completed without errors')
      resolve()
    }
  })
})
