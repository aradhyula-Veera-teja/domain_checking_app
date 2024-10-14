"use client";
import useAppContext from "@/context/AppContext/useAppContext";
import axios from "axios";
import { useQuery } from "react-query";
import { Box, Button, Heading, Text, Flex, Image } from "@chakra-ui/react";
import { motion } from "framer-motion";
import AboutUsAndWhyUs from "@/components/AboutUsAndWhyUs/AboutUsAndWhyUs";
import { useRouter } from "next/navigation";

export default function Home() {
  const { setNumDomainsRequired } = useAppContext();
  const fetchData = async () => {
    return await axios.get("http://localhost:3001/users/1");
  };
  const {} = useQuery("get_cart_data", fetchData, {
    onSuccess: (data) => {
      setNumDomainsRequired(data.data.cart.length);
    },
  });
  // const MotionBox = motion(Box);
  const router = useRouter();
  return (
    <>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        p={8}
        maxW="1200px"
        mx="auto"
      >
        {/* Left Side - Scrolls in from Left */}
        <motion.div
          style={{ flex: 1 }}
          initial={{ x: -200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box p={4} textAlign={{ base: "center", md: "left" }}>
            <Heading as="h1" size="xl" mb={4}>
              Register Your Perfect Domain Name
            </Heading>
            <Text fontSize="lg" mb={6}>
              Secure your online identity with the best domain name registration
              platform. Find your unique domain today and get your website up
              and running in minutes.
            </Text>
            <Button
              colorScheme="teal"
              size="lg"
              onClick={() => {
                router.push("/domains");
              }}
            >
              Register a Domain Now
            </Button>
          </Box>
        </motion.div>

        {/* Right Side - Scrolls in from Right */}
        <motion.div
          style={{ flex: "1" }}
          initial={{ x: 200, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <Box p={4}>
            <Image
              src="https://media.istockphoto.com/id/2163926336/photo/registered-domain-3d-icon-domain-registration-3d-icon.jpg?s=2048x2048&w=is&k=20&c=yfd0uYjAuJNpqY0I9Rn0uhSTztjI-gM4VaqMpO381sU="
              alt="Placeholder image"
              borderRadius="md"
              boxShadow="lg"
            />
          </Box>
        </motion.div>
      </Flex>
      <AboutUsAndWhyUs />
    </>
  );
}
