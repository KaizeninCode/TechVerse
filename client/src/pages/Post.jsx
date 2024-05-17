import React, { useState } from "react";
import {
  Textarea,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { FaImages } from "react-icons/fa";
import { IoAdd } from "react-icons/io5";

const Post = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [file, setFile] = useState(null);
  const [input, setInput] = useState({
    category_id: "",
    title: "",
    description: "",
    link: "",
    type:'',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check for required fields
    if (
      !input.title.trim() ||
      !input.description.trim() ||
      !input.category_id ||
      !file
    ) {
      setError(
        "Please fill in all required fields (Title, Description, Category, and File)"
      );
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const formData = new FormData();
    formData.append("category_id", input.category_id);
    formData.append("title", input.title);
    formData.append("description", input.description);
    formData.append("file", file);
    formData.append("link", input.link);

    try {
      const response = await fetch("http://127.0.0.1:5555/contents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        setError(
          errorMessage.error || "An error occurred. Please try again later."
        );
      } else {
        setSuccess("Post created successfully!");
        setInput({
          category_id: "",
          title: "",
          description: "",
          link: "",
        });
        setFile(null);
      }
    } catch (error) {
      console.error("Error posting data:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        className="rounded-full bg-cyan-600 border font-bold flex justify-center align-middle text-slate-300 hover:bg-cyan-700 m-4 px-4 py-3"
        onClick={onOpen}
      >
        <IoAdd fontSize={"1.5rem"} />
        Create a Post
      </button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        size={"2xl"}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <img
              src="https://wallpapers.com/images/featured/cool-profile-picture-87h46gcobjl5e4xu.jpg"
              alt="name"
              className="rounded-full w-20 h-20"
            />
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form className="block w-full" onSubmit={handleSubmit}>
              <h1 className="font-bold text-2xl text-slate-900">
                Create a Post
              </h1>
              <select
                className="rounded-xl p-3"
                name="category_id" // Ensure name matches backend field
                value={input.category_id}
                onChange={handleChange}
              >
                <option value="">Select the topic</option>
                <option value="Frontend Programming">
                  Frontend Programming
                </option>
                <option value="Backend Programming">Backend Programming</option>
                <option value="Fullstack Development">
                  Fullstack Development
                </option>
                <option value="Data Science">Data Science</option>
                <option value="Machine Learning">Machine Learning</option>
                <option value="Dev-Ops">Dev-Ops</option>
                <option value="UI/UX">UI/UX</option>
              </select>
              <h3 className="font-bold">Text</h3>
              <input
                name="title"
                value={input.title}
                className="rounded-xl border-2 border-slate-400 my-3 w-full p-3"
                type="text"
                placeholder="Title"
                onChange={handleChange}
              />
              <Textarea
                name="description"
                value={input.description}
                className="w-full rounded-md p-3 border-2 border-slate-400"
                onChange={handleChange}
                placeholder="Body"
              />
              <hr />
              <h3 className="font-bold">Image/Video</h3>
              <div className="flex p-4 border-dotted border-2 border-slate-800 my-3 justify-center align-middle rounded-md h-fit">
                <label className="drop-area">
                  <input
                    type="file"
                    accept="image/*, video/*"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                  <p className="w-fit flex p-2">
                    Drag and drop an image/video
                    <FaImages />
                  </p>
                  {file && (
                    <div>
                      <h3>Preview:</h3>
                      {file.type.startsWith("image/") ? (
                        <img
                          src={URL.createObjectURL(file)}
                          alt="Preview"
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        />
                      ) : (
                        <video
                          controls
                          style={{ maxWidth: "100%", maxHeight: "200px" }}
                        >
                          <source
                            src={URL.createObjectURL(file)}
                            type={file.type}
                          />
                          Your browser does not support the video tag.
                        </video>
                      )}
                    </div>
                  )}
                </label>
              </div>
              <hr />
              <h3 className="font-bold">Link</h3>
              <input
                name="link"
                value={input.link}
                onChange={handleChange}
                className="rounded-xl border-2 border-slate-400 my-3 w-full p-3"
                type="url"
                placeholder="Link URL"
              />
              <div className="flex justify-between w-full">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Post
                </button>
              </div>
            </form>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

export default Post;
