"use client";
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { IUser } from "../types";
import UserForm from "./UserForm";

const AddUser = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        variant={"solid"}
        colorScheme="facebook"
        w="min-content"
      >
        Add User
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Add User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddUser;
