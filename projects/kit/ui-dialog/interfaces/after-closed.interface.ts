import { DialogCloseType } from '../types';

export interface AfterClosed<T> {
  type: DialogCloseType;
  data: T | undefined | null;
}