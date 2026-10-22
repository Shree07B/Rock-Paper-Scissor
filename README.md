# Rock Paper Scissors

A simple browser-based Rock Paper Scissors game built as a college Java project.

## Technologies

- HTML — game structure
- CSS — responsive user interface
- JavaScript — browser interaction and game execution
- Java 17 — college-project implementation of the game logic

## Run directly in a browser

The playable version is fully client-side. It does **not** require a JDK, Maven, Java server, or any installation.

Open `index.html` in any modern browser on a phone or computer.

You can also publish the repository as a static website using GitHub Pages and open the resulting website URL on your phone.

## How it works

HTML provides the game structure and CSS provides the interface. JavaScript handles the browser-side gameplay, including the computer's random choice, winner calculation, score and round tracking. This allows the game to work entirely inside the browser.

The `src/main/java` folder is retained as the Java implementation for the college Java requirement and for demonstrating the same game logic in Java.

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
- Works directly on mobile browsers
- No external runtime required for the browser version
