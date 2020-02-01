# Pie In The Sky Brief

## Summary
Full-stack game (JavaScript/MongoDB) similar to Trivial Pursuits. Up to 4 players can answer questions based on the category their token lands on after rolling a die in turns. Questions are served via API from OpenTrivia and high scores are saved to a database which is displayed in a chart at the end of the game.

## Install
To install, clone the repository and run 'npm install' before running the build task and then the server:dev task

## MVP

### FRONT-END
* A user should be able to roll the die
* A user should be able to move their token clockwise around the board
* A user should be able to answer multi-category questions
* A user should have a score
* A user should be able to win the game [EXT]
* A user should be able to enter their name [EXT]
* 4 Players should be able to play [EXT]
* A user should have instructions on how to play [EXT]
* A user should be able to move freely around the board [EXT]
* A user should have a time limit for each turn [EXT]
* The score should be displayed in a pie slice [EXT]
* The user token should animate when moving [EXT]
* A user should hear fanfare when winning [EXT]

### BACK-END
* A user should be entered into a high score database [EXT]
* High scores should be displayed in a chart [EXT]