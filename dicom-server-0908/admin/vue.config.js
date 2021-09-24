'use strict'
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
    lintOnSave:false,
    configureWebpack: {
        name: 'student-admin',
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    }
}
