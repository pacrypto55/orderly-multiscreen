import { Outlet } from "react-router-dom";
import { Scaffold } from "@orderly.network/ui-scaffold";

export interface MultiScreenLayoutProps {
  /** Main navigation props from your app's config.scaffold.mainNavProps */
  mainNavProps: any;
  /** Footer props from your app's config.scaffold.footerProps */
  footerProps?: any;
  /** Bottom navigation props from your app's config.scaffold.bottomNavProps */
  bottomNavProps?: any;
  /** Route change handler from your app's navigation */
  onRouteChange: (options: { href: string; name: string }) => void;
}

/**
 * Layout wrapper for the multiscreen route.
 * Wraps the multiscreen page in the Orderly Scaffold with proper navigation.
 *
 * Usage in your router:
 * ```tsx
 * import { MultiScreenLayout, MultiScreen } from '@orderly-plugins/multiscreen';
 *
 * <Route element={<MultiScreenLayout {...layoutProps} />}>
 *   <Route index element={<MultiScreen {...screenProps} />} />
 * </Route>
 * ```
 */
export function MultiScreenLayout({
  mainNavProps,
  footerProps,
  bottomNavProps,
  onRouteChange,
}: MultiScreenLayoutProps) {
  return (
    <Scaffold
      mainNavProps={{
        ...mainNavProps,
        initialMenu: "/multiscreen",
      }}
      footerProps={footerProps}
      routerAdapter={{
        onRouteChange,
      }}
      bottomNavProps={bottomNavProps}
    >
      <Outlet />
    </Scaffold>
  );
}
