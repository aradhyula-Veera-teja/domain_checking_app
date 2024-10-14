import { Card, CardBody, Skeleton, Stack } from "@chakra-ui/react";

/**
 * The CardLoader component renders a skeleton loading state for a card with multiple skeleton elements
 * inside.
 * @returns A CardLoader component is being returned. It renders a Card component with variant set to
 * "outline", maxW set to 250, and w set to 250. Inside the Card component, there is a CardBody
 * component containing multiple Skeleton components for simulating loading content.
 */
const CardLoader = () => {
  return (
    <Card variant={"outline"} maxW={250} w={250}>
      <CardBody>
        <Skeleton height={12} mb={6} />
        <Stack>
          <Skeleton height="20px" />
          <Skeleton height="20px" />
          <Skeleton height="20px" />
        </Stack>
      </CardBody>
    </Card>
  );
};

export default CardLoader;
