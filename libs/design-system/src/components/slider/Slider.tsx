import { ForwardedRef, forwardRef, JSX } from 'react';

import { tv } from 'tailwind-variants';
import {
  Label,
  SliderOutput,
  SliderProps as AriaSliderProps,
  Slider as AriaSlider,
  SliderThumb,
  SliderTrack,
} from 'react-aria-components';
import { twMerge } from 'tailwind-merge';

const trackStyles = tv({
  base: 'rounded-full',
  variants: {
    orientation: {
      horizontal: 'w-full h-[6px]',
      vertical: 'h-full w-[6px] ml-[50%] -translate-x-[50%]',
    },
    isDisabled: {
      false:
        'bg-neutral-300 dark:bg-neutral-700 forced-colors:bg-[ButtonBorder]',
      true: 'bg-neutral-200 dark:bg-neutral-800 forced-colors:bg-[ButtonBorder]',
    },
  },
});

const fillStyles = tv({
  base: 'absolute rounded-full',
  variants: {
    orientation: {
      horizontal: 'w-(--size) h-[6px] start-(--start,0)',
      vertical:
        'h-(--size) w-[6px] bottom-(--start,0) ml-[50%] -translate-x-[50%]',
    },
    isDisabled: {
      false: 'bg-blue-500 forced-colors:bg-[Highlight]',
      true: 'bg-neutral-300 dark:bg-neutral-600 forced-colors:bg-[GrayText]',
    },
  },
});

const thumbStyles = tv({
  base: 'w-4.5 h-4.5 group-orientation-horizontal:mt-5 group-orientation-vertical:ml-2.5 rounded-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-700 dark:border-neutral-300',
  variants: {
    isDragging: {
      true: 'bg-neutral-700 dark:bg-neutral-300 forced-colors:bg-[ButtonBorder]',
    },
    isDisabled: {
      true: 'border-neutral-300 dark:border-neutral-700 forced-colors:border-[GrayText]',
    },
  },
});

export interface SliderProps<T> extends Omit<AriaSliderProps<T>, 'className'> {
  label?: string;
  className?: string;
  thumbLabels?: string[];
}

const SliderImpl = <T extends number | number[]>(
  {
    className,
    label,
    thumbLabels,
    orientation = 'horizontal',
    maxValue,
    minValue,
    step,
    value,
    onChange,
    ...rest
  }: SliderProps<T>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <AriaSlider
      {...rest}
      maxValue={maxValue}
      minValue={minValue}
      step={step}
      value={value}
      onChange={onChange}
      orientation={orientation}
      className={twMerge(
        className,
        'font-sans orientation-horizontal:grid orientation-vertical:flex grid-cols-[1fr_auto] flex-col items-center gap-2 orientation-horizontal:w-64 orientation-horizontal:max-w-[calc(100%-10px)]'
      )}
    >
      <Label>{label}</Label>
      <SliderOutput className="text-sm text-neutral-500 dark:text-neutral-400 orientation-vertical:hidden">
        {({ state }) =>
          state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')
        }
      </SliderOutput>
      <SliderTrack className="group col-span-2 orientation-horizontal:h-5 orientation-vertical:w-5 orientation-vertical:h-38 flex items-center">
        {({ state, ...renderProps }) => (
          <>
            <div
              className={trackStyles({ orientation: renderProps.orientation })}
            />
            {state.values.length === 1 ? (
              // Single thumb, render fill from the end
              <div
                className={fillStyles({ orientation: renderProps.orientation })}
                style={
                  { '--size': state.getThumbPercent(0) * 100 + '%' } as any
                }
              />
            ) : state.values.length === 2 ? (
              // Range slider, render fill between the thumbs
              <div
                className={fillStyles({ orientation: renderProps.orientation })}
                style={
                  {
                    '--start': state.getThumbPercent(0) * 100 + '%',
                    '--size':
                      (state.getThumbPercent(1) - state.getThumbPercent(0)) *
                        100 +
                      '%',
                  } as any
                }
              />
            ) : null}
            {state.values.map((_, i) => (
              <SliderThumb
                key={i}
                index={i}
                aria-label={thumbLabels?.[i]}
                className={thumbStyles({ isDisabled: renderProps.isDisabled })}
              />
            ))}
          </>
        )}
      </SliderTrack>
    </AriaSlider>
  );
};

type SliderComponent = (<T>(
  props: SliderProps<T> & {
    ref?: ForwardedRef<HTMLDivElement>;
  }
) => JSX.Element) & {
  displayName?: string;
};

const Slider = forwardRef(function DSSlider<T extends number | number[]>(
  props: SliderProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return SliderImpl<T>(props, ref);
}) as SliderComponent;

Slider.displayName = 'Slider';

export { Slider };
