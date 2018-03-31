<template>
  <div class="avatar">
    <div class="posts">
      <div class="notes">
        <input type="${2:text}">
      </div>
      <div class="img">
        <img src="/mage middeleim.jpg"/>
      </div>
      <div class="notes">
        <textarea rows="4" cols="80" v-model="newNote" placeholder="Add a note">

        </textarea>
      </div>
      <button>Save</button>
      </div>
    </div>
  </div>
</template>

<script>
import gql from 'graphql-tag'

const mixin = {
  avatar: {
    allPosts: {
      query: gql`query allPosts {
        allPosts {
          id
          imageUrl
          description
        }
      }`,
      prefetch: true,
    },
  },
}

export default {
  mixins: [mixin],
}
</script>

<style lang="less" scoped>
.post {
  padding: 32px 0;

  &:not(:last-child) {
    border-bottom: solid 1px fade(black, 10%);
  }

  img {
    max-width: 100%;
  }
}
</style>
