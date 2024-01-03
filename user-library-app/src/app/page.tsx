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
            gap={5}
          >
            <Box h="3" />
            <AddUser />
            <Flex justifyContent={"space-between"} w="100%" p={5} gap={5}>
              <FilterBy filterParameter="email" />

              <FilterBy filterParameter="id" />

              <FilterBy filterParameter="name" />

              <FilterBy filterParameter="location" />
            </Flex>
            <UsersList />
          </Flex>
        </StoreProvider>
      </ChakraProvider>
    </main>
  );
}
