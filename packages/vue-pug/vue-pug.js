import pug from 'pug'
import { Meteor } from 'meteor/meteor'

global.vue = global.vue || {}
global.vue.lang = global.vue.lang || {}

global.vue.lang.pug = Meteor.wrapAsync(function ({ source, basePath, inputFile }, cb) {
  var fn = pug.compile(source, {
    filename: basePath,
    fileMode: true,
    doctype: 'html',
  })

  var html = fn()

  cb(null, {
    template: html,
  })
})
