<template>
  <h1>Welcome To My Quiz-App</h1>
  <button @click="loadQuestions">Start</button>
  <div v-if="questions.length">
      <div v-if="currentQuestionIndex < questions.length" >
        <p v-html="questions[currentQuestionIndex].question"></p>
        <ul>
          <li v-for="(answer, aIndex) in getAllAnswers(questions[currentQuestionIndex])" :key="aIndex">
            <label>
              <input type="radio" :value="answer"
                v-model="selectedAnswers[currentQuestionIndex]"
                />
              {{answer}}
            </label>
          </li>
        </ul>
        <button @click="submitAnswer">Submit Answer</button>
        <p v-if="feedback[currentQuestionIndex] !== null" class="feed">{{ feedback[currentQuestionIndex] }}</p>
      </div>
      <div v-else>
        <p>You've completed the quiz!</p>
        <p>Your final score is: {{ score }}/10</p>
        <p>Your final time is: {{ time }}s</p>
        <button @click="restartQuiz">Restart Quiz</button>
      </div>
    </div>

  <HelloWorld />
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import { fetchTriviaQuestions } from "./triviaService";
export default {
  name: "App",
  components: {
    HelloWorld,
  },
  data() {
    return {
      questions: [],
      selectedAnswers: [],
      feedback: [],
      currentQuestionIndex: 0,
      score: 0,
      time: 0,
    };
  },
  methods: {
    async loadQuestions() {
      try {
        this.questions = await fetchTriviaQuestions(10, null, 'medium', 'multiple');
        this.selectedAnswers = new Array(this.questions.length).fill(null);
        this.feedback = new Array(this.questions.length).fill(null);
        this.currentQuestionIndex = 0;
      } catch (error) {
        console.error('Failed to load trivia questions:', error);
      }
    },
    getAllAnswers(question) {
      return [...question.incorrect_answers, question.correct_answer].sort();
    },
    submitAnswer() {
      const currentQuestion = this.questions[this.currentQuestionIndex];
      const correctAnswer = currentQuestion.correct_answer;
      if (this.selectedAnswers[this.currentQuestionIndex] === correctAnswer) {
        this.feedback[this.currentQuestionIndex] = 'Correct!';
        this.score++;
        this.time++;
      } else {
        this.feedback[this.currentQuestionIndex] = `Incorrect! The correct answer was: ${correctAnswer}`;
      }
      setTimeout(() => {
        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.length) {
          this.feedback[this.currentQuestionIndex - 1] = null; // Clear previous feedback
        }
      }, 1000); // Move to the next question after a delay of 1 second
    },
    restartQuiz() {
      this.questions = [];
      this.selectedAnswers = [];
      this.feedback = [];
      this.currentQuestionIndex = 0;
      this.score = 0;
      this.time = 0;
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  list-style-type: none;
}
body{
  background: #006769;
}
button {
  border: 2px solid    #42b983;
  height: 45px;
  width: 150px;
  background: none;
  font-size: 20px;
  color: #42b983;
  font-family: cursive;
  /* margin-bottom: 20px; */
  /* margin-top: 200px; */
}
button:hover {
  background: #42b983;
  color: white;
  box-shadow: 0px 0px 10px #a1f0cc;
}
ul {
  background: #42b983;
  list-style-type: none;
  padding: 20px;
}
li{
  font-size: 20px;
  color: white;
  font-family: cursive;
}
h1{
  color: #42b983;
  font-family: cursive;
}
p{
font-size: 20px;
color: white;
}
</style>
