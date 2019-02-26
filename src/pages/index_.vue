<template>
  <q-page class="q-pa-lg">
    <q-timeline responsive color="red">
      <q-timeline-entry heading>RoadMap</q-timeline-entry>
      <q-timeline-entry
        subtitle="2018年11月"
        side="left"
      >
        <div>
          创建技术团队，开发测试网络和PC版本客户端
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        subtitle="2019年2月26日"
        side="right"
      >
        <div>
          发布测试网络上线，上线0.9版本PC客户端，可以搜索观看最新电影等资源
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        subtitle="2019年3月6日"
        side="left"
      >
        <div>
          开启ICO，初始目标1w ETH未完成这个目标前允许用户自由退币，达到4w ETH时ICO终止
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        subtitle="2019年5月6日"
        side="right"
      >
        <div>
          主网上线，给ICO用户发放主网币，1.0版本PC客户端上线，包括视频打赏，点赞，评论搜索等功能
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        subtitle="2019年6月6日"
        side="left"
      >
        <div>
          平台上线平台直播和社交功能，同时推出手机客户端轻节点app
        </div>
      </q-timeline-entry>

      <q-timeline-entry
        subtitle="2019年第三季度"
        side="right"
      >
        <div>
          平台对接更多广告商等外部资源，持币用户享受收益分成
        </div>
      </q-timeline-entry>
    </q-timeline>
  </q-page>
</template>
<style lang="stylus">

</style>

<script>

export default {
  name: 'PageIndex',
  data () {
    return {
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

  created () {
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
