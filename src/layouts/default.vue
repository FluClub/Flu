<template>
  <q-layout view="LHh Lpr LFf">
    <q-layout-header style="-webkit-app-region: drag">
      <q-toolbar :glossy="$q.theme === 'mat'"
                 :inverted="$q.theme === 'ios'">

        <q-btn class="toolbar-btn"
               flat
               dense
               round
               @click="leftDrawerOpen = !leftDrawerOpen"
               aria-label="Menu"
               icon="menu" />

        <q-breadcrumbs class="q-ml-xs flu-breadcrumbs" color="light">
          <q-breadcrumbs-el v-for="item in breadcrumbs" :key="item.key" :label="$t(item.key)" :to="item.to"/>
        </q-breadcrumbs>

      </q-toolbar>
    </q-layout-header>

    <q-layout-drawer v-model="leftDrawerOpen"
                     :content-class="$q.theme === 'mat' ? 'bg-grey-2 shadow-5' : null" :content-style="{width:'22%'}">
      <div class="bg-white">
        <div class="row flex-center q-my-sm">
          <!--<img alt="Flu logo"
               src="statics/flu-logo@2x.png"/>-->
          <q-btn flat
                 dense
                 disable
                 text-color="black"
                 size="xl"
                 label="Flu">
            <q-chip dense
                    floating
                    :class="{hidden: !isTestNet}"
                    color="negative"> test net </q-chip>
            <q-chip dense
                    floating
                    :class="{hidden: !isPrivateNet}"
                    color="negative"> private net </q-chip>
          </q-btn>
        </div>
        <div class="row q-pa-sm justify-center">
          <q-chip dense
                  icon="layers"
                  title="block number"
                  class=""> {{blockNumber}} </q-chip>
          <q-chip dense
                  icon="timer"
                  title="elapsed time"
                  class="q-ml-sm"> {{elapsedTime}} s</q-chip>
          <q-chip dense
                  icon="router"
                  title="peers"
                  class="q-ml-sm"> {{peerCount}} </q-chip>
        </div>
      </div>
      <q-list no-border
              link
              inset-delimiter>
        <q-item to="/index">
          <q-item-side icon="home" />
          <q-item-main :label="$t('nav.index.label')"
                       :sublabel="$t('nav.index.sublabel')" />
        </q-item>
        <q-item to="/movie/">
          <q-item-side icon="movie_filter" />
          <q-item-main :label="$t('nav.movie.label')"
                       :sublabel="$t('nav.movie.sublabel')" />
        </q-item>
        <q-item to="/wallet">
          <q-item-side icon="credit_card" />
          <q-item-main :label="$t('nav.wallet.label')"
                       :sublabel="$t('nav.wallet.sublabel')" />
        </q-item>
        <q-item to="/transfer/">
          <q-item-side icon="transfer_within_a_station" />
          <q-item-main :label="$t('nav.transfer.label')"
                       :sublabel="$t('nav.transfer.sublabel')" />
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
<style lang="stylus">

</style>
<script>
let timer
const web3 = window.web3

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      toolbarIcon: 'layers',
      elapsedTime: 0,
      isTestNet: false,
      isPrivateNet: false
    }
  },
  computed: {
    blockNumber () {
      return this.$store.state.node.blockNumber
    },
    peerCount () {
      return this.$store.state.node.peers
    },
    breadcrumbs () {
      return this.$store.state.ui.breadcrumbs
    }
  },
  watch: {
    blockNumber: function () {
      this.elapsedTime = 0
    }
  },
  methods: {
  },
  created () {
    let $vm = this
    timer = setInterval(() => {
      $vm.elapsedTime += 1
    }, 1000)

    web3.eth.net.getId().then(num => {
      if (num === 3) {
        this.isTestNet = true
      } else if (num !== 1 && num !== 19840711) {
        this.isPrivateNet = true
      }
    })
  },
  destroyed () {
    clearInterval(timer)
  }
}
</script>
