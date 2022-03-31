import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeInMessages = trigger('fadeInMessages', [
  state('enter', style({ opacity: 1, transform: 'translateY(0%)' })),
  transition('void => enter', [
    style({ opacity: 0, transform: 'translateY(-5px)' }),
    animate('300ms ease-in-out'),
  ]),
]);