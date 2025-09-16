import { createContext, PropsWithChildren, useContext } from 'react';

interface DataTableContextValue {
  isLoading: boolean;
}

export const DataTableContext = createContext<DataTableContextValue>({
  isLoading: false,
});

export function DataTableProvider({
  children,
  isLoading,
}: PropsWithChildren<DataTableContextValue>) {
  return (
    <DataTableContext.Provider value={{ isLoading }}>
      {children}
    </DataTableContext.Provider>
  );
}

export function useDataTableContext() {
  return useContext(DataTableContext);
}
