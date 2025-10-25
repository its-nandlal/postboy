"use client";

import * as React from "react";
import { HotkeysProvider as RHKProvider } from "react-hotkeys-hook";

export function HotkeysProviderWrapper({ children, ...props }: React.ComponentProps<typeof RHKProvider>) {
  return <RHKProvider {...props}>{children}</RHKProvider>;
}
