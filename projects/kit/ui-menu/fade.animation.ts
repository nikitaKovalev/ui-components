import {
  animate,
  animation,
  keyframes,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';

export const fadeInRight = trigger('fadeInRight', [
  transition(':enter', [
    style({ transform: 'translateX(-100%)', opacity: 0 }),
    animate('350ms', style({ transform: 'translateX(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    style({ transform: 'translateX(0)', opacity: 1 }),
    animate('350ms', style({ transform: 'translateX(-100%)', opacity: 0 })),
  ]),
]);

export const fadeAnimations = {
  fadeIn: animation([
    style({ opacity: 0 }),
    animate(200, keyframes([style({ opacity: 0 }), style({ opacity: 1 })])),
  ]),

  fadeOut: animation([
    style({ opacity: 1 }),
    animate(200, keyframes([style({ opacity: 1 }), style({ opacity: 0 })])),
  ]),
};

export const fadeIn = trigger('fadeIn', [
  transition(':enter, * => *', useAnimation(fadeAnimations.fadeIn)),
]);

export const fadeOut = trigger('fadeOut', [
  transition(':leave', useAnimation(fadeAnimations.fadeOut)),
]);
