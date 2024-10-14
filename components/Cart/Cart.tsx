"use client";
import {
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Text,
  Flex,
  DrawerBody,
  Divider,
  Wrap,
  WrapItem,
  DrawerFooter,
  ButtonGroup,
  Button,
  Center,
  Stack,
  Heading,
  useToast,
} from "@chakra-ui/react";
import { MdOutlineRefresh } from "react-icons/md";
import axios from "axios";
import React, { ReactNode, useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import CardLoader from "../Loaders/CardLoader";
import DomainCard from "../DomainCard/DomainCard";
import { DomainProps } from "@/types/types";
import Image from "next/image";
import { IoAdd } from "react-icons/io5";
import { useRouter } from "next/navigation";
import { removeItems } from "./helpers";
import LoadingOverlay from "../LoadingOverlay/LoadingOverlay";
import { useQueryClient } from "react-query";
// import useAppContext from "@/context/AppContext/useAppContext";

/* The `interface CartProps` is defining the structure of the props that the `Cart` component expects
to receive. In this case:
- `isOpen` is a boolean prop that indicates whether the drawer is open or closed.
- `onClose` is a function prop that is called when the drawer should be closed. */
interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * The fetchData function uses axios to make an asynchronous GET request to retrieve user data from a
 * local server.
 * @returns The `fetchData` function is returning a promise that resolves with the result of the axios
 * GET request to "http://localhost:3001/users/1".
 */
const fetchData = async () => {
  return await axios.get("http://localhost:3001/users/1");
};

/* The `Cart` component in the provided code snippet is a React functional component that represents a
drawer displaying cart information. Here's a breakdown of what the component does: */
const Cart = ({ isOpen, onClose }: CartProps): ReactNode => {
  const { isLoading, isFetching, isError, isSuccess, data, refetch } = useQuery(
    "get_cart_data",
    fetchData
  );
  // const { setNumDomainsRequired } = useAppContext();
  const queryClient = useQueryClient();
  const toast = useToast();
  const router = useRouter();
  const mutation = useMutation(removeItems, {
    onSuccess: () => {
      toast({
        title: "Cart Updated",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
      queryClient.invalidateQueries("get_cart_data");
    },

    onError: () => {
      toast({
        title: "Unable to Update cart",
        description: "",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "bottom",
      });
    },
  });
  useEffect(() => {
    queryClient.invalidateQueries("get_cart_data");
  }, [queryClient]);
  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size={"full"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Flex>
              <Text variant={"md"}>Cart</Text>
            </Flex>
          </DrawerHeader>
          <Divider />
          <DrawerBody py={8}>
            {!isLoading && !isFetching && isError && (
              <Center>
                <Stack direction={"column"} spacing={15}>
                  <Image
                    alt="Error"
                    src={"/assets/images/server.png"}
                    width={150}
                    height={150}
                  />
                  <Heading my={3} as="h5" size="sm">
                    Your Cart is empty
                  </Heading>
                  <Button
                    colorScheme="teal"
                    leftIcon={<MdOutlineRefresh />}
                    onClick={() => {
                      refetch();
                    }}
                  >
                    Refresh
                  </Button>
                </Stack>
              </Center>
            )}
            {(isLoading || isFetching) && (
              <Wrap>
                <WrapItem>
                  <CardLoader />
                </WrapItem>
                <WrapItem>
                  <CardLoader />
                </WrapItem>
                <WrapItem>
                  <CardLoader />
                </WrapItem>
              </Wrap>
            )}
            {isSuccess && data && data.data.cart.length > 0 && (
              <Wrap>
                {data.data.cart.map((item: DomainProps) => (
                  <DomainCard
                    key={item.domainName}
                    domainName={item.domainName}
                    isAvailable={item.isAvailable}
                    price={item.price}
                  />
                ))}
              </Wrap>
            )}
            {isSuccess && data && data.data.cart.length <= 0 && (
              <Center>
                <Stack direction={"column"} spacing={15}>
                  <Image
                    alt="No data"
                    src={"/assets/images/empty.png"}
                    width={150}
                    height={150}
                  />
                  <Heading my={3} as="h5" size="sm">
                    Your Cart is empty
                  </Heading>
                  <Button
                    colorScheme="teal"
                    leftIcon={<IoAdd />}
                    onClick={() => {
                      onClose();
                      router.push("/domains");
                    }}
                  >
                    Add Domains
                  </Button>
                </Stack>
              </Center>
            )}
          </DrawerBody>
          {isSuccess && data && data.data.cart.length > 0 && (
            <DrawerFooter>
              <ButtonGroup>
                <Button
                  colorScheme="teal"
                  variant={"outline"}
                  onClick={() => {
                    mutation.mutate(true);
                  }}
                  isLoading={mutation.isLoading}
                  disabled={mutation.isLoading}
                >
                  Remove All
                </Button>
                <Button
                  colorScheme="teal"
                  variant={"outline"}
                  onClick={() => {
                    mutation.mutate(false);
                  }}
                  isLoading={mutation.isLoading}
                  disabled={mutation.isLoading}
                >
                  Remove Unavailable
                </Button>
                <Button
                  colorScheme="teal"
                  variant={"solid"}
                  onClick={() => {
                    mutation.mutate(true);
                  }}
                  isLoading={mutation.isLoading}
                  disabled={mutation.isLoading}
                >
                  Purchase
                </Button>
              </ButtonGroup>
            </DrawerFooter>
          )}
        </DrawerContent>
        {mutation.isLoading && <LoadingOverlay />}
      </Drawer>
    </>
  );
};

export default Cart;
