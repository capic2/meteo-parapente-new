import { FormattedMessage } from 'react-intl';
import { DataTableRowHeader } from '@meteo-parapente-new/design-system';
import { StructureMeteoResponseType } from '@meteo-parapente-new/common-types';

const MeteoDataTableRowHeader = ({
  property,
}: {
  property: StructureMeteoResponseType['properties'][number];
}) => {
  return (
    <DataTableRowHeader>
      {'properties' in property ? (
        <div className="grid grid-cols-2 gap-x-2 gap-y-2">
          <span className="self-center row-span-3">
            <FormattedMessage id={property.label} />
          </span>

          {property.properties?.map((subProperty, index) => (
            <span key={`${subProperty.label}-${index}`}>
              <FormattedMessage id={subProperty.label} />
            </span>
          ))}
        </div>
      ) : (
        <FormattedMessage id={property.label} />
      )}
    </DataTableRowHeader>
  );
};

export { MeteoDataTableRowHeader };
