import {
  DataTable,
  DataTableBody,
  DataTableCell,
  DataTableHeader,
  DataTableRow,
  Spinner,
} from '@meteo-parapente-new/design-system';
import {
  MeteoType,
  StructureMeteoResponseType,
} from '@meteo-parapente-new/common-types';
import { buildHeader } from './buildContent';
import { MeteoDataTableCell } from './parts/MeteoDataTableCell';
import { MeteoDataTableRowHeader } from './parts/MeteoDataTableRowHeader';

export interface MeteoDataTableProps {
  structure: StructureMeteoResponseType;
  meteoResponse: MeteoType | undefined;
  isLoading?: boolean;
}

const MeteoDataTable = ({
  structure,
  meteoResponse,
  isLoading,
}: MeteoDataTableProps) => {
  const headers = buildHeader(structure);

  return (
    <DataTable aria-label="MeteoDataTable" isLoading={isLoading}>
      <DataTableRow>
        {headers.map((header) => (
          <DataTableHeader>
            {!header.isRowHeader && (
              <div className="flex flex-col items-center">
                <span>{header.name}</span>
                <div className="flex justify-between w-full">
                  <span className="w-full text-center">MeteoBlue</span>
                  <span className="w-full text-center">MeteoParapente</span>
                </div>
              </div>
            )}
          </DataTableHeader>
        ))}
      </DataTableRow>
      <DataTableBody
        renderLoadingBodyContentState={structure.properties.map(
          (property, index) => {
            return (
              <DataTableRow key={property.id}>
                <MeteoDataTableRowHeader property={property} />
                {index === 0 && (
                  <DataTableCell colSpan={999} rowSpan={999}>
                    <div className="flex flex-col justify-center py-8 items-center">
                      <Spinner />
                    </div>
                  </DataTableCell>
                )}
              </DataTableRow>
            );
          }
        )}
      >
        {structure.properties.map((property) => {
          return (
            <DataTableRow key={property.id}>
              <MeteoDataTableRowHeader property={property} />
              {structure.hourRanges.map((range) => (
                <MeteoDataTableCell
                  id={property.id}
                  structure={structure}
                  data={meteoResponse?.[property.id]}
                  range={range}
                  label={property.label}
                />
              ))}
            </DataTableRow>
          );
        })}
      </DataTableBody>
    </DataTable>
  );
};

export { MeteoDataTable };
