import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementScore, resetScore } from "../redux/actions";
import {
  Typography,
  Button,
  Box,
  List,
  ListItem,
  LinearProgress,
} from "@mui/material";

const Quiz = ({ topic, onTopicDeselection }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const score = useSelector((state) => state.score);
  const dispatch = useDispatch();

  const progressPercentage =
    (currentQuestionIndex / topic.questions.length) * 100;

  const handleAnswer = (selectedOption) => {
    if (
      selectedOption === topic.questions[currentQuestionIndex].correctAnswer
    ) {
      dispatch(incrementScore());
    }

    if (currentQuestionIndex + 1 < topic.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    dispatch(resetScore());
    setCurrentQuestionIndex(0);
    setShowResults(false);
    onTopicDeselection();
  };

  return (
    <Box>
      {!showResults && (
        <>
          <Typography variant="h2" component="h2" gutterBottom>
            {topic.questions[currentQuestionIndex].question}
          </Typography>
          <LinearProgress variant="determinate" value={progressPercentage} />
          <Box mt={2}>
            <List>
              {topic.questions[currentQuestionIndex].options.map(
                (option, index) => (
                  <ListItem key={index}>
                    <Button
                      variant="outlined"
                      onClick={() => handleAnswer(index)}
                    >
                      {option}
                    </Button>
                  </ListItem>
                )
              )}
            </List>
          </Box>
        </>
      )}

      {showResults && (
        <Box textAlign="center">
          <Typography variant="h2" component="h2" gutterBottom>
            Results
          </Typography>
          <Typography variant="body1">
            You scored {score} out of {topic.questions.length} questions.
          </Typography>
          <Button variant="contained" onClick={resetQuiz}>
            Try another topic
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Quiz;
