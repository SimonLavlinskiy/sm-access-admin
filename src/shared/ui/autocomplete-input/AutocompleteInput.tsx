import { FC } from 'react'
import {
  AutocompleteInput as ReactAutocompleteInput,
  AutocompleteInputProps,
  FilterPayload,
  ReferenceInput,
} from 'react-admin'
import cn from 'classnames'

export interface CustomAutocompleteInputProps extends AutocompleteInputProps {
  source: string
  reference: string
  link?: boolean
  className?: string
  customFilter?: FilterPayload
  isEdit?: boolean
}

export const AutoсompleteInput: FC<CustomAutocompleteInputProps> = ({
  className = '',
  source,
  reference,
  label = '',
  fullWidth = true,
  link,
  emptyText = '',
  customFilter,
  isEdit,
  ...rest
}) => {
  return (
    <ReferenceInput
      key={source + reference}
      source={isEdit ? `${source}.id` : source}
      reference={reference}
      helperText={false}
      emptyText={emptyText}
      link={link}
      fullWidth
      filter={customFilter}
    >
      <ReactAutocompleteInput
        label={label}
        variant='filled'
        fullWidth={fullWidth}
        {...rest}
        filterToQuery={rest.filterToQuery || ((searchText: string) => ({ name: searchText }))}
        source={isEdit ? `${source}.id` : source}
        className={cn('!mt-0 w-full h-fit', {
          [className]: className,
        })}
        TextFieldProps={{
          ...rest.TextFieldProps,
          className: cn('', {
            [rest.TextFieldProps?.className || '']: rest.TextFieldProps?.className,
          }),
        }}
        ListboxProps={{
          ...rest.ListboxProps,
          className: cn('', {
            [rest.ListboxProps?.className || '']: rest.ListboxProps?.className,
          }),
        }}
      />
    </ReferenceInput>
  )
}
