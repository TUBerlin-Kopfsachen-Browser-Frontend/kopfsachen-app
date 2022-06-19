import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Radio,
  RadioGroup,
  Stack
} from '@chakra-ui/react'
import { m } from 'framer-motion';



export default function ChooseMoodForm({ onSubmit }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm()



  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor='type'>Please enter your mood here:</FormLabel>
        <RadioGroup>
          <Stack direction='row'>
            <Radio {...register("type", { required: true })} value='positive'>Positive</Radio>
            <Radio {...register("type", { required: true })} value='neutral'>Neutral</Radio>
            <Radio {...register("type", { required: true })} value='negative'>Negative</Radio>
          </Stack>
        </RadioGroup>
        <Input
          id='description'
          placeholder='description'
          {...register('description', {
            required: 'This is required',
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
        Submit
      </Button>
      <input type='hidden' id='timestamp' name='timestamp' value={new Date().toISOString()} {...register('timestamp')} />
    </form>
  )
}