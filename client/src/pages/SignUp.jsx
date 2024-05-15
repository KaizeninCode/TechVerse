import { useState } from "react";
import {
  Box,
  FormControl,
  FormLabel,
  useToast,
  InputRightElement,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Button,
  Image,
  Text,
  Flex,
} from "@chakra-ui/react";
import {
  AtSignIcon,
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import React from "react";
import { signupValidationSchema } from "../Schemas";

function SignUp() {
  // State to toogle the show password
  const [showPassword, setShowPassord] = useState(false);
  const toast = useToast();


  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  const signUpInitialValues = {
    username: "",
    email: "",
    password_hash: "",
    confirmPassword: "",
    role: "",
  };

  // Toast notification function
  const showToast = (name) => {
    toast({
      title: `Account created, ${name}!`,
      description: "We've created your account for you.",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch("http://127.0.0.1:5555/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify(values),
      });

      //Parse the JSON response

      const responseData = await response.json();
      if (response.ok) {
        showToast(responseData.name);
        console.log(values);
      actions.resetForm();

      }else{
         console.error("Failed to create account", responseData.error);
      }
    } catch (err) {
      console.error("Failed to create account", err);
      console.log(values);
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Flex flexDir={{ base: "column", md: "row" }} align={"stretch"}>
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
        className="h-screen  py-[60px] flex flex-col justify-center items-center "
      >
        <Text className="pb-3 font-semibold font-lg">Join TechVerse today</Text>
        <Formik
          initialValues={signUpInitialValues}
          validationSchema={signupValidationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className=" ">
              <Stack direction={"column"} spacing={8}>
                <>
                  <Field name="username">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.username && form.touched.username}
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <AtSignIcon color="gray.400" />
                          </InputLeftElement>
                          <Input
                            errorBorderColor="crimson"
                            focusBorderColor={"#393D3F"}
                            placeholder="Username"
                            {...field}
                          />
                        </InputGroup>
                        <FormErrorMessage color="crimson">
                          {form.errors.username &&
                            form.touched.username &&
                            form.errors.username}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Email Field */}
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
                  <Field name="password_hash">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.password_hash && form.touched.password_hash
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
                          {form.errors.password_hash&&
                            form.touched.password_hash &&
                            form.errors.password_hash}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>

                  {/* Confirm Password Field */}
                  <Field name="confirmPassword">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={
                          form.errors.confirmPassword &&
                          form.touched.confirmPassword
                        }
                      >
                        <InputGroup>
                          <InputLeftElement pointerEvents="none">
                            <LockIcon color="gray.400" />
                          </InputLeftElement>
                          <Input
                            errorBorderColor="crimson"
                            focusBorderColor={"#393D3F"}
                            placeholder="Confirm Password"
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
                          {form.errors.confirmPassword &&
                            form.touched.confirmPassword &&
                            form.errors.confirmPassword}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Field name="role">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.role && form.touched.role}
                      >
                        <FormLabel>Choose a user</FormLabel>
                        <Select
                          className="rounded-xl"
                          placeholder="Select user category"
                          {...field}
                          id="role"
                        >
                          <option value="admin">Admin</option>
                          <option value="staff">Staff</option>
                          <option value="student">Student</option>
                        </Select>
                        <FormErrorMessage color="crimson">
                          {form.errors.role &&
                            form.touched.role &&
                            form.errors.role}
                        </FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                </>

                <Box fontSize="sm">
                  <Text>
                    Already have an account?{" "}
                    <Link to="/SignIn">
                      <span cursor={"pointer"} textDecoration={"underline"}>
                        Sign In
                      </span>
                    </Link>
                  </Text>
                </Box>

                {/* Submit Button */}
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
                  Sign up
                </Button>
              </Stack>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default SignUp;

