"use client";
import React from "react";
import { IUser } from "../types";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Flex,
  Avatar,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import EditUser from "./EditUser";
import DeleteUser from "./DeleteUser";

const User: React.FC<{ user: IUser }> = ({ user }) => {
  return (
    <Card
      border={"solid 1px black"}
      borderRadius={"1em"}
      boxShadow={
        "rgba(0, 0, 0, 0.2) 0px 12px 28px 0px, rgba(0, 0, 0, 0.1) 0px 2px 4px 0px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset;"
      }
    >
      <CardHeader>
        <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
          <Avatar name={user.name.firstName} src={user.image} />
          <Box>
            <Heading>{user.name.title}</Heading>
            <Text>
              {user.name.firstName} {user.name.lastName}
            </Text>
          </Box>
        </Flex>
      </CardHeader>
      <CardBody>
        <Box>
          <Text fontWeight={"bold"}>Email: </Text>
          <Text>{user.email}</Text>
        </Box>
        <Box>
          <Text fontWeight={"bold"}>Location: </Text>
          <Text>{`${user.location.country}, ${user.location.city}`}</Text>
          <Text>
            {`${user.location.street.name} ${user.location.street.number}`}
          </Text>
        </Box>
        <Box>
          <Text fontWeight={"bold"}>ID: </Text>
          <Text>{user.id}</Text>
        </Box>
      </CardBody>
      <CardFooter>
        <Flex justifyContent={"space-around"} flex="1">
          <EditUser user={user} />
          <DeleteUser user={user} />
        </Flex>
      </CardFooter>
    </Card>
  );
};

export default User;
