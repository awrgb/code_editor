import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { LANGUAGE_VERSIONS } from "../constants";

const languages = Object.entries(LANGUAGE_VERSIONS);
const ACTIVE_COLOR = "blue.400";

const LanguageSelector = ({ language, onSelect }) => {
  return (
    <Box
       // Fix the position of the selector
      top="20px"       // Distance from the top
      left="20px"      // Distance from the left
      zIndex={10}      // Ensure it's above other content
      p={4}            // Padding for better UI // Background for visibility
      borderRadius="md" // Optional: rounded corners
    >
      <Text mb={2} fontSize="lg" color="white">
        Language:
      </Text>
      <Menu isLazy position="fixed">
        <MenuButton as={Button}>{language}</MenuButton>
        <MenuList
          bg="#110c1b"
          maxH="200px" // Maximum height for the list
          overflowY="auto" // Enable vertical scrolling
          width="200px" // Set a fixed width for the menu
          minH="50px" // Minimum height to maintain consistent UI
        >
          {languages.map(([lang, version]) => (
            <MenuItem
              key={lang}
              color={lang === language ? ACTIVE_COLOR : ""}
              bg={lang === language ? "gray.900" : "transparent"}
              _hover={{
                color: ACTIVE_COLOR,
                bg: "gray.900",
              }}
              onClick={() => onSelect(lang)}
            >
              {lang}
              &nbsp;
              <Text as="span" color="gray.600" fontSize="sm">
                ({version})
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageSelector;
