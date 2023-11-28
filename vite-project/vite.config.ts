import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import Components from "unplugin-vue-components/vite";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    define: {
      "process.env": { ...env },
    },
    plugins: [
      vue({ script: { propsDestructure: true } }),
      Components({
        resolvers: [
          AntDesignVueResolver({
            importStyle: false,
          }),
        ],
      }),
    ],
  });
};
