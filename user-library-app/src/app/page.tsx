"use client";
import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import UsersList from "./components/UsersList";
import StoreProvider from "./StoreProvider";
import AddUser from "./components/AddUser";
import FilterBy from "./components/FilterBy";

export default function Home() {
  return (
    <main>
      <ChakraProvider>
        <StoreProvider>
          <Flex
            justifyContent={"center"}
            flexDir={"column"}
            alignItems={"center"}
          >
            <Box h="10" />
            <AddUser />
            <Box h="10" />
            <Flex justifyContent={"space-between"} w="100%" p={5}>
              <FilterBy filterParameter="email" />
              <Box w="10" />
              <FilterBy filterParameter="id" />
              <Box w="10" />
              <FilterBy filterParameter="name" />
              <Box w="10" />
              <FilterBy filterParameter="location" />
            </Flex>
            <UsersList />
          </Flex>
        </StoreProvider>
      </ChakraProvider>
    </main>
  );
}
