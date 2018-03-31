<template>
  <div class="menu">
    <p>Liste des personnages : </p>
    <div  class="character" v-for="character of characters" :class="{ many: characters.length > 1 }">
      <table>
        <tr>
          <td>
            <div class="img">
              <img :src="character.avatar" :alt="character.description" />
            </div>
          </td>
          <td>
            <div class="name">{{ character.name }}</div>
          </td>
          <td>
            <button id="remove-character" @click="event => removeCharacter(character)">X</button>
          </td>
          <td>
            <button id="remove-character" @click="event => router.push({ name: 'avatar', params: { characterId: character._id }})">Editer</button>
          </td>
        </tr>
      </table>
    </div>
    <div class="actions">
      <input v-model="newCharacter" placeholder="Désignation du personnage"/>
      <button id="create-character" @click="addCharacter">Créer personnage</button>
    </div>
    <!-- <router-link :to="{ name: 'avatar' }" tag="button">Nouveau Personnage</router-link> -->
  </div>
</template>

<script>
import { Meteor } from 'meteor/meteor'
import { Characters } from '../api/collections'
import { router } from 'vue-router'
// import VueRouter from 'vue-router'
// Vue.use(VueRouter)

export default {
  data () {
    return {
      newCharacter: '',
    }
  },

  meteor: {
    $subscribe: {
      'characters' () {
        return [this.name]
      },
    },
    characters () {
      return Characters.find({}, {
        sort: { name: -1 },
      })
    },
  },

  methods: {
    async addCharacter () {
      if (this.newCharacter) {
        try {
          await Meteor.callPromise('characters.add', {
            name: this.newCharacter,
          })
          this.newCharacter = ''
        } catch (e) {
          console.error(e)
        }
      }
    },

    async removeCharacter (character) {
      try {
        await Meteor.callPromise('characters.remove', {
          _id: character._id,
        })
      } catch (e) {
        console.error(e)
      }
    },
  },
}

</script>
<style lang="less" scoped>
.home {
  text-align: center;
}
</style>
