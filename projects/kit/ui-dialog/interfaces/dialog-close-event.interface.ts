import { DialogCloseType } from '../types/dialog-close.type';

export interface DialogCloseEvent<R> {
  type: DialogCloseType;
  data: R;
}
