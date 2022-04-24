import { OverlayConfig } from '@angular/cdk/overlay';
import { Provider } from '@angular/core';
import { OVERLAY_CONFIG } from '@ui-components/core/tokens';

export const OVERLAY_CONFIG_PROVIDER: Provider[] = [
  {
    provide: OVERLAY_CONFIG,
    useValue: new OverlayConfig({
      maxHeight: 120,
      disposeOnNavigation: true,
    }),
  },
];
