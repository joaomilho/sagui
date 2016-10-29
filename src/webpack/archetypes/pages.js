import HtmlWebpackPlugin from 'html-webpack-plugin'
import { join } from 'path'
import { optimize } from 'webpack'
import actions from '../../actions'

export default {
  name: 'pages',
  configure ({ pages, action, projectPath }) {
    const pageEntries = pages instanceof Array
      ? pages
      : pages.entries
    if (pageEntries.length === 0) { return {} }

    const entry = configureEntry(pageEntries)
    const plugins = configurePlugins(pageEntries, action)

    return {
      output: {
        path: join(projectPath, 'dist'),
        filename: '[name]-[hash].js',
        chunkFilename: '[name]-[hash].chunk.js',
        publicPath: pages.publicPath
      },
      plugins,
      entry
    }
  }
}

function configureEntry (pages) {
  let entry = {}

  pages.forEach((page) => {
    entry[page] = [`./${page}`]
  })

  return entry
}

function configurePlugins (pages, action) {
  const plugins = pages.map((page) => {
    return new HtmlWebpackPlugin({
      template: `${page}.html`,
      filename: `${page}.html`,
      chunks: ['common', page]
    })
  })

  if (pages.length > 1 && action !== actions.TEST) {
    plugins.push(new optimize.CommonsChunkPlugin({ name: 'common' }))
  }

  return plugins
}
