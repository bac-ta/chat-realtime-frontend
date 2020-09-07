import {animate, animateChild, group, query, state, style, transition, trigger} from '@angular/animations';

export const slider =
  trigger('routeAnimations', [
    transition('isLeft <=> isRight', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '100%'
        })
      ]),
query(':enter', [
        style({ left: '-100%' })
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('300ms ease-out', style({ left: '100%' }))
        ]),
        query(':enter', [
          animate('300ms ease-out', style({ left: '0%' }))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
  ]);

function slideTo(direction): any {
  const optional = { optional: true };
  return [
    query(':enter, :leave', [
      style({
        position: 'absolute',
        top: 0,
        [direction]: 0,
        width: '100%'
      })
    ], optional),
    query(':enter', [
      style({ [direction]: '-100%'})
    ]),
    group([
      query(':leave', [
        animate('600ms ease', style({ [direction]: '100%'}))
      ], optional),
      query(':enter', [
        animate('600ms ease', style({ [direction]: '0%'}))
      ])
    ]),
    // Normalize the page style... Might not be necessary

    // Required only if you have child animations on the page
    // query(':leave', animateChild()),
    // query(':enter', animateChild()),
  ];
}


export const slideDown =
  trigger('slideInOut', [
    state('in', style({
      height: 'auto', opacity: '1', visibility: 'visible'
    })),
    state('out', style({
      height: '0px', opacity: '0', visibility: 'hidden'
    })),
    transition('in => out', [group([
        animate('400ms ease-in-out', style({
          opacity: '0'
        })),
        animate('600ms ease-in-out', style({
          height: '0px'
        })),
        animate('700ms ease-in-out', style({
          visibility: 'hidden'
        }))
      ]
    )]),
    transition('out => in', [group([
        animate('1ms ease-in-out', style({
          visibility: 'visible'
        })),
        animate('600ms ease-in-out', style({
          height: 'auto'
        })),
        animate('800ms ease-in-out', style({
          opacity: '1'
        }))
      ]
    )])
  ]);
