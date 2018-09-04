/* For build */
import fs from 'fs'
import path from 'path'
import { uglify } from 'rollup-plugin-uglify'

const baseConf = require('./rollup.config.base')

const formats = ['es', 'umd']

function getEntries() {
  const reg = /\.vue$/
  return fs.readdirSync(path.resolve(__dirname, './src/components'))
    .filter(filename => reg.test(filename) && !fs.statSync(path.resolve(__dirname, './src/components', filename)).isDirectory())
    .map(filename => ({
      name: filename.replace(reg, ''),
      filename: path.resolve(__dirname, './src/components', filename),
      formats: formats.filter(f => f !== 'es'),
    }))
}

const conf = entry => Object.assign({}, baseConf, {
  input: entry.filename,
  output: entry.formats.map(format => ({
    file: `./lib/${format}/${entry.name}.js`,
    format,
    name: entry.name === 'index' ? 'VueSnackbar' : entry.name,
  })),
  external: [],
  plugins: Object.assign(
    [],
    baseConf.plugins,
    [(entry.needUglify !== false && uglify())],
  ),
})

export default [
  { name: 'index', filename: './src/index.js', formats: ['es'], needUglify: false },
  { name: 'index', filename: './src/index.js', formats: ['umd'] },
  ...getEntries(),
].map(conf)
