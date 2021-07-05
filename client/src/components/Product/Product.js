import React, { useState, useContext, Fragment } from "react";
import { ProductForm } from "./ProductForm.js";
import { ProductContext } from "../../provider/ProductProvider.js";
import {
  Flex,
  Spacer,
  Box,
  VStack,
  Button,
  Divider,
  ButtonGroup,
  CloseButton
} from "@chakra-ui/react";

export const Product = (props) => {
  const [toggleEdit, setToggleEdit] = useState(false);

  const { deleteProduct } = useContext(ProductContext);

  const { title, description, price, quantity, imgUrl, _id } = props;
  console.log(_id);
  return (
    <div>
      <Divider orientation="horizontal" />
      {!toggleEdit ? (
        <Flex>
          <Box w="100px" h="90px" p="10px">
            {title}
          </Box>
          <Spacer />
          <Box w="70x" h="90px">
            {description}
          </Box>
          <Spacer />
          <Box w="70px" h="90px">
            {price}
          </Box>
          <Spacer />
          <Box w="70px" h="90px">
            {quantity}
          </Box>
          <Spacer />
          <Box w="70px" h="90px">
            <img height={"64px"} width={"60px"} src={imgUrl} alt={imgUrl} />
          </Box>
          <Spacer />

          <VStack spacing={4} align="stretch" p="10px">
            <Button
              h="30px"
              colorScheme="orange"
              variant="outline"
              onClick={() => setToggleEdit((prev) => !prev)}
            >
              Edit
            </Button>

            <Button
              h="30px"
              colorScheme="red"
              variant="outline"
              onClick={() => deleteProduct(_id)}
            >
              Delete
            </Button>
          </VStack>
        </Flex>
      ) : (
        <Fragment>
          <ProductForm
            toggleEdit={toggleEdit}
            setToggleEdit={setToggleEdit}
            _id={_id}
            title={title}
            description={description}
            price={price}
            quantity={quantity}
            imgUrl={imgUrl}
          />
          <CloseButton size="sm" onClick={() => setToggleEdit((prev) => !prev)}/>
        </Fragment>
      )}
    </div>
  );
};
