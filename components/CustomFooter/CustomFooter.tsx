import { Box, Flex, Link, Text, IconButton, Stack } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function CustomFooter() {
  return (
    <Box as="footer" bg="gray.800" color="white" py={8} mt="auto" w="100%">
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        maxW="1200px"
        mx="auto"
        px={4}
      >
        {/* Navigation Links */}
        <Stack
          direction={{ base: "column", md: "row" }}
          spacing={6}
          mb={{ base: 6, md: 0 }}
        >
          <Link href="#" _hover={{ textDecoration: "none", color: "blue.400" }}>
            Home
          </Link>
          <Link href="#" _hover={{ textDecoration: "none", color: "blue.400" }}>
            About
          </Link>
          <Link href="#" _hover={{ textDecoration: "none", color: "blue.400" }}>
            Services
          </Link>
          <Link href="#" _hover={{ textDecoration: "none", color: "blue.400" }}>
            Contact
          </Link>
        </Stack>

        {/* Social Media Icons */}
        <Flex>
          <IconButton
            as="a"
            href="https://facebook.com"
            target="_blank"
            aria-label="Facebook"
            icon={<FaFacebook />}
            size="lg"
            colorScheme="facebook"
            mr={2}
          />
          <IconButton
            as="a"
            href="https://twitter.com"
            target="_blank"
            aria-label="Twitter"
            icon={<FaTwitter />}
            size="lg"
            colorScheme="twitter"
            mr={2}
          />
          <IconButton
            as="a"
            href="https://linkedin.com"
            target="_blank"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
            size="lg"
            colorScheme="linkedin"
            mr={2}
          />
          <IconButton
            as="a"
            href="https://instagram.com"
            target="_blank"
            aria-label="Instagram"
            icon={<FaInstagram />}
            size="lg"
            colorScheme="pink"
          />
        </Flex>
      </Flex>

      {/* Footer Bottom */}
      <Box textAlign="center" mt={8}>
        <Text fontSize="sm">
          &copy; {new Date().getFullYear()} Challenge-3. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
}
