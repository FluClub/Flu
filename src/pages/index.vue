<template>
  <q-page class="q-pa-lg">
    <div ref="markdown" v-html="html" class="center"></div>
  </q-page>
</template>
<style lang="stylus">
</style>

<script>
import showdown from 'showdown'
export default {
  name: 'PageIndex',
  data () {
    return {
      html: ''
    }
  },
  validations: {
  },
  computed: {
  },
  watch: {
  },
  methods: {
  },
  mounted () {
  },
  created () {
    let _this = this
    this.$axios.get('https://raw.githubusercontent.com/FluClub/ico/master/README.md').then(function (response) {
      let readMe = response.data
      let converter = new showdown.Converter()
      _this.html = converter.makeHtml(readMe)
    })
      .catch(function (error) {
        console.log(error)
      })
    this.$store.commit('ui/update', {
      breadcrumbs: [
        {key: 'nav.index.label', to: '/index'}
      ]
    })
  },

  destroyed () {
  }
}
</script>
