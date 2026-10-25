module.exports = {
  target: 'static',
  head: {
    title: 'Muneeb Rehman',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#f3f2f1' },
      { name: 'msapplication-TileColor', content: '#f3f2f1' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { hid: 'description', name: 'description', content: 'Creative developer, web designer and graphic designer based in Pakistan.' },
      { hid: 'og:description', property: 'og:description', content: 'Creative developer, web designer and graphic designer based in Pakistan.' },
      { hid: 'twitter:description', property: 'twitter:description', content: 'Creative developer, web designer and graphic designer based in Pakistan.' },
      {
        hid: `og:title`,
        property: 'og:title',
        content: 'Muneeb Rehman'
      },
      {
        hid: 'og:type',
        property: 'og:type',
        content: 'website'
      },
      {
        hid: 'og:site_name',
        property: 'og:site_name',
        content: 'Muneeb Rehman'
      },
      {
        hid: 'twitter:card',
        property: 'twitter:card',
        content: 'summary_large_image'
      },
      {
        hid: 'twitter:title',
        property: 'twitter:title',
        content: 'Muneeb Rehman'
      },
      {
        hid: 'twitter:site',
        property: 'twitter:site',
        content: 'Muneeb Rehman'
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/images/share.jpg'
      },
      {
        hid: 'twitter:image',
        property: 'twitter:image',
        content: '/images/share.jpg'
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
    ]
  },
  /*
  ** Customize the progress bar color©©
  */
  loading: { color: '#3B8070' },
  modules: [
    ['@nuxtjs/pwa',{ workbox: {cachingExtensions: '~plugins/workbox-range-request.js'}}],
  ],
  plugins: [
    '~plugins/vuex-router-sync.js'/*,
    {
      src: '~/plugins/pixi',
      ssr: false
    }*/
  ],
  router: {
   /* extendRoutes (routes, resolve) {
      routes.push({
        name: 'error',
        path: '*',
        component: resolve(__dirname, 'pages/404.vue')
      })
    }*/
  },
  generate: {
    dir: 'dist',
    routes: function () {

      var routes_array = []
      var projects = JSON.parse(require('fs').readFileSync(`./assets/datas/works.json`, 'utf-8'))
      projects.forEach((el)=>{
        routes_array.push('/work/'+el.slug)
      })
      return routes_array
    }
  },
  css: [
    {src: '~/assets/stylus/main.styl', lang: 'stylus'}
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    /*analyze: true,*/

    optimization: {
      splitChunks: {
        chunks: 'all'
      }
    },

    extend(config, {isDev,isClient}) {
      // inline svg support (replaces the old nuxt-svg module)
      config.module.rules.forEach((rule) => {
        if (rule.test && rule.test.toString().includes('svg') && !rule.resourceQuery) {
          rule.resourceQuery = { not: [/inline/] }
        }
      })
      config.module.rules.unshift({ test: /\.svg$/, resourceQuery: /inline/, loader: 'vue-svg-loader', options: { svgo: false } });

      [].concat(...config.module.rules.find(e => e.test.toString().match(/\.styl/)).oneOf.map(e => e.use.filter(e => e.loader && e.loader.includes('stylus-loader')))).forEach(stylus => {
          stylus.options = Object.assign(stylus.options || {}, {
              import: [
                '~assets/stylus/vars/index.styl'
              ]
          })
      });
    }
  }
}

