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

const EditUser: React.FC<{ user: IUser }> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label="edit"
        onClick={onOpen}
        icon={<EditIcon />}
        variant={"solid"}
        colorScheme="facebook"
      />

      <Modal isOpen={isOpen} onClose={onClose} size={"sm"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign={"center"}>Edit User</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <UserForm user={user} onClose={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditUser;
