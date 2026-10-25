<template>
  <div class="live u-container">
    <div class="frame" ref="frame">
      <iframe ref="iframe" :data-src="item.src" title="Live preview" tabindex="-1" referrerpolicy="no-referrer" sandbox="allow-scripts allow-same-origin"></iframe>
      <a :href="item.src" target="_blank" rel="noopener" class="link" aria-label="Open the live site"></a>
    </div>
    <p class="caption"><a :href="item.src" target="_blank" rel="noopener">Live preview. Open the site &#8599;</a></p>
  </div>
</template>

<script>
import workMixins from './workMixins.vue'
export default {
  props: ['item', 'path', 'videoPath'],
  mixins: [workMixins],
  methods: {
    fit() {
      const frame = this.$refs.frame
      const iframe = this.$refs.iframe
      if (!frame || !iframe) return
      iframe.style.transform = `scale(${frame.clientWidth / 1280})`
    }
  },
  mounted() {
    this.fit()
    window.addEventListener('resize', this.fit)
    setTimeout(() => {
      const iframe = this.$refs.iframe
      if (iframe) iframe.src = iframe.dataset.src
      this.fit()
    }, 600)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.fit)
  }
}
</script>

<style lang="stylus" scoped>
.live
  margin-top 100px
  .device &
    width 80%
.frame
  position relative
  width 100%
  padding-top 62.5%
  overflow hidden
  background #f3f2f1
iframe
  position absolute
  top 0
  left 0
  width 1280px
  height 800px
  border 0
  transform-origin 0 0
  pointer-events none
  background #fff
.link
  position absolute
  top 0
  left 0
  width 100%
  height 100%
  z-index 2
.caption
  margin-top 12px
  font-size 14px
</style>
