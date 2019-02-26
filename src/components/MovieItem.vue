<template>
  <q-card @click.native="goto('/movie/view/'+item._id)" inline class="movie-card">
    <q-card-media overlay-position="top">
      <progressive-background :src="'http://localhost:'+$settings.gateWayPort+'/ipfs/'+item.Img"/>
    </q-card-media>
    <q-card-main class="ellipsis">
      {{item.Name}}
    </q-card-main>
  </q-card>
</template>

<style lang="stylus">
  .movie-card:hover {
    background: alpha(orange, 30%);
    opacity: 0.5;
    cursor: pointer;
  }
  .q-card-main {
    font-size: 1rem;
  }
  .q-card-main a
    text-decoration none
  .q-card-title
    color black
    font-weight bold
    font-size 150%
  .q-card
    display inline !important
    width calc(100% / 4 - 4 * 8px)
    margin: 8px
  .progressive-background-image
    background-size  cover
</style>

<script>

export default {
  data () {
    return {
    }
  },
  props: {
    item: {
      required: true
    }
  },
  computed: {
  },
  methods: {
    goto (path) {
      this.$router.push(path)
    }
  }
}
</script>
