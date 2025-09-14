import {
  MeteoPropertyType,
  MeteoType,
} from '@meteo-parapente-new/common-types';
import { DataTableCell, Tooltip } from '@meteo-parapente-new/design-system';

import { FormattedMessage } from 'react-intl';
import { isPropertyWithSubProperties } from '../../../utils/misc';
import { Fragment } from 'react';

interface MeteoDataTableCellProps {
  data: MeteoType['data'][number];
  range: string;
}

const renderProviderValue = ({
  label,
  valuesByProvider,
  range,
  provider,
}: {
  label: string;
  valuesByProvider: MeteoPropertyType;
  range: string;
  provider: 'meteoBlue' | 'meteoParapente';
}) => {
  return (
    <div className="flex gap-1 justify-center">
      <Tooltip content={<FormattedMessage id={label} />}>
        {Array.isArray(valuesByProvider.ranges?.[range][provider]) ? (
          <div className="flex flex-row gap-2">
            {valuesByProvider.ranges?.[range][provider].map((value, index) => (
              <span key={`${value}${index}`}>{value}</span>
            ))}
          </div>
        ) : (
          <span>{valuesByProvider.ranges?.[range][provider]}</span>
        )}
      </Tooltip>
      {valuesByProvider.unit &&
        valuesByProvider.ranges?.[range][provider] !== '_' && (
          <span className="text-xs self-center">{valuesByProvider.unit}</span>
        )}
    </div>
  );
};

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
    <Fragment key={label}>
      <div>
        {renderProviderValue({
          label,
          range,
          valuesByProvider,
          provider: 'meteoBlue',
        })}
      </div>
      <div>
        {renderProviderValue({
          label,
          range,
          valuesByProvider,
          provider: 'meteoParapente',
        })}
      </div>
    </Fragment>
  );
};

const MeteoDataTableCell = ({ data, range }: MeteoDataTableCellProps) => {
  return (
    <DataTableCell>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {isPropertyWithSubProperties(data) ? (
          <>
            {Object.entries(data.properties).map(([key, value]) => {
              const propertyName = key as keyof typeof data['properties'];
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
