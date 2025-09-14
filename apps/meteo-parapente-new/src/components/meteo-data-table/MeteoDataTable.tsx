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
  meteoResponse: MeteoType;
}

const MeteoDataTable = ({ meteoResponse }: MeteoDataTableProps) => {
  return (
    <DataTable aria-label="MeteoDataTable">
      <DataTableHeader>
        <DataTableColumn isRowHeader={true} />
        {meteoResponse.structure.hourRanges.map((hourRange) => (
          <DataTableColumn key={hourRange} isRowHeader={true}>
            <div className="flex flex-col items-center">
              <span>{hourRange}</span>
              <div className="flex justify-between w-full">
                <span className="w-full text-center">MeteoBlue</span>
                <span className="w-full text-center">MeteoParapente</span>
              </div>
            </div>
          </DataTableColumn>
        ))}
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
