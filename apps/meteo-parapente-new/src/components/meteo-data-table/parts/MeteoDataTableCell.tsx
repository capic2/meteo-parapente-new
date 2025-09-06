import {
  MeteoPropertyType,
  MeteoPropertyWithSubPropertiesType,
  MeteoType,
} from '@meteo-parapente-new/common-types';
import { DataTableCell, Tooltip } from '@meteo-parapente-new/design-system';

import { FormattedMessage } from 'react-intl';

interface MeteoDataTableCellProps {
  data: MeteoType['data'][number];
  range: string;
}

function isPropertyWithSubProperties(
  data: MeteoDataTableCellProps['data']
): data is MeteoPropertyWithSubPropertiesType {
  return 'properties' in data;
}

const renderValue = ({
  label,
  valuesByProvider,
  range,
}: {
  label: string;
  valuesByProvider: MeteoPropertyType;
  range: string;
}) => {
  return (
    <div className="grid grid-cols-2 gap-x-2">
      <div className="flex gap-1">
        <Tooltip content={<FormattedMessage id={label} />}>
          <span>{valuesByProvider.ranges?.[range].meteoBlue}</span>
        </Tooltip>
        {valuesByProvider.unit && (
          <span className="text-xs self-center">{valuesByProvider.unit}</span>
        )}
      </div>
      <div className="flex gap-1">
        <Tooltip content={<FormattedMessage id={label} />}>
          <span>{valuesByProvider.ranges?.[range].meteoParapente}</span>
        </Tooltip>
        {valuesByProvider.unit && (
          <span className="text-xs self-center">{valuesByProvider.unit}</span>
        )}
      </div>
    </div>
  );
};

const MeteoDataTableCell = ({ data, range }: MeteoDataTableCellProps) => {
  return (
    <DataTableCell>
      <div>
        {isPropertyWithSubProperties(data) ? (
          <>
            {Object.entries(data.properties).map(([key, value]) => {
              const propertyName = key as keyof (typeof data)['properties'];
              return renderValue({
                label: data.properties[propertyName].label,
                valuesByProvider: value,
                range,
              });
            })}
          </>
        ) : (
          renderValue({
            label: data.label,
            valuesByProvider: data,
            range,
          })
        )}
      </div>
    </DataTableCell>
  );
};

export { MeteoDataTableCell };
