module.exports = {
  plugins: {
    //呼び出すプラグインを記述していく
    autoprefixer: {},
    cssnano: {
      preset: [
        "default",{
          minifyFontValues: {
            removeQuotes: false,
          },
        }
      ]
    }
  },
}