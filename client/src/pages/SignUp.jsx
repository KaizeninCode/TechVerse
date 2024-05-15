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
// import { useHistory } from "react-router-dom";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  //  const history = useHistory();

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

  const signUpInitialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "admin", // Default role
  };

  const handleSubmit = async (values, actions) => {
    try {
      const response = await fetch("http://127.0.0.1:5555/users", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(values),
      });
      const responseData = await response.json();
      console.log("Server response:", responseData);
      if (response.ok) {
        const { username } = responseData;
        showToast(username);
        console.log("User created successfully", values);
        actions.resetForm();
        // history.push('/SignIn')
      } else {
        console.error("Error creating user:", response.statusText);
      }
    } catch (error) {
      console.error("Error creating user:", error);
    } finally {
      actions.setSubmitting(false);
    }
  };
  // Toast notification function
  const showToast = (username) => {
    toast({
      title: `Account created, ${username}!`,
      description: "We've created your account for you.",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      align={"stretch"}
      className="overflow - x - hidden"
    >
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
          display={{ base: "none", md: "block" }}
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
                        isInvalid={
                          form.errors.username && form.touched.username
                        }
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

                  {/* Password Field */}
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

                  {/* Role Field */}
                  <Field
                    as="select"
                    id="role"
                    name="role"
                    className="h-[30px] rounded-md"
                  >
                    <option value="admin">Admin</option>
                    <option value="staff">Staff</option>
                    <option value="student">Student</option>
                  </Field>
                </>

                {/* Sign In Link */}
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
