import { DomainProps } from "@/types/types";
import {
  Card,
  CardBody,
  Flex,
  IconButton,
  Spacer,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  Tag,
  TagLabel,
  TagLeftIcon,
} from "@chakra-ui/react";
import { TiTick } from "react-icons/ti";
import { IoMdClose } from "react-icons/io";

import React, { ReactNode } from "react";
import { MdDelete } from "react-icons/md";
import { onDeleteHandler } from "./helpers";
import { useMutation, useQueryClient } from "react-query";

/* The `DomainCard` component is a functional component in React that takes in three props:
`domainName`, `isAvailable`, and `price`, which are defined in the `DomainProps` interface. Inside
the component, it returns a Card component from Chakra UI with a width of 200 and a shadow effect. */
const DomainCard = ({
  domainName,
  isAvailable,
  price,
}: DomainProps): ReactNode => {
  const { mutate } = useMutation(onDeleteHandler);
  const queryClient = useQueryClient();

  return (
    <Card w={200} boxShadow={"lg"}>
      <CardBody>
        <Flex>
          <Stat>
            <StatLabel mb={3}>{domainName}</StatLabel>
            <StatNumber>{`$ ${price}`}</StatNumber>
            <StatHelpText mt={3}>
              {isAvailable ? (
                <Tag borderRadius={"full"} colorScheme="green">
                  <TagLeftIcon as={TiTick} />
                  <TagLabel>Available</TagLabel>
                </Tag>
              ) : (
                <Tag borderRadius={"full"} colorScheme="red">
                  <TagLeftIcon as={IoMdClose} />
                  <TagLabel>Not Available</TagLabel>
                </Tag>
              )}
            </StatHelpText>
          </Stat>
          <Spacer />
          <IconButton
            aria-label={"delete button"}
            onClick={() => {
              mutate(domainName);
              queryClient.invalidateQueries("get_cart_data");
            }}
          >
            <MdDelete />
          </IconButton>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default DomainCard;
