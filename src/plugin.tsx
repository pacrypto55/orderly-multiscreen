import { createInterceptor } from "@orderly.network/plugin-core";
import type { OrderlySDK, PluginRegistrationFn } from "@orderly.network/plugin-core";
// Type-only import: loads @orderly.network/ui-scaffold's ambient module
// augmentation of InterceptorTargetPropsMap so 'Layout.MainMenus' below is
// typed (MainNavItemsProps). Erased at build time, no runtime dependency.
import type {} from "@orderly.network/ui-scaffold";

export interface MultiScreenNavItem {
  name?: string;
  href?: string;
}

const DEFAULT_NAV_ITEM: Required<MultiScreenNavItem> = {
  name: "Multi-screen",
  href: "/multiscreen",
};

export interface RegisterMultiScreenPluginOptions {
  /**
   * Customize the auto-injected "Multi-screen" main-nav menu entry.
   * Pass `null` to skip nav injection (e.g. if you add the link yourself).
   */
  navItem?: MultiScreenNavItem | null;
}

/**
 * Registers the multiscreen plugin with the Orderly SDK.
 *
 * This injects a "Multi-screen" entry into the main navigation menu via the
 * `Layout.MainMenus` interceptor. It does NOT register the `/multiscreen`
 * route itself — the Orderly plugin system has no route/page injection target
 * yet, so the host app still needs to mount `MultiScreen` at that route.
 * See the package README for the two-line router snippet.
 *
 * Usage:
 * ```tsx
 * import { registerMultiscreenPlugin } from '@orderly-plugins/multiscreen';
 *
 * <OrderlyAppProvider plugins={[registerMultiscreenPlugin()]} ...>
 * ```
 */
export function registerMultiscreenPlugin(
  options: RegisterMultiScreenPluginOptions = {}
): PluginRegistrationFn {
  const navItem =
    options.navItem === null
      ? null
      : { ...DEFAULT_NAV_ITEM, ...options.navItem };

  return (SDK: OrderlySDK) => {
    SDK.registerPlugin({
      id: "multiscreen",
      name: "Multi-screen",
      interceptors: navItem
        ? [
            createInterceptor("Layout.MainMenus", (Original, props) => {
              const items = Array.isArray(props.items) ? props.items : [];
              const alreadyPresent = items.some(
                (item) => item.href === navItem.href
              );
              return (
                <Original
                  {...props}
                  items={alreadyPresent ? items : [...items, navItem]}
                />
              );
            }),
          ]
        : [],
    });
  };
}
