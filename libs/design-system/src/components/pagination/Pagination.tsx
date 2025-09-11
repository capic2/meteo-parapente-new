import { PropsWithChildren, ReactNode, useState } from 'react';
import { forwardRef } from 'react';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';
import { PaginationNavButton } from './parts/PaginationNavButton';
import { PaginationLink } from './parts/PaginationLink';

export const pagination = tv({
  slots: {
    base: 'flex gap-2 uy-relative',
    pagesList: 'flex gap-2 list-none m-0 p-0',
  },
});

export interface PaginationProps
  extends PropsWithChildren<VariantProps<typeof pagination>> {
  currentPage?: string;
  pagesList: string[];
  mode: 'standard' | 'simple';
  onNextPress?: () => void;
  onPreviousPress?: () => void;
  renderValue?: (value: string) => ReactNode;
}

const renderContent = ({
  pagesList,
  pageListClass,
  mode,
  currentPageIndex,
  renderValue,
}: {
  pagesList: PaginationProps['pagesList'];
  pageListClass: string;
  currentPageIndex?: number;
  mode: PaginationProps['mode'];
  renderValue?: PaginationProps['renderValue'];
}) => {
  if (mode === 'standard') {
    return pagesList.map((page, index) => {
      return (
        <ul className={pageListClass}>
          <li key={index}>
            <PaginationLink isActive={index === currentPageIndex}>
              {renderValue ? renderValue(page) : page}
            </PaginationLink>
          </li>
        </ul>
      );
    });
  }

  const page = pagesList.find((_, index) => index === currentPageIndex) ?? '';
  return (
    <PaginationLink isActive={true}>
      {renderValue ? renderValue(page) : page}
    </PaginationLink>
  );
};

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      children,
      currentPage,
      pagesList,
      onNextPress,
      onPreviousPress,
      renderValue,
      mode = 'standard',
      ...rest
    },
    ref
  ) => {
    const [currentPageIndex, setCurrentPageIndex] = useState<number>(
      pagesList.findIndex((page) => page === currentPage) ?? 0
    );
    console.log(currentPageIndex);
    const { base, pagesList: pageListClass } = pagination();

    const goToPage = (direction: 'previous' | 'next') => {
      if (direction === 'previous') {
        setCurrentPageIndex(currentPageIndex - 1);
      } else {
        setCurrentPageIndex(currentPageIndex + 1);
      }
    };

    return (
      <nav {...rest} ref={ref} className={base()}>
        <PaginationNavButton
          variant="previous"
          isDisabled={currentPageIndex === 0}
          onPress={() => {
            goToPage('previous');
            onPreviousPress?.();
          }}
        />
        {renderContent({
          pagesList,
          pageListClass: pageListClass(),
          mode,
          currentPageIndex,
          renderValue,
        })}
        <PaginationNavButton
          variant="next"
          isDisabled={currentPageIndex === pagesList.length - 1}
          onPress={() => {
            goToPage('next');
            onNextPress?.();
          }}
        />
      </nav>
    );
  }
);

Pagination.displayName = 'Pagination';

export { Pagination };
