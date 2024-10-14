// components/LoadingOverlay.js
import { Box, Spinner, Text } from "@chakra-ui/react";

const LoadingOverlay = () => (
  <Box
    position="fixed"
    top="0"
    left="0"
    right="0"
    bottom="0"
    bg="rgba(0, 0, 0, 0.5)"
    display="flex"
    alignItems="center"
    justifyContent="center"
    zIndex="1000"
  >
    <Spinner size="lg" color="white" />
    <Text color="white" ml={4}>
      Loading...
    </Text>
  </Box>
);

export default LoadingOverlay;
