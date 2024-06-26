import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCredentials } from "../features/AuthSlice";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { IoChevronBack } from "react-icons/io5";
import { useLoginMutation } from "../features/authApiSlice";

import {
  Box,
  FormControl,
  useToast,
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
import { signinValidationSchema } from "../Schemas";

function SignIn({ theme }) {
  // State to toggle the show password
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
 
  const dispatch = useDispatch();
  const [login, { isLoading, isError }] = useLoginMutation();
  const from = location.state?.from?.pathname || "/";
  const navigate = useNavigate();

  function handleTogglePassword() {
    setShowPassword(!showPassword);
  }

    const toast = useToast();

  const signInInitialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, actions) => {
    try {
        const response = await login({
            email: values.email,
            password: values.password,
        });

        if (response.error) {
            const errorMessage = response.error.message || "Login failed";
            showToast(errorMessage);
            return;
        }

        const { data } = response;
        const { access_token, username, role, content } = data;
        console.log(content)
        dispatch(setCredentials({ accessToken: access_token, username: username, role: role, user: content }));
        showToast("Welcome back", username);

        navigate(from, { replace: true });
    } catch (error) {
        console.error("Login failed:", error.message);
        showToast("Login failed. Please try again later.");
    }
};

const showToast = (message, username) => {
    toast({
        title: `${message}!`,
        description: username ? `Welcome back ${username}!` : "Use correct information.",
        status: username ? "success" : "error",
        duration: 5000,
        isClosable: true,
        position: "top",
    });
};

  return (
    <Flex
      flexDir={{ base: "column", md: "row" }}
      align={"stretch"}
    >
      <Flex
        flexDir={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        w={{ base: "100%", md: "50%" }}
        bg={theme.color5}
      >
        <Box className="flex gap-3 py-4 px-4 items-center">
          <Image
            display={{ base: "none", md: "block" }}
            src="/logo-transparent.png"
            w={20}
            h={20}
            alt="logo "
            ml={3}
          />
          <Text className="font-bold font-raleway text-7xl text-white ">
            TechVerse
          </Text>
        </Box>
        {/* <Box
          className="flex flex-col text-white flex-wrap-reverse justify-evenly"
          // m={"auto"}
        >
          <Text className="font-raleway text-xl w-4/5">
            Explore our guides, references and examples to tech related content
            on our platform.
          </Text>
          <Text className="font-raleway text-xl w-4/5">Guided product walkthroughs.</Text>

          <Text className="font-raleway text-xl w-4/5"> Easily accessible code samples.</Text>
        </Box> */}
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
        className="h-screen w-full py-[60px] flex flex-col justify-center items-center"
      >
        <Text className="mb-10 font-semibold font-montserrat text-[#33658a] text-4xl">Sign in</Text>

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
                            focusBorderColor={"#33658a"}
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
                            focusBorderColor={"#33658a"}
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

                <Button
                  alignSelf={"center"}
                  w={"150px"}
                  bg={"#33658a"}
                  color={"#fff"}
                  type="submit"
                  variant={"ghost"}
                  _hover={{ boxShadow:'dark-lg'}}
                  isLoading={isSubmitting}
                  fontFamily={'montserrat'}
                >
                  Sign In
                </Button>
                <Box fontSize="sm" className="mx-auto">
                  <Text fontFamily={'montserrat'}>
                    Don't have an account? &nbsp;
                    <Link to="/SignUp">
                      <span className="font-montserrat hover:text-[#33658a]">
                        Sign Up
                      </span>
                    </Link>
                  </Text>
                </Box>
              </Stack>
            </Form>
          )}
        </Formik>
        {/* <button  className="px-6 py-3 flex text-red-700 font-bold" onClick={()=> navigate('/')}>
          <IoChevronBack fontSize={'1.3rem'}/>Back
        </button> */}
      </Box>
    </Flex>
  );
}

export default SignIn;

