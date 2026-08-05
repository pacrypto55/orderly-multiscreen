import path from "node:path";
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (viteConfig) => {
    viteConfig.resolve = viteConfig.resolve ?? {};
    viteConfig.resolve.alias = [
      ...(Array.isArray(viteConfig.resolve.alias) ? viteConfig.resolve.alias : []),
      {
        find: "@orderly.network/hooks",
        replacement: path.resolve(__dirname, "mocks/orderly-hooks.tsx"),
      },
      {
        find: "@orderly.network/trading",
        replacement: path.resolve(__dirname, "mocks/orderly-trading.tsx"),
      },
    ];
    return viteConfig;
  },
};

export default config;
