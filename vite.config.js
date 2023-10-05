import { defineConfig } from "vite";

// rollup
import { resolve } from "path";
import * as dotenv from "dotenv";
import handlebars from "vite-plugin-handlebars";
import { pageData } from "./handlebars";
import { transform } from "esbuild";

const result = dotenv.config();
if (result.error) throw result.error;

function createDate() {
  const now = new Date(),
    year = now.getFullYear(),
    month = now.getMonth() + 1,
    date = now.getDate();
  return `${year}${month}${date}`;
}
const DATE = createDate();

const config = {
  root: "src",
  dist: "dist",
  public: "public",
};

export default defineConfig({
  server: { host: true },
  base: "./", //相対パスでビルドする
  root: config.root, //開発ディレクトリ設定
  publicDir: resolve(__dirname, config.public),
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    outDir: resolve(__dirname, config.dist), //出力場所の指定
    emptyOutDir: true,
    minify: false,
    chunkSizeWarningLimit: 100000000,
    rollupOptions: {
      //ファイル出力設定
      output: {
        entryFileNames: `assets/js/main.[hash].${DATE}.js`,
        assetFileNames: (assetInfo) => {
          console.log(assetInfo);
          if (assetInfo.name === "index.css") {
            return `assets/css/style.[hash].${DATE}.css`;
          }
          return `assets/[name].[hash].${DATE}.[ext]`;
        },
        chunkFileNames: `assets/[name].[hash].${DATE}.js`,
      },
      // input: inputFiles,
      input: {
        index: resolve(__dirname, "./src/index.html"),
        about: resolve(__dirname, "./src/about/index.html"),
      },
    },
  },
  plugins: [
    handlebars({
      //コンポーネントの格納ディレクトリを指定
      partialDirectory: resolve(__dirname, "./src/components"),
      context(pagePath) {
        return pageData[pagePath];
      },
    }),
    {
      name: "minify-js-with-esbuild",
      apply: "build",
      async generateBundle(_, bundle) {
        for (const name in bundle) {
          const file = bundle[name];
          if (file.type === "chunk") {
            const result = await transform(file.code, {
              minify: true,
              format: "esm",
              charset: "utf8",
            });
            file.code = result.code;
          }
        }
      },
    },
  ],
});
