import type { TextField } from '@payloadcms/plugin-form-builder/types'
import type { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'

import { Error } from '../Error'
import { Width } from '../Width'
import { getErrorMessage } from '@/utilities/getErrorMessage'

export const Text: React.FC<
  TextField & {
    errors: Partial<
      FieldErrorsImpl<{
        [x: string]: any
      }>
    >
    register: UseFormRegister<FieldValues>
  }
> = ({ name, defaultValue, errors, label, register, required: requiredFromProps, width }) => {

  return (
    <Width width={width}>
      <div className="flex mb-2 gap-[5px]">

        <Label htmlFor={name}>{label}</Label>
        {requiredFromProps && errors[name] &&
          <Error message={getErrorMessage({ errorType: 'required', label })} />}
      </div>
      <Input
        defaultValue={defaultValue}
        id={name}
        type="text"
        {...register(name, { required: requiredFromProps })}
      />
    </Width>
  )
}
