import build from './build'

export default Object.assign(build, {
  input: 'src/dropmic.js',
  output: Object.assign(build.output, {
    file: 'dist/dropmic.esm.js',
    format: 'es'
  })
})