import {
  DataTable,
  DataTableBody,
  DataTableColumn,
  DataTableHeader,
  DataTableRow,
  DataTableRowHeader,
} from '@meteo-parapente-new/design-system';
import { MeteoDataTableCell } from './parts/MeteoDataTableCell.tsx';
import { FormattedMessage } from 'react-intl';
import { MeteoType } from '@meteo-parapente-new/common-types';

interface MeteoDataTableProps {
  meteoResponse: MeteoType;
}

const MeteoDataTable = ({ meteoResponse }: MeteoDataTableProps) => {
  return (
    <DataTable>
      <DataTableHeader>
        <DataTableColumn />
        {meteoResponse.structure.hourRanges.map((hourRange) => (
          <DataTableColumn>{hourRange}</DataTableColumn>
        ))}
      </DataTableHeader>
      <DataTableBody>
        {meteoResponse.structure.properties.map((property) => {
          return (
            <DataTableRow>
              <DataTableRowHeader>
                <FormattedMessage
                  id={meteoResponse.data[property].label}
                  defaultMessage="Wind"
                />
              </DataTableRowHeader>
              {meteoResponse.structure.hourRanges.map((hourRange) => {
                return (
                  <MeteoDataTableCell
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
