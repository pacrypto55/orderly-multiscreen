import type { Meta, StoryObj } from "@storybook/react";
import { MultiScreen } from "./MultiScreen";

// Storybook preview for the marketplace listing. @orderly.network/hooks and
// @orderly.network/trading are swapped for lightweight mocks (see
// .storybook/main.ts) so this renders standalone, with no live broker
// connection or brokerId involved — it demonstrates the dual-panel layout
// this plugin adds, not real trading data.
const meta: Meta<typeof MultiScreen> = {
  title: "Multi-screen",
  component: MultiScreen,
};

export default meta;

type Story = StoryObj<typeof MultiScreen>;

export const Default: Story = {};
