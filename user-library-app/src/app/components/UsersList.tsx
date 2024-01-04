"use client";
import React, { useEffect } from "react";
import User from "./User";
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
    <Flex p="10" flexWrap={"wrap"} gap={10} justifyContent={"center"}>
      {users
        .filter((user) => {
          const fullName =
            `${user.name.firstName} ${user.name.lastName}`.toLocaleLowerCase();
          const fullLocation =
            `${user.location.country} ${user.location.city} ${user.location.street.name} ${user.location.street.number}`.toLocaleLowerCase();
          return (
            user.email.includes(filters.email) &&
            user.id.includes(filters.id) &&
            fullName.includes(filters.name.toLocaleLowerCase()) &&
            fullLocation.includes(filters.location.toLocaleLowerCase())
          );
        })
        .map((user) => {
          return <User user={user} key={user.id} />;
        })}
    </Flex>
  );
};

export default UsersList;
