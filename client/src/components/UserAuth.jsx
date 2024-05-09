import React, { useState } from "react";
import { signinValidationSchema, signupValidationSchema } from "../Schemas";
import {
  Box,
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
    <Box>
      <ButtonGroup>
        <Button onClick={() => handleFormChange("signup")}>Sign Up</Button>
        <Button onClick={() => handleFormChange("signin")}>Sign In</Button>
      </ButtonGroup>
      <Modal isOpen={isOpen} onClose={onClose} alignItems={"center"}>
        <ModalOverlay />
        <ModalContent
          bg={"#0A66C2"}
          color={"#101010"}
          minH={{ base: "auto", md: "400px" }}
          display={"flex"}
          justify={"center"}
        >
          <ModalHeader textAlign={"center"} color={"#"}>
            {activeForm === "signup" ? "Sign up" : "Sign in"}
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
                    {activeForm === "signup" && (
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
                    )}
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
                    {activeForm === "signup" && (
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
                    )}
                    <Text fontSize="sm">
                      {activeForm === "signup"
                        ? "Already have an account? Sign in instead"
                        : "Don't have an account? sign up "}
                    </Text>
                    <Button
                      alignSelf={"center"}
                      w={"150px"}
                      bg={"#33658A"}
                      type="submit"
                      variant={"ghost"}
                      _hover={{ background: "#393D3F" }}
                      isLoading={isSubmitting}
                    >
                      {activeForm === "signup" ? "Signup" : "Signin"}
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
