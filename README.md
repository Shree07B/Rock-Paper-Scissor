# Rock Paper Scissors

A simple browser-based Rock Paper Scissors game built as a college Java project.

## Technologies

- HTML — game structure
- CSS — responsive user interface
- JavaScript — browser interaction and HTTP requests
- Java 17 — game logic and web server
- Maven — project build and run tool

## How it works

The browser loads the HTML, CSS and JavaScript from the Java server. When the player chooses Rock, Paper or Scissors, JavaScript sends the choice to the Java `/api/play` endpoint. Java generates a random computer choice, decides the winner and sends the result back as JSON.

## Run the project

### Requirements

- Java JDK 17 or newer
- Maven

### Start the server

From the project folder, run:

```bash
mvn clean compile
mvn exec:java
```

Then open:

`http://localhost:8080`

Keep the terminal running while playing. Press `Ctrl+C` to stop the server.

## Project structure

```text
Rock-Paper-Scissor/
├── index.html
├── style.css
├── script.js
├── pom.xml
└── src/main/java/com/shree07/rockpaperscissor/
    ├── Game.java
    └── GameServer.java
```

## Features

- Player vs computer
- Random computer move
- Win, lose and draw detection
- Score tracking
- Round counter
- New Game button
- Responsive HTML/CSS interface
- Java backend connected through HTTP
