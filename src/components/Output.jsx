 import { useState } from "react";
import { Box, Button, Text, useToast } from "@chakra-ui/react";
import { executeCode } from "../api";

const Output = ({ editorRef, language }) => {
  const toast = useToast();
  const [output, setOutput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [bgColor, setBgColor] = useState("linear(to-r, #1c1c1c, #2f2f2f)");

  const colors = [
    "linear(to-r, #1a1a1a, #2f2f2f)", // Dark Gray
    "linear(to-r, #0e0e0e, #3a3a3a)", // Near Black to Dark Gray
    "linear(to-r, #1c1c1c, #444444)", // Dark Gray to Medium Gray
    "linear(to-r, #1b1b1b, #5b5b5b)", // Dark to Light Gray
    "linear(to-r, #0a0a0a, #2d2d2d)", // Black to Dark Gray
  ];

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;

    try {
      setIsLoading(true);
      const result = await executeCode(language, sourceCode);
      console.log(result); // Log the result for debugging
      setOutput(result.run.output.split("\n"));
      setIsError(result.run.stderr ? true : false);

      // Change the background color with a hacking vibe
      const newColor = colors[Math.floor(Math.random() * colors.length)];
      setBgColor(newColor);
    } catch (error) {
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getCharacterColor = (line) => {
    if (line.includes("Error") || isError) return "gray.400"; // Gray for errors
    if (line.includes("Warning")) return "gray.300"; // Light Gray for warnings
    return "lightgray"; // Default color for regular output
  };

  return (
    <Box w="50%">
      <Text mb={2} fontSize="lg" color="lightgray" fontFamily="monospace">Output</Text>
      <Button
        variant="outline"
        colorScheme="gray"
        mb={4}
        isLoading={isLoading}
        onClick={runCode}
      >
        Run Code
      </Button>
      <Box
        height="75vh"
        p={2}
        color={isError ? "gray.400" : "lightgray"}
        border="1px solid"
        borderRadius={4}
        borderColor={isError ? "gray.500" : "#444"}
        bgGradient={bgColor}
        fontFamily="monospace" // Monospace font for terminal vibe
        textShadow="1px 1px 3px rgba(0, 0, 0, 0.5)"
        overflowY="scroll" // Enable scrolling for output
      >
        {output ? output.map((line, i) => (
          <Text key={i} fontSize="md" textShadow="1px 1px 2px rgba(0, 0, 0, 0.7)">
            <span style={{ color: getCharacterColor(line) }} className="text-white">{`${i + 1} : `}</span>
            {line}
          </Text>
        )) : (
          <Text color="gray.400">Click "Run Code" to see the output here</Text>
        )}
      </Box>
    </Box>
  );
};

export default Output;
