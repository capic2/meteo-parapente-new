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
    <DataTable>
      <DataTableHeader>
        <DataTableColumn />
        {meteoResponse.structure.hourRanges.map((hourRange) => (
          <DataTableColumn>
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
        {meteoResponse.structure.properties.map((property) => {
          return (
            <DataTableRow key={property}>
              <DataTableRowHeader>
                {isPropertyWithSubProperties(meteoResponse.data[property]) ? (
                  <div className="flex flex-row  gap-2">
                    <span className="self-center">
                      <FormattedMessage
                        id={meteoResponse.data[property].label}
                      />
                    </span>

                    <div className="flex flex-col">
                      {Object.values(
                        meteoResponse.data[property].properties
                      ).map((subProperty) => (
                        <span>
                          <FormattedMessage id={subProperty.label} />
                        </span>
                      ))}
                    </div>
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
