/**
 * @author: Storm
 * @date: 2019-07-17
 * @email: wenyejie@foxmail.com
 */

module.exports = {
  plugins: [
    require('autoprefixer'),
    require('cssnano')({
      preset: 'default'
    })
  ]
}
