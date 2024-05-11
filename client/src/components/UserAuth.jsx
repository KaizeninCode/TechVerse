import React, { useState } from "react";
import { signinValidationSchema, signupValidationSchema } from "../Schemas";
import {
  Box,
  FormLabel,
  Select,
  Button,
  ButtonGroup,
  FormControl,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  AtSignIcon,
  EmailIcon,
  LockIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { Field, Form, Formik } from "formik";

const UserAuth = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [activeForm, setActiveForm] = useState("");
  const [showPassword, setShowPassord] = useState(false);

  const handleTogglePassword = () => {
    setShowPassord(!showPassword);
  };
  const signInInitialValues = {
    email: "",
    password: "",
  };

  const signUpInitialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, actions) => {
    actions.resetForm({
      values:
        activeForm === "signin" ? signInInitialValues : signUpInitialValues,
    });
    onClose();
  };

  const handleFormChange = (formType) => {
    setActiveForm(formType);
    onOpen();
  };

  return (
    <Box
      position={"sticky"}
      bottom={0}
      height={"80px"}
      width={"100%"}
      bg={"#33658a"}
    >
      <ButtonGroup float={"right"} marginRight={"40px"} marginTop={"5"}>
        <Button
          w={{ base: "50%", md: "auto" }}
          color={"#ffff"}
          fontFamily={"Montserrat"}
          borderRadius={"30px"}
          bg={"#33658a"}
          border={"1px "}
          borderColor={"#ffff"}
          onClick={() => handleFormChange("signin")}
        >
          Sign In
        </Button>
        <Button
          w={{ base: "50%", md: "auto" }}
          borderRadius={"30px"}
          onClick={() => handleFormChange("signup")}
          fontFamily={"Montserrat"}
        >
          Sign Up
        </Button>
      </ButtonGroup>
      <Text
        display={{ base: "none", md: "flex" }}
        className="font-montserrat text-white text-lg font-semibold content-center text-center justify-center flex py-6"
      >
        Don't miss out on the current trends in the tech ecosystem
      </Text>
      <Modal isOpen={isOpen} onClose={onClose} alignItems={"center"}>
        <ModalOverlay />
        <ModalContent
          bg={"#ffff"}
          color={"#101010"}
          minH={{ base: "auto", md: "400px" }}
          display={"flex"}
          justify={"center"}
          fontFamily={"montserrat"}
        >
          <ModalHeader textAlign={"center"} color={"#"}>
            {activeForm === "signup"
              ? "Join TechVerse today"
              : "Sign in to TechVerse"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Formik
              initialValues={
                activeForm === "signup"
                  ? signUpInitialValues
                  : signInInitialValues
              }
              validationSchema={
                activeForm === "signup"
                  ? signupValidationSchema
                  : signinValidationSchema
              }
              onSubmit={handleSubmit}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Stack direction={"column"} spacing={8}>
                    {activeForm === "signup" ? (
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

                        <Field name="email">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.email && form.touched.email
                              }
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
                                    {showPassword ? (
                                      <ViewOffIcon />
                                    ) : (
                                      <ViewIcon />
                                    )}
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
                                    {showPassword ? (
                                      <ViewOffIcon />
                                    ) : (
                                      <ViewIcon />
                                    )}
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
                        <FormControl>
                          <FormLabel>Choose a user</FormLabel>
                          <Select
                            className="rounded-xl"
                            placeholder="Select user category"
                          >
                            <option>Admin</option>
                            <option>Staff</option>
                            <option>Student</option>
                          </Select>
                        </FormControl>
                      </>
                    ) : (
                      <>
                        <Field name="email">
                          {({ field, form }) => (
                            <FormControl
                              isInvalid={
                                form.errors.email && form.touched.email
                              }
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
                                    {showPassword ? (
                                      <ViewOffIcon />
                                    ) : (
                                      <ViewIcon />
                                    )}
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
                    )}

                    <Box fontSize="sm">
                      {activeForm === "signup" ? (
                        <Text>
                          Already have an account?{" "}
                          <span
                            onClick={() => handleFormChange("signin")}
                            cursor={"pointer"}
                            textDecoration={"underline"}
                          >
                            Sign in
                          </span>{" "}
                          instead
                        </Text>
                      ) : (
                        <Text>
                          Don't have an account?{" "}
                          <span
                            onClick={() => handleFormChange("signup")}
                            cursor={"pointer"}
                            textDecoration={"underline"}
                          >
                            Sign up
                          </span>
                        </Text>
                      )}
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
                      {activeForm === "signup" ? "Sign up" : "Sign in"}
                    </Button>
                  </Stack>
                </Form>
              )}
            </Formik>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default UserAuth;
