import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { m } from "framer-motion";

export default function ChooseMoodForm({ onSubmit }) {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl isInvalid={errors.name}>
        <FormLabel htmlFor="mood_type">Please enter your mood here:</FormLabel>
        <RadioGroup>
          <Stack m={10}>
            <Radio
              {...register("mood_type", { required: true })}
              value="positive"
              size="md"
            >
              😄 Positive
            </Radio>
            <Radio
              {...register("mood_type", { required: true })}
              value="neutral"
              size="md"
            >
              😐 Neutral
            </Radio>
            <Radio
              {...register("mood_type", { required: true })}
              value="negative"
              size="md"
            >
              😞 Negative
            </Radio>
          </Stack>
        </RadioGroup>
        <FormLabel htmlFor="mood_type">Enter more detail here:</FormLabel>
        <Textarea
          id="description"
          placeholder="description"
          {...register("mood_descr", {
            required: "This is required",
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>
      <Button
        mt={4}
        isLoading={isSubmitting}
        type="submit"
        colorScheme="primary"
      >
        Submit
      </Button>
      <input
        type="hidden"
        id="mood_day"
        name="mood_day"
        value={new Date().toISOString()}
        {...register("mood_day")}
      />
    </form>
  );
}
