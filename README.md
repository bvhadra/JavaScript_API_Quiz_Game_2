<h1>Trivia Quiz Game</h1>
<h3>Overview</h3>
<h4>The Trivia Quiz Game is an interactive web-based quiz application designed to challenge users with a variety of trivia questions. Built with JavaScript, HTML, and CSS, this application leverages the Open Trivia Database API to fetch trivia questions, providing users with a dynamic and engaging quiz experience. The game offers advanced features such as category and difficulty selection, a countdown timer, and real-time feedback on answers.</h4>

<h3>Features</h3>

<h4>1. User-Friendly Interface</h4>
Responsive Design: The application is designed to be accessible on various devices, including desktops, tablets, and mobile phones.
Modern Aesthetic: Utilizes Google Fonts for a clean and professional look.
<h4>2. Dynamic Quiz Settings</h4>
Category Selection: Users can choose from a wide range of trivia categories fetched from the Open Trivia Database API.
Difficulty Levels: The game offers three levels of difficulty - easy, medium, and hard, allowing users to select their preferred challenge level.
<h4>3. Real-Time Gameplay Features</h4>
Countdown Timer: Each question is timed, with a visual countdown bar to enhance the sense of urgency.
Score Tracking: The game keeps track of the user's score, updating in real-time as they answer questions correctly or incorrectly.
Progress Bar: A progress bar indicates how many questions have been answered and how many remain.
<h4>4. Interactive Question and Answer Display</h4>
Randomized Answers: Answers are displayed in a random order to ensure a challenging experience.
Immediate Feedback: Users receive instant feedback on their answers, highlighting the correct answer and providing a brief explanation when necessary.
Disabling of Answer Choices: Once an answer is selected or time runs out, answer choices are disabled to prevent changes.
<h4>5. Game Control Options</h4>
End Game: Users can end the game at any point, viewing their final score.
Play Again: After the game ends, users have the option to restart the quiz.
Quit: Users can choose to exit the game entirely.
<h3>Technical Details</h3>
<h4>File Structure</h4>
index.html: The main HTML file that structures the web page and links the stylesheet and JavaScript file.
styles.css: The CSS file that styles the quiz interface, including layout, colors, and fonts.
quiz-app.js: The JavaScript file that contains the logic for fetching questions, handling user interactions, updating the UI, and managing game state.
<h4>How It Works</h4>
<h4>Initialization:</h4> When the page loads, the category options are populated by fetching data from the Open Trivia Database API.
<h4>Starting the Quiz:</h4> Users select a category and difficulty level to start the quiz. The application then fetches questions based on the selected options.
<h4>Gameplay:</h4>
A question is displayed with multiple answer choices.
A timer starts counting down from 30 seconds.
Users select an answer, and the application provides immediate feedback.
The score is updated based on the user's answer.
After feedback, users can proceed to the next question.
<h4>End of Game:</h4> After answering all questions or ending the game early, the user’s final score is displayed, and they can choose to play again or quit.

