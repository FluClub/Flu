<template>
  <q-page class="q-pa-lg">
    <div class="row justify-center">
      <q-search style="width: 100%;margin-bottom: 15px;padding: 10px" placeholder="todo" inverted color="secondary" clearable value="" />
    </div>
    <div class="row">
      <movie-item v-for="item in movies"
                     :key="item._id"
                     :item="item" />
    </div>
  </q-page>
</template>
<style lang="stylus">

</style>

<script>

export default {
  name: 'PageMovie',
  data () {
    return {
    }
  },
  validations: {
  },
  computed: {
    movies () {
      return this.$store.state.key.list
    }
  },
  watch: {
  },
  methods: {
  },

  created () {
    this.$store.commit('ui/update', {
      breadcrumbs: [
        {key: 'nav.movie.label', to: '/movie'}
      ]
    })
  },

  destroyed () {
  }
}
</script>
