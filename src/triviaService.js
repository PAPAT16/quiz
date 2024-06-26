
import axios from 'axios';

const API_URL = 'https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple';

export const fetchTriviaQuestions = async (amount, category, difficulty, type) => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        amount: amount,
        category: category,
        difficulty: difficulty,
        type:type,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trivia questions:', error);
    throw error;
  }
};