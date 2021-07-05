import React, { useState, useContext } from "react";
import { ProductContext } from "../../provider/ProductProvider.js";
import {
  Flex,
  Spacer,
  Box,
  VStack,
  Button,
  Divider,
  ButtonGroup,
  CloseButton,
  Select,
  Input,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

export const ProductForm = (props) => {
  const { addProduct, editProduct, sorter, getUserProducts, handleSelect } =
    useContext(ProductContext);
  const { toggleEdit, setToggleEdit, _id } = props;

  const initInputs = {
    title: props.title || "",
    description: props.description || "",
    price: props.price || 0,
    quantity: props.quantity || 0,
    imgUrl: props.imgUrl || "",
  };

  const [inputs, setInputs] = useState(initInputs);
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue("gray.100", "gray.700");

  const setInit = () => {
    setInputs(initInputs);
    Array.from(document.querySelectorAll("input")).forEach(
      (input) => (input.value = "")
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    addProduct(inputs);
    setInit();
  };

  const handleEditSubmit = (e) => {
    editProduct(inputs, _id);
    setToggleEdit((prev) => !prev);
    getUserProducts();
  };

  return (
    <Box background={formBackground} p="10px">
      <form>
        {!toggleEdit ? (
          <Box>
            <Flex align="center" justify="center">
              <Button onClick={toggleColorMode}>Toggle Dark Mode</Button>
            </Flex>
            <label>
              Sort By:
              <Select
                variant="filled"
                value={sorter.value}
                onChange={handleSelect}
              >
                <option value={"-"}>------------------------</option>
                <option value={"A_Z"}>Alphabetically A-Z</option>
                <option value={"Z_A"}>Alphabetically Z-A</option>
                <option value={"$$$_$"}>Price $$$-$</option>
                <option value={"$_$$$"}>Price $-$$$</option>
              </Select>
            </label>
          </Box>
        ) : (
          <React.Fragment></React.Fragment>
        )}

        <Flex>
          <Box w="100px" h="90px" p="10px">
            <label>
              Title:
              <Input
                variant="outline"
                type="text"
                name="title"
                value={inputs.title}
                onChange={handleChange}
              />
            </label>
          </Box>
          <Spacer />
          <Box w="70x" h="90px" mt="5px">
            <label>
              Description:
              <Input
                variant="outline"
                type="text"
                name="description"
                value={inputs.description}
                onChange={handleChange}
              />
            </label>
          </Box>
          <Spacer />
          <Box w="70px" h="90px">
            <label>
              Price:
              <Input
                variant="outline"
                type="number"
                name="price"
                min="0"
                value={inputs.price}
                onChange={handleChange}
              />
            </label>
          </Box>
          <Spacer />
          <Box w="70px" h="90px">
            <label>
              Quantity:
              <Input
                variant="outline"
                type="number"
                name="quantity"
                min="0"
                value={inputs.quantity}
                onChange={handleChange}
              />
            </label>
          </Box>
          <Spacer />
          <Box w="70px" h="90px">
            <label>
              Img Url:
              <Input
                variant="outline"
                type="text"
                name="imgUrl"
                value={inputs.imgUrl}
                onChange={handleChange}
              />
            </label>
          </Box>
          <Spacer />

          <VStack spacing={4} align="stretch" p="10px">
            {!toggleEdit ? (
              <button onClick={handleSubmit}>Submit</button>
            ) : (
              <button onClick={handleEditSubmit}>Submit Edit</button>
            )}
          </VStack>
        </Flex>
      </form>
    </Box>
  );
};
