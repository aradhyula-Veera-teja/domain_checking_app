import { Box, Heading, Text, SimpleGrid, Flex, Icon } from "@chakra-ui/react";
import { FaCheckCircle, FaStar, FaUsers } from "react-icons/fa";

function AboutUsAndWhyUs() {
  return (
    <Box maxW="1200px" mx="auto" py={12} px={4}>
      {/* About Us Section */}
      <Box textAlign="center" mb={16}>
        <Heading as="h2" size="xl" mb={4}>
          About Us
        </Heading>
        <Text fontSize="lg" maxW="800px" mx="auto">
          We are a leading provider of innovative web solutions, dedicated to
          helping businesses establish a strong online presence. Our team of
          experts specializes in creating high-performance websites and
          applications that meet the unique needs of our clients. With years of
          experience and a commitment to excellence, we strive to deliver
          solutions that drive success.
        </Text>
      </Box>

      {/* Why Us Section */}
      <Box textAlign="center" mb={12}>
        <Heading as="h2" size="xl" mb={4}>
          Why Choose Us?
        </Heading>
        <Text fontSize="lg" maxW="800px" mx="auto" mb={8}>
          Here’s why you should trust us to bring your vision to life:
        </Text>
      </Box>

      {/* Why Us Features Section */}
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Flex direction="column" align="center">
          <Icon as={FaCheckCircle} w={12} h={12} color="blue.500" mb={4} />
          <Heading as="h3" size="md" mb={2}>
            Proven Expertise
          </Heading>
          <Text textAlign="center">
            Our team has a track record of delivering exceptional solutions that
            help businesses thrive online. We know what works and how to
            implement it.
          </Text>
        </Flex>

        <Flex direction="column" align="center">
          <Icon as={FaStar} w={12} h={12} color="yellow.400" mb={4} />
          <Heading as="h3" size="md" mb={2}>
            Unmatched Quality
          </Heading>
          <Text textAlign="center">
            We take pride in the quality of our work. Our attention to detail
            ensures your project will stand out and operate flawlessly.
          </Text>
        </Flex>

        <Flex direction="column" align="center">
          <Icon as={FaUsers} w={12} h={12} color="green.400" mb={4} />
          <Heading as="h3" size="md" mb={2}>
            Dedicated Support
          </Heading>
          <Text textAlign="center">
            We’re with you every step of the way. Our dedicated support team
            ensures that your experience is smooth, from start to finish.
          </Text>
        </Flex>
      </SimpleGrid>
    </Box>
  );
}

export default AboutUsAndWhyUs;
