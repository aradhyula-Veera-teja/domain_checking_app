"use client";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Spacer,
  Stack,
  Text,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import {
  signIn,
  signOut,
  useSession,
  getProviders,
  ClientSafeProvider,
} from "next-auth/react";
import { FaCartShopping } from "react-icons/fa6";
import Image from "next/image";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import Cart from "../Cart/Cart";
import useAppContext from "@/context/AppContext/useAppContext";

/* This code defines a functional component named `Headers`.*/
const Headers = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  const { numDomainsRequired } = useAppContext();
  return (
    <Box px={8} py={6} boxShadow={"lg"}>
      <Flex>
        <NextLink href={"/"}>
          <Stack spacing={2} direction={"row"}>
            <Image
              src={"/assets/images/fib.webp"}
              alt="Logo"
              width={50}
              height={50}
            />
            <Text fontSize={"xl"}>Logo</Text>
          </Stack>
        </NextLink>
        <Spacer />
        <Center>
          <Stack spacing={2} direction={"row"}>
            <NextLink
              href={"/"}
              className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
            >
              Home
            </NextLink>
            <NextLink
              href={"/domains"}
              className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
            >
              Domains
            </NextLink>
          </Stack>
        </Center>
        {}
        <Spacer />
        {session?.user ? (
          <>
            <Stack spacing={3} direction={"row"}>
              <Button
                colorScheme="teal"
                variant={"outline"}
                onClick={() => {
                  signOut();
                }}
                className="outline_btn"
              >
                Sign Out
              </Button>
              <Tooltip label="Cart">
                <Box position="relative" display="inline-block">
                  <IconButton
                    aria-label="cart"
                    icon={<FaCartShopping />}
                    onClick={onOpen}
                    // size="lg"
                  />
                  <Badge
                    position="absolute"
                    top="0"
                    right="0"
                    transform="translate(50%, -50%)"
                    borderRadius="full"
                    bg="red.500"
                    color="white"
                    fontSize="0.7em"
                    width="18px"
                    height="18px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    {numDomainsRequired}
                  </Badge>
                </Box>
              </Tooltip>
              <Tooltip label="Profile">
                <NextLink href="/profile">
                  <Avatar
                    src={`${session?.user.image}`}
                    width={37}
                    height={37}
                    name={`${session?.user.name}`}
                  />
                </NextLink>
              </Tooltip>
            </Stack>
          </>
        ) : (
          <>
            {providers &&
              Object.values(providers).map((provider: ClientSafeProvider) => (
                <Button
                  colorScheme="teal"
                  variant={"outline"}
                  key={provider.name}
                  onClick={() => {
                    signIn(provider.id);
                  }}
                >
                  Sign in
                </Button>
              ))}
          </>
        )}
      </Flex>
      <Cart isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default Headers;
