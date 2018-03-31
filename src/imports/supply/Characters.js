import base from './base'
import { Characters } from '../api/collections'

export default {
  extends: base,

  data () {
    return {
      characters: [],
    }
  },

  meteor: {
    $subscribe: {
      'items': [],
    },

    characters () {
      return Characters.find({})
    },
  },
}
