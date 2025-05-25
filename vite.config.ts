import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import svgr from "vite-plugin-svgr"
import { name } from "./package.json"

const genBaseUrl = (mode) => {
  // 优先使用环境变量
  if (process.env.VITE_BASE_URL) {
    return process.env.VITE_BASE_URL
  }
  if (mode !== "development") {
    if (mode == "test") {
      return `/${name}-test/`
    }
    // 对于 Vercel/Netlify 部署，使用根路径
    return "/"
  }
  return "/"
}

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    base: genBaseUrl(mode),
    build: {
      // cssCodeSplit: false,
      // target: "es2015",
    },
    server: {
      watch: {
        // usePolling: true
      },
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          // icon: true,
          // typescript: true,
        },
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern",
        },
      },
      modules: {
        // hashPrefix: 'hash',
        // generateScopedName: "[name]__[local]__[hash:base64:2]",
        // globalModulePaths: [
        //   /.*\\.global\\..*/
        // ]
      },
      postcss: {
        plugins: [],
      },
    },
  }
})
