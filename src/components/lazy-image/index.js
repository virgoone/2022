const supportObserver = !!wx.createIntersectionObserver

Component({
  data: {
    showed: false,
    loaded: false,
    error: false,
    filling: false,
    fillingStyle: '',
    image:
      'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
  },
  options: {
    // addGlobalClass: true,
  },
  externalClasses: ['image-class', 'container-class'],

  ready() {
    this.addObserver()
  },
  detached() {
    this.clean()
  },

  pageLifetimes: {
    show() {
      this.addObserver()
    },
  },

  properties: {
    src: {
      type: String,
      value: '',
    },
    placeholder: {
      type: String,
      value:
        'data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==',
    },
    errorImage: {
      type: String,
      value: '',
    },
    mode: {
      type: String,
      value: 'scaleToFill',
    },
    width: {
      type: Number,
    },
    height: {
      type: Number,
    },
    webp: {
      type: Boolean,
      value: false,
    },
    showMenuByLongpress: {
      type: Boolean,
      value: false,
    },
    styles: {
      type: String,
      value: '',
    },
    viewport: {
      type: Object,
      value: { bottom: 0 },
    },
  },

  methods: {
    clean() {
      if (this.observer) {
        this.observer.disconnect()
      }
      this.observer = null
    },
    onError(e) {
      const state = {
        loaded: true,
        error: true,
        image: this.data.errorImage || this.data.src,
      }
      this.setData(state)
      this.triggerEvent('error', {
        detail: e.detail,
      })
    },
    onLoad(e) {
      this.setData({ loaded: true })
      this.triggerEvent('load', {
        detail: e.detail,
      })
    },
    addObserver() {
      if (!supportObserver) {
        return this.setData({
          image: this.data.src,
          showed: true,
        })
      }

      if (this.observer || this.data.showed) {
        return
      }
      const { width, height } = this.data
      const filling = !!(width && height)
      const fillingStyle = filling
        ? `paddingTop: ${(height / width) * 100}%;`
        : ''
      this.setData({ image: this.data.placeholder, filling, fillingStyle })
      try {
        const observer = this.createIntersectionObserver(this, {
          thresholds: [1],
        })
        observer
          .relativeToViewport(this.properties.viewport)
          .observe('.lazyload-container', () => {
            this.setData({
              showed: true,
              image: this.data.src,
            })
            this.clean()
          })
        this.observer = observer
      } catch (e) {
        this.setData({
          image: this.data.src,
          showed: true,
        })
      }
    },
  },
})
