import {
  Focusable,
  OverlayArrow,
  Tooltip as AriaTooltip,
  TooltipTrigger,
  TooltipTriggerComponentProps,
} from 'react-aria-components';
import { forwardRef, ReactElement, ReactNode } from 'react';
import { DOMAttributes } from '@react-types/shared';
import { tv } from 'tailwind-variants';

export interface TooltipProps
  extends Omit<TooltipTriggerComponentProps, 'children'> {
  children: ReactElement<DOMAttributes, string>;
  content: ReactNode;
}

const tooltip = tv({
  slots: {
    base: '',
    tooltip:
      'inline-flex rounded pl-2 pr-2 pt-1 pb-1 max-w-[300px] text-white bg-black',
  },
});

const Tooltip = forwardRef<HTMLDivElement, TooltipProps>(
  ({ children, content, ...rest }, ref) => {
    const { tooltip: tooltipCss } = tooltip();

    return (
      <TooltipTrigger {...rest}>
        <Focusable>
          <span role="button">{children}</span>
        </Focusable>
        <AriaTooltip className={tooltipCss()} ref={ref}>
          <OverlayArrow>
            <svg width={8} height={8} viewBox="0 0 8 8">
              <path d="M0 0 L4 4 L8 0" />
            </svg>
          </OverlayArrow>
          {content}
        </AriaTooltip>
      </TooltipTrigger>
    );
  }
);

export { Tooltip };
