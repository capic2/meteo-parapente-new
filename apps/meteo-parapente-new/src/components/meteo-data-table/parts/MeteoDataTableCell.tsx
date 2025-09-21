import {
  MeteoPropertyType,
  MeteoType,
  StructureMeteoResponseType,
} from '@meteo-parapente-new/common-types';
import { DataTableCell, Tooltip } from '@meteo-parapente-new/design-system';

import { FormattedMessage } from 'react-intl';
import { isPropertyWithSubProperties } from '../../../utils/misc';
import { Fragment } from 'react';

interface MeteoDataTableCellProps {
  structure: StructureMeteoResponseType;
  data: MeteoType[number] | undefined;
  range: string;
  label: string;
  id: string;
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

const MeteoDataTableCell = ({ structure, data, range, label, id }: MeteoDataTableCellProps) => {
  if (!data) {
    return null;
  }

  return (
    <DataTableCell>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2">
        {isPropertyWithSubProperties(data, structure,id) ? (
          <>
            {Object.entries(data.properties).map(([key, value]) => {
              return renderValue({
                label,
                valuesByProvider: value,
                range,
              });
            })}
          </>
        ) : (
          renderValue({
            label,
            valuesByProvider: data,
            range,
          })
        )}
      </div>
    </DataTableCell>
  );
};

export { MeteoDataTableCell };
