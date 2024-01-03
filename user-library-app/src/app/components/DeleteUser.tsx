"use client";
import React from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  useDisclosure,
  IconButton,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { IUser } from "../types";
import { useDispatch } from "react-redux";
import { deleteUser } from "@/lib/features/users/usersSlice";

const DeleteUser: React.FC<{ user: IUser }> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log("hi");

    dispatch(deleteUser(user.id));
    onClose();
  };
  return (
    <>
      <IconButton
        aria-label="delete"
        colorScheme="red"
        onClick={onOpen}
        icon={<DeleteIcon />}
      />
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete {user.name.firstName} {user.name.lastName}
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter display={"flex"} justifyContent={"center"}>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteUser;
