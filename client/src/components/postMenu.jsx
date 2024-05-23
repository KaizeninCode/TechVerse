import React, { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorMode,
  Box,
  useToast,
} from "@chakra-ui/react";
import { IoMdSettings } from "react-icons/io";
import { MdDarkMode } from "react-icons/md";
import { UseTheme } from "./ThemeContext";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaFlag } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { MdUnsubscribe } from "react-icons/md";
import useAuth from "../features/UseAuth";
import { TiUserAdd } from "react-icons/ti";
import { FaShare } from "react-icons/fa6";
import DeletePost from "./deletePost";
import { useLocation } from "react-router-dom";
import useDisclosure from "../utils/useDisclosure";

import Share from "./Share";
import { selectUserData } from "../features/AuthSlice";
import { useSelector } from "react-redux";
function PostMenu({ postId, categoryId }) {
  const colorMode = useColorMode();
  const isAuthorized = useAuth(["staff", "admin"]);
  const isAdmin = useAuth(["admin", "staff"]);
  const isStaff = useAuth(["staff"]);
  const isStudent = useAuth(["student"]);
  const currentPost = useLocation();
  const post = currentPost.state?.item;
  const { handleDisclose, isOpen } = useDisclosure();
  const navigate = useNavigate();

  const user = useSelector(selectUserData);
  const toast = useToast();
  const [subscriptionData, setSubscriptionData] = useState({
    user_id: user.id,
    category_id: categoryId,
  });

  const handleSubscription = async () => {
   

    try {
      const response = await fetch("https://techverse-bzdz.onrender.com/subscriptions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user.id,
          category_id: categoryId,
        }),
      });
      if (!response.ok)
        throw new Error(`HTTP error! status ${response.status}`);
      console.log(categoryId);
      const data = await response.json();
      setSubscriptionData(data);
    //   console.log("Subscription created successfully:", data);
      showToast("Subscription Added!");
    } catch (err) {
      console.error(err.message);
    }
  };

  const showToast = () => {
    toast({
      title: "Subscription Added!",
      description: "Subscription Added successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        fontSize={"1.5rem"}
        aria-label="Options"
        icon={<BiDotsVerticalRounded />}
        variant="ghost"
        color
      />
      <MenuList
        bg={colorMode === "dark" ? "gray.800" : "white"}
        color={colorMode === "dark" ? "white" : "gray.800"}
      >
        {isAdmin && (
          <MenuItem
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            icon={<MdOutlinePublishedWithChanges />}
          >
            <span>Publish</span>
          </MenuItem>
        )}

        {isStaff && (
          <MenuItem
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            icon={<FaEdit />}
          >
            <span>Edit Post</span>
          </MenuItem>
        )}
        {isStudent && (
          <MenuItem
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            icon={<MdUnsubscribe />}
            onClick={handleSubscription}
          >
            <span>Subscribe</span>
          </MenuItem>
        )}
        {isStudent && (
          <>
            <MenuItem
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              icon={<FaShare />}
              onClick={() => handleDisclose(postId)}
            >
              <span>Share</span>
            </MenuItem>
            <Box display={isOpen[postId] ? "block" : "none"}>
              <Share />
            </Box>
          </>
        )}
        {isAdmin && (
          <MenuItem
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <DeletePost postId={postId} />
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
}

export default PostMenu;
