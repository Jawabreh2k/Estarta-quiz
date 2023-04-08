import { useState, useEffect } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import Quiz from "./components/Quiz";

const App = () => {
  const [topics, setTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);

  useEffect(() => {
    fetch("/questions.json")
      .then((response) => response.json())
      .then((data) => setTopics(data.topics));
  }, []);

  const handleTopicSelection = (topic) => {
    setSelectedTopic(topic);
  };

  const handleTopicDeselection = () => {
    setSelectedTopic(null);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h1" component="h1" textAlign="center" gutterBottom>
        Quiz App
      </Typography>
      {!selectedTopic ? (
        <Box sx={{ display: "grid", gridGap: "1rem" }}>
          {topics.map((topic, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => handleTopicSelection(topic)}
            >
              {topic.name}
            </Button>
          ))}
        </Box>
      ) : (
        <Quiz
          topic={selectedTopic}
          onTopicDeselection={handleTopicDeselection}
        />
      )}
    </Container>
  );
};

export default App;
