import { Mongo } from 'meteor/mongo'

export const Notes = new Mongo.Collection('notes')
export const Characters = new Mongo.Collection('characters')
export const Items = new Mongo.Collection('items')
