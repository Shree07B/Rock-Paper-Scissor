package com.shree07.rockpaperscissor;

import java.util.Random;

public class Game {
    private static final String[] CHOICES = {"rock", "paper", "scissors"};
    private final Random random = new Random();

    public RoundResult play(String playerChoice) {
        if (playerChoice == null || !isValidChoice(playerChoice)) {
            throw new IllegalArgumentException("Choice must be rock, paper, or scissors.");
        }

        String computerChoice = CHOICES[random.nextInt(CHOICES.length)];
        String result = decideWinner(playerChoice, computerChoice);
        return new RoundResult(playerChoice, computerChoice, result);
    }

    private boolean isValidChoice(String choice) {
        return choice.equals("rock") || choice.equals("paper") || choice.equals("scissors");
    }

    private String decideWinner(String player, String computer) {
        if (player.equals(computer)) return "draw";
        if ((player.equals("rock") && computer.equals("scissors"))
                || (player.equals("paper") && computer.equals("rock"))
                || (player.equals("scissors") && computer.equals("paper"))) {
            return "win";
        }
        return "lose";
    }

    public record RoundResult(String playerChoice, String computerChoice, String result) { }
}
