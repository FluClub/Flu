import VideoPlayer from 'vue-video-player'

export default ({ Vue }) => {
  require('video.js/dist/video-js.css')
  require('vue-video-player/src/custom-theme.css')
  Vue.use(VideoPlayer)
}
