import  { useState } from "react";
import {
  Box,
  FormControl,
  InputRightElement,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Button,
  Flex,
  Image,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import {
  AtSignIcon,
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";
import React from "react";
import { signinValidationSchema } from "../Schemas";

function SignIn() {
  // State to toogle the show password
  const [showPassword, setShowPassord] = useState(false);

  function handleTogglePassword() {
    setShowPassord(!showPassword);
  }

  const signInInitialValues = {
    email: "",
    password: "",
  };
  const handleSubmit = async (values, actions) => {
    actions.resetForm({
      values: signInInitialValues,
    });
  };
  return (
    <Flex lexDir={{ base: "column", md: "row" }} align={"stretch"}>
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={{ base: "100%", md: "50%" }}
        bg={"#33658a"}
      >
        <Box className="flex gap-3 py-4 px-4">
          <Image
            display={{ base: "none", md: "block" }}
            src="/logo-transparent.png"
            w={"30px"}
            h={"30px"}
            alt="logo "
            ml={3}
          />
          <Text className="font-bold font-raleway text-2xl text-white ">
            TechVerse
          </Text>
        </Box>
        <Box
          className="flex flex-col text-white flex-wrap-reverse font-medium"
          m={"auto"}
        >
          <Text>
            Explore our guides, references and examples to tech related content
            on our platform
          </Text>
          <Text>Guided product walkthroughs</Text>

          <Text> Easily accessible code samples</Text>
        </Box>
        <Image
          src="/authImage.png"
          w={"350px"}
          h={"350px"}
          alt="Authentication image"
        />
      </Flex>
      <Box
        minH={"100vh"}
        w={{ base: "100%", md: "50%" }}
        className="h-screen w-full py-[60px] flex flex-col justify-center items-center"
      >
        <Text className="pb-3 font-semibold font-lg">Sign in to TechVerse</Text>

        <Formik
          initialValues={signInInitialValues}
          validationSchema={signinValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className=" ">
              <Stack direction={"column"} spacing={8}>
                <>
                  <Field name="email">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.email && form.touched.email}
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <EmailIcon color="gray.400" />
                          </InputLeftElement>
                          <Input
                            errorBorderColor="crimson"
                            focusBorderColor={"#393D3F"}
                            placeholder="Email"
                            {...field}
                          />
                        </InputGroup>
                        <FormErrorMessage color="crimson">
                          {form.errors.email &&
                            form.touched.email &&
                            form.errors.email}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="password">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password && form.touched.password
                        }
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <LockIcon color="gray.400" />
                          </InputLeftElement>
                          <Input
                            errorBorderColor="crimson"
                            focusBorderColor={"#393D3F"}
                            placeholder="Password"
                            {...field}
                            type={showPassword ? "text" : "password"}
                          />
                          <InputRightElement width="4.5rem">
                            <Box
                              h="1.75rem"
                              size="sm"
                              onClick={handleTogglePassword}
                            >
                              {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                            </Box>
                          </InputRightElement>
                        </InputGroup>
                        <FormErrorMessage color="crimson">
                          {form.errors.password &&
                            form.touched.password &&
                            form.errors.password}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </>

                <Box fontSize="sm">
                  <Text>
                    Dont have an account?{" "}
                    <Link to="/SignUp">
                      <span cursor={"pointer"} textDecoration={"underline"}>
                        Sign Up
                      </span>
                    </Link>
                  </Text>
                </Box>
                <Button
                  alignSelf={"center"}
                  w={"150px"}
                  bg={"#33658a"}
                  color={"#ffff"}
                  type="submit"
                  variant={"ghost"}
                  _hover={{ background: "#33658a" }}
                  isLoading={isSubmitting}
                  boxShadow={"dark-lg"}
                >
                  Sign In
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default SignIn;