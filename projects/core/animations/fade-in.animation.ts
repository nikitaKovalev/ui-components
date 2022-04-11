import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(-5px)' }),
    animate('300ms ease-in-out'),
  ]),
  state(':leave', style({ opacity: 1, transform: 'translateY(0%)' })),
]);