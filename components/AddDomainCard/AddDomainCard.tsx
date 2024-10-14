import useAppContext from "@/context/AppContext/useAppContext";
import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Card,
  CardBody,
  Flex,
  IconButton,
  Stat,
  StatLabel,
  StatNumber,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { ReactNode, useRef } from "react";
import { FaCartPlus } from "react-icons/fa";

/* The `interface AddDomainCardProps` is defining a TypeScript interface for the props that the
`AddDomainCard` component expects to receive. In this case, it specifies that the `AddDomainCard`
component should receive a prop called `domain` which is of type `string`. This helps in
type-checking and ensuring that the component is used correctly with the expected props. */
interface AddDomainCardProps {
  domain: string;
}

/**
 * The AddDomainCard component handles adding a domain to a user's cart with error handling for cart
 * limits and existing items.
 * @param {AddDomainCardProps}  - The code you provided is a React component called `AddDomainCard`
 * that represents a card component for adding a domain to a cart. It takes a `domain` prop as input.
 * @returns The `AddDomainCard` component is being returned, which is a card component displaying
 * domain information and a button to add the domain to the cart.
 */
const AddDomainCard = ({ domain }: AddDomainCardProps): ReactNode => {
  const { numDomainsRequired, increase } = useAppContext();
  const toast = useToast();
  const { isOpen, onToggle } = useDisclosure();
  async function onClickHandler() {
    if (numDomainsRequired >= 5) {
      toast({
        title: "Unable to add to  cart",
        description:
          "The cart limit is 5. Either checkout the cart of remove items from the cart",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    } else {
      const response = await axios.get(`http://localhost:3001/users/1`);
      const user = response.data;
      const itemExists = user.cart.some(
        (item: { domainName: string }) => item.domainName === domain
      );
      if (itemExists) {
        return toast({
          title: "Unable to add to  cart",
          description: `${domain} is already in the cart`,
          status: "error",
          duration: 3000,
          isClosable: true,
          position: "bottom",
        });
      }
      user.cart.push({ domainName: domain, isAvailable: true, price: 200 });
      await axios.put(`http://localhost:3001/users/1`, user);
      toast({
        title: "Added to  cart",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      increase();
    }
  }
  const cancelRef = useRef(null);
  const { data: session } = useSession();
  return (
    <>
      <AlertDialog
        leastDestructiveRef={cancelRef}
        isOpen={isOpen}
        isCentered
        onClose={onToggle}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogCloseButton />
            <AlertDialogHeader>Sign in</AlertDialogHeader>
            <AlertDialogBody>
              You need to sign in first to add this item to cart
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onToggle}>
                ok
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
      <Card minW={200}>
        <CardBody>
          <Flex justifyContent={"space-between"} alignItems={"center"} gap={3}>
            <Stat>
              <StatLabel>{domain}</StatLabel>
              <StatNumber>$ 1000</StatNumber>
            </Stat>
            {/* <Spacer /> */}
            <IconButton
              aria-label="add to cart"
              onClick={() => {
                if (!session) {
                  onToggle();
                  return;
                }
                onClickHandler();
              }}
            >
              <FaCartPlus />
            </IconButton>
          </Flex>
        </CardBody>
      </Card>
    </>
  );
};

export default AddDomainCard;
