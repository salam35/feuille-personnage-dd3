import { Meteor } from 'meteor/meteor'
import { SimpleSchema } from 'meteor/aldeed:simple-schema'
import { Notes, Characters } from './collections'

Meteor.methods({
  ['notes.add'] (args) {
    new SimpleSchema({
      text: { type: String },
    }).validate(args)

    const { text } = args

    Notes.insert({
      text,
      created: new Date(),
    })
  },

  ['notes.remove'] (args) {
    new SimpleSchema({
      _id:  { type: String },
    }).validate(args)

    const { _id } = args

    Notes.remove(_id)
  },

  ['characters.add'] (args) {
    new SimpleSchema({
      name: { type: String },
    }).validate(args)

    const { name } = args

    Characters.insert({
      name,
    })
  },

  ['characters.update'] (args) {
    new SimpleSchema({
      description: { type: String },
    }).validate(args)

    const { description } = args

    Characters.update({
      description,
    })
  },

  ['characters.remove'] (args) {
    new SimpleSchema({
      _id:  { type: String },
    }).validate(args)

    const { _id } = args

    Characters.remove(_id)
  },
})
