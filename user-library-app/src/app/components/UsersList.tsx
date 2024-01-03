"use client";
import React, { useEffect, useState } from "react";
import { IUser } from "../types";
import User from "./User";
import { getUsers } from "../data";
import { Box, Flex } from "@chakra-ui/react";
import { useAppSelector } from "@/lib/hooks";
import { useDispatch } from "react-redux";
import { fetchData } from "@/lib/features/users/usersSlice";
import { AppDispatch } from "@/lib/store";

const UsersList = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  const users = useAppSelector((state) => state.users.value);
  const filters = useAppSelector((state) => state.filters);

  return (
    <Flex alignItems={"center"} flexDir={"column"} p="10">
      {users
        .filter((user) => {
          const fullName =
            `${user.name.firstName} ${user.name.lastName}`.toLocaleLowerCase();
          const fullLocation =
            `${user.location.country} ${user.location.city} ${user.location.street.name} ${user.location.street.number}`.toLocaleLowerCase();
          return (
            user.email.includes(filters.email) &&
            user.id.includes(filters.id) &&
            fullName.includes(filters.name) &&
            fullLocation.includes(filters.location)
          );
        })
        .map((user) => {
          return (
            <React.Fragment key={user.id}>
              <User user={user} />
              <Box h={"1em"} />
            </React.Fragment>
          );
        })}
    </Flex>
  );
};

export default UsersList;
