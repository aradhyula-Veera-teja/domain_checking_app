"use client";
import {
  Box,
  Card,
  CardBody,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { CiSearch } from "react-icons/ci";
import { useMutation } from "react-query";
import axios from "axios";
import CardLoader from "@/components/Loaders/CardLoader";
import AddDomainCard from "@/components/AddDomainCard/AddDomainCard";
import Image from "next/image";

const DomainsPage = () => {
  const domainNameRegex = /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.(com|xyz|app)$/;

  const initialValues = {
    domainName: "",
  };
  const searchSchema = Yup.object().shape({
    domainName: Yup.string()
      .matches(
        domainNameRegex,
        "Invalid domain name. Must end with .com,.app or .xyz"
      )
      .required("Domain Name required"),
  });

  async function getDomaineData(domainName: string) {
    return await axios.post("/api/domains", { domainName: domainName });
  }

  const { isLoading, isSuccess, isError, data, mutate } =
    useMutation(getDomaineData);
  return (
    <div>
      <Text fontSize={"sm"}>
        Ready to Launch Your Online Journey? Searching for the perfect domain is
        the first step to bringing your vision to life! Explore our vast
        selection and find a domain that reflects your unique style. Don’t just
        dream it—own it! Start searching now!
      </Text>
      <Formik
        initialValues={initialValues}
        validationSchema={searchSchema}
        onSubmit={(values) => {
          mutate(values.domainName);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Card boxShadow={"xl"}>
              <CardBody>
                <Flex gap={2}>
                  <Field
                    name="domainName"
                    as={Input}
                    id="name"
                    placeholder="Search for Domain"
                  />
                  <IconButton
                    aria-label="search button"
                    type="submit"
                    colorScheme="teal"
                  >
                    <CiSearch />
                  </IconButton>
                </Flex>
              </CardBody>
            </Card>
            {/* <ErrorMessage name="domainName" /> */}
            {errors.domainName && touched.domainName && (
              <p className="mt-2 text-sm text-red-600">{errors.domainName}</p>
            )}
          </Form>
        )}
      </Formik>
      <Box my={3}>
        {isLoading && (
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
            <WrapItem>
              <CardLoader />
            </WrapItem>
          </Wrap>
        )}
        {isError && (
          <>
            <Stack direction={"column"} spacing={7}>
              <Heading
                variant={"sm"}
                className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
              >
                Soothing went wrong
              </Heading>
              <Center>
                <Image
                  alt="no data"
                  src={"/assets/images/server.png"}
                  width={150}
                  height={150}
                />
              </Center>
            </Stack>
          </>
        )}
        {isSuccess && data.data.data.availability.available ? (
          <>
            <Heading
              variant={"sm"}
              className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
            >
              Exact Match
            </Heading>
            <Text fontSize={"small"}>
              Its Awesome we got exact match for you 😍.{" "}
            </Text>
            <AddDomainCard domain={data.data.data.availability.domain} />
          </>
        ) : (
          <>
            <Stack direction={"column"} spacing={7}>
              <Heading
                variant={"sm"}
                className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
              >
                Domain already taken 🥲
              </Heading>
              <Center>
                <Image
                  alt="no data"
                  src={"/assets/images/server.png"}
                  width={150}
                  height={150}
                />
              </Center>
            </Stack>
          </>
        )}
        {isSuccess && !isLoading && data.data.data.suggestions.length > 0 && (
          <>
            <Heading
              variant={"sm"}
              className="text-sm font-inter text-gray-700 hover:text-gray-500 font-medium"
            >
              Similar Domains
            </Heading>
            <Wrap mt={3}>
              {data.data.data.suggestions.map((item: { domain: string }) => (
                <WrapItem key={item.domain}>
                  <AddDomainCard domain={item.domain} />
                </WrapItem>
              ))}
            </Wrap>
          </>
        )}
      </Box>
    </div>
  );
};

export default DomainsPage;
