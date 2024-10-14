"use client";
import { Box, Flex, Avatar, Heading, Text, Button } from "@chakra-ui/react";
import { signOut, useSession } from "next-auth/react";
const ProfilePage = () => {
  const handleSignOut = () => {
    console.log("Signed out");
    signOut();
  };
  const { data: session } = useSession();
  return (
    <Flex justify="center" align="center" minH="100vh" bg="gray.50" p={4}>
      <Box
        w={{ base: "100%", md: "400px" }}
        bg="white"
        p={6}
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
      >
        {/* Profile Image */}
        <Avatar
          size="xl"
          name={`${session?.user?.name}`}
          src={`${session?.user?.image}`}
          mb={4}
          showBorder={true}
          borderColor="blue.500"
        />

        {/* Name and Email */}
        <Heading as="h2" size="lg" mb={2}>
          {session?.user?.name}
        </Heading>
        <Text fontSize="md" color="gray.600" mb={6}>
          {session?.user?.email}
        </Text>

        {/* Sign Out Button */}
        <Button
          colorScheme="teal"
          size="lg"
          width="100%"
          onClick={handleSignOut}
        >
          Sign Out
        </Button>
      </Box>
    </Flex>
  );
};

export default ProfilePage;
