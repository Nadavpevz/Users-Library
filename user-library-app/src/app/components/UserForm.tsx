"use client";
import React from "react";
import { IUser } from "../types";
import {
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Grid,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";
import {
  useForm,
  SubmitHandler,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { addUser, editUser } from "@/lib/features/users/usersSlice";
import { useAppSelector } from "@/lib/hooks";

const UserForm: React.FC<{
  user?: IUser;
  onClose: () => void;
}> = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const users = useAppSelector((state) => state.users.value);
  const emails = users
    .map((user) => user.email)
    .filter((email) => email != user?.email);

  const userTypesScheme = z
    .object({
      name: z
        .string()
        .min(3, { message: "Name should have at least 3 characters" }),
      title: z.string().min(1, { message: "Title should not be empty" }),
      email: z
        .string()
        .min(1, { message: "Email should not be empty" })
        .email({ message: "Email is in the wrong format" })
        .refine((value) => !emails.includes(value), {
          message: "This email already exists in the list",
        }),
      country: z.string().min(1, { message: "Country should not be empty" }),
      city: z.string().min(1, { message: "City should not be empty" }),
      streetName: z
        .string()
        .min(1, { message: "Street name should not be empty" }),
      streetNumber: z.string().refine(
        (v) => {
          let n = Number(v);
          return !isNaN(n) && v?.length > 0 && n > 0;
        },
        { message: "Invalid number" }
      ),
    })
    .required();

  const isEdit = !!user;
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<UserDetails>({
    defaultValues: {
      title: user?.name.title || "",
      name: user ? `${user?.name.firstName} ${user?.name.lastName}` : "",
      email: user?.email || "",
      country: user?.location.country || "",
      city: user?.location.city || "",
      streetName: user?.location.street.name || "",
      streetNumber: user?.location.street.number.toString() || "",
    },
    resolver: zodResolver(userTypesScheme),
  });

  const onSubmit: SubmitHandler<UserDetails> = async (data) => {
    if (isEdit) {
      dispatch(
        editUser({
          email: data.email,
          id: user.id,
          image: user.image,
          location: {
            city: data.city,
            country: data.country,
            street: {
              name: data.streetName,
              number: +data.streetNumber,
            },
          },
          name: {
            title: data.title,
            firstName: data.name.split(" ")[0],
            lastName: data.name.split(" ")[1],
          },
        })
      );
    } else {
      dispatch(
        addUser({
          email: data.email,
          //Just for random id :)
          id:
            Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15),
          image: "",
          location: {
            city: data.city,
            country: data.country,
            street: {
              name: data.streetName,
              number: +data.streetNumber,
            },
          },
          name: {
            title: data.title,
            firstName: data.name.split(" ")[0],
            lastName: data.name.split(" ")[1],
          },
        })
      );
    }
    onClose();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex flexDir={"column"} alignItems="center" p="5">
          <Flex>
            <CustomFormControl
              errors={errors}
              register={register}
              fieldName="title"
              placeholder="Enter title"
            />
            <Box w="5" />
            <CustomFormControl
              errors={errors}
              register={register}
              fieldName="name"
              placeholder="Enter name"
            />
          </Flex>
          <CustomFormControl
            errors={errors}
            register={register}
            fieldName="email"
            placeholder="Enter email"
          />
          <CustomFormControl
            errors={errors}
            register={register}
            fieldName="country"
            placeholder="Enter country"
          />
          <CustomFormControl
            errors={errors}
            register={register}
            fieldName="city"
            placeholder="Enter city"
          />
          <Flex>
            <CustomFormControl
              errors={errors}
              register={register}
              fieldName="streetName"
              placeholder="Enter street name"
            />
            <Box w="5" />
            <CustomFormControl
              errors={errors}
              register={register}
              fieldName="streetNumber"
              placeholder="Enter street number"
            />
          </Flex>
          <Box h="5"></Box>
          <Flex>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" type="submit">
              Save
            </Button>
          </Flex>
        </Flex>
      </form>
    </>
  );
};

export default UserForm;

const CustomFormControl: React.FC<{
  errors: FieldErrors<UserDetails>;
  register: UseFormRegister<UserDetails>;
  fieldName: UserDetailsKeys;
  placeholder: string;
}> = ({ errors, register, fieldName, placeholder }) => {
  return (
    <FormControl mt="2%" isInvalid={errors[fieldName] ? true : false}>
      <FormLabel
        htmlFor={fieldName}
        fontWeight={"normal"}
        textTransform={"capitalize"}
      >
        {fieldName}
      </FormLabel>
      <Input
        id={fieldName}
        placeholder={placeholder}
        size="sm"
        rounded="md"
        _hover={{
          shadow: "1px 1px 3px rgba(0,0,0,0.3) ",
        }}
        borderRadius={"0.375em"}
        border={"1px solid black"}
        {...register(fieldName)}
      />
      <FormErrorMessage>{errors[fieldName]?.message}</FormErrorMessage>
    </FormControl>
  );
};

type UserDetailsKeys = keyof UserDetails;

type UserDetails = {
  title: string;
  name: string;
  email: string;
  country: string;
  city: string;
  streetName: string;
  streetNumber: string;
};
