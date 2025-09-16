import {
  DataTable,
  DataTableBody,
  DataTableColumn,
  DataTableHeader,
  DataTableRow,
  DataTableRowHeader,
} from '@meteo-parapente-new/design-system';
import { MeteoDataTableCell } from './parts/MeteoDataTableCell';
import { FormattedMessage } from 'react-intl';
import { MeteoType } from '@meteo-parapente-new/common-types';
import { isPropertyWithSubProperties } from '../../utils/misc';

interface MeteoDataTableProps {
  meteoResponse: MeteoType | undefined;
  isLoading?: boolean;
}

const MeteoDataTable = ({ meteoResponse, isLoading }: MeteoDataTableProps) => {

  return (
    <DataTable aria-label="MeteoDataTable" isLoading={isLoading}>
      <DataTableHeader
        columns={[
          { id: 'row', name: '', isRowHeader: false },
          ...meteoResponse.structure.hourRanges.map((hourRange) => ({
            id: hourRange,
            name: hourRange,
            isRowHeader: false,
          })),
        ]}
      >
        {(column) => (
          <DataTableColumn isRowHeader={column.isRowHeader}>
            <div className="flex flex-col items-center">
              <span>{column.name}</span>
              <div className="flex justify-between w-full">
                <span className="w-full text-center">MeteoBlue</span>
                <span className="w-full text-center">MeteoParapente</span>
              </div>
            </div>
          </DataTableColumn>
        )}
      </DataTableHeader>
      <DataTableBody>
        {meteoResponse.structure.properties.map((property, index) => {
          return (
            <DataTableRow key={`${property}-${index}`}>
              <DataTableRowHeader>
                {isPropertyWithSubProperties(meteoResponse.data[property]) ? (
                  <div className="grid grid-cols-2 gap-x-2">
                    <span className="self-center row-span-3">
                      <FormattedMessage
                        id={meteoResponse.data[property].label}
                      />
                    </span>

                    {Object.values(meteoResponse.data[property].properties).map(
                      (subProperty, index) => (
                        <span key={`${subProperty.label}-${index}`}>
                          <FormattedMessage id={subProperty.label} />
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <FormattedMessage id={meteoResponse.data[property].label} />
                )}
              </DataTableRowHeader>
              {meteoResponse.structure.hourRanges.map((hourRange) => {
                return (
                  <MeteoDataTableCell
                    key={`${property}-${hourRange}`}
                    data={meteoResponse.data[property]}
                    range={hourRange}
                  />
                );
              })}
            </DataTableRow>
          );
        })}
      </DataTableBody>
    </DataTable>
  );
};

export { MeteoDataTable };
