<template>
  <q-page class="q-pa-lg">
    <video-player class="video-player vjs-custom-skin"
                  ref="videoPlayer"
                  :playsinline="true"
                  :options="playerOptions"
    ></video-player>
    <div class="row"><h1>{{movie.Name}}</h1></div>
    <div class="row" style="margin-top: 15px;">
      <q-chip v-for="label in movie.labels" style="margin-right: 5px" :key="label" color="secondary">
        {{label}}
      </q-chip>
    </div>
    <div class="row" style="margin:15px 0px"><em>上传者: {{movie.author}}</em><em style="margin-left: 20px;">{{fromNow(movie.timestamp)}}上传</em></div>
    <div class="row"><span>{{movie.Desc}}</span></div>
  </q-page>
</template>
<style lang="stylus">
</style>
<script>

export default {
  data () {
    return {
      hash: this.$route.params.hash,
      playerOptions: {
        playbackRates: [0.5, 1.0, 2.0],
        autoplay: false,
        muted: false,
        loop: true,
        preload: 'auto',
        language: 'zh-CN',
        fluid: true,
        sources: [{
          type: 'video/mp4',
          src: 'http://localhost:' + this.$settings.gateWayPort + '/ipfs/' + this.$route.params.hash
        }],
        width: '100%',
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        }
      }
    }
  },
  validations: {
  },
  computed: {
    movie () {
      let _movie = this.$store.getters['key/get'](this.$route.params.hash)
      let label = _movie['Label']
      let labels = label.split(',')
      _movie['labels'] = labels
      return _movie
    }
  },
  watch: {
  },
  methods: {
    fromNow (timestamp) {
      return this.$moment.unix(timestamp).fromNow()
    }
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
