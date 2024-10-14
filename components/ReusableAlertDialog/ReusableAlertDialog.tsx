import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

/** The `interface ReusableAlertDialog` in the TypeScript React code snippet is defining a type for the
props that the `ReusableAlertDialog` component expects to receive. It specifies the shape of the
props object that should be passed to the `ReusableAlertDialog` component. */
interface ReusableAlertDialog {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  submitButtonText: string;
  submitHandler: () => void;
  cancelButtonText: string;
}

const ReusableAlertDialog = ({
  isOpen,
  onClose,
  title,
  description,
  submitButtonText,
  submitHandler,
  cancelButtonText,
}: ReusableAlertDialog) => {
  const cancelRef = useRef<HTMLButtonElement>(null);
  return (
    <AlertDialog
      isOpen={isOpen}
      onClose={onClose}
      isCentered
      leastDestructiveRef={cancelRef}
    >
      <AlertDialogOverlay />
      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{description}</AlertDialogBody>
      </AlertDialogContent>
      <AlertDialogFooter>
        <Button
          variant={"outline"}
          ref={cancelRef}
          colorScheme="teal"
          onClick={onClose}
        >
          {cancelButtonText}
        </Button>
        <Button variant={"solid"} colorScheme="teal" onClick={submitHandler}>
          {submitButtonText}
        </Button>
      </AlertDialogFooter>
    </AlertDialog>
  );
};

export default ReusableAlertDialog;
