import { Injectable } from '@angular/core';

import { UIIcon } from './ui-icons';

@Injectable({ providedIn: 'root' })
export class UiIconService {
  private readonly _registry = new Map<string, string>();

  registry(icons: UIIcon[]): void {
    icons.forEach((icon: UIIcon) => this._registry.set(icon.name, icon.data));
  }

  getIcon(name: string): string {
    if (!this._registry.has(name)) {
      console.warn(
        `Icon with the name ${name} could not be found, did you add it to the Icon registry?`,
      );
    }

    return this._registry.get(name) ?? '';
  }
}
