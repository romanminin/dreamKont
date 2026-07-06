import { defineConfig } from "vite";
import { resolve } from "path";
import handlebars from "vite-plugin-handlebars";
import autoprefixer from "autoprefixer";
import postcssCombineMediaQuery from "postcss-combine-media-query";
import postcssSortMediaQueries from "postcss-sort-media-queries";
import cssnano from "cssnano";

export default defineConfig({
  root: "./src",
  server: {
    host: "0.0.0.0", // Доступно для всех устройств в сети
    port: 5173, // Порт (можно изменить при необходимости)
  },
  build: {
    outDir: "./../dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: "/index.html",
        mainIndex: "/main.html",
        contacts: "/contacts.html",
        productItem: "/product-item.html",
        newsItem: "/news.html",
        news: "/news-item.html",
        portfolio: "/portfolio.html",
        team: "/team.html",
        about: "/about.html",
        page404: "/404.html",
      },
    },
  },
  publicDir: "./../public",
  css: {
    devSourcemap: true,
    postcss: {
      plugins: [
        autoprefixer(),
        postcssSortMediaQueries(),
        postcssCombineMediaQuery(),
        cssnano(),
      ],
    },
    preprocessorOptions: {
      scss: {
        api: "modern",
      },
    },
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, "./src/partials"),
    }),
  ],
});
