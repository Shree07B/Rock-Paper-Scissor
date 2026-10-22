package com.shree07.rockpaperscissor;

import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class GameServer {
    private static final int PORT = 8080;
    private static final Game GAME = new Game();
    private static final Pattern CHOICE_PATTERN = Pattern.compile("\\\"choice\\\"\\s*:\\s*\\\"(rock|paper|scissors)\\\"");

    public static void main(String[] args) throws IOException {
        HttpServer server = HttpServer.create(new InetSocketAddress(PORT), 0);
        server.createContext("/api/play", GameServer::handlePlay);
        server.createContext("/", GameServer::handleStaticFile);
        server.setExecutor(null);
        server.start();

        System.out.println("Rock Paper Scissors is running at http://localhost:" + PORT);
        System.out.println("Press Ctrl+C to stop the server.");
    }

    private static void handlePlay(HttpExchange exchange) throws IOException {
        if (!exchange.getRequestMethod().equalsIgnoreCase("POST")) {
            sendJson(exchange, 405, "{\"error\":\"Method not allowed\"}");
            return;
        }

        String body = new String(exchange.getRequestBody().readAllBytes(), StandardCharsets.UTF_8);
        Matcher matcher = CHOICE_PATTERN.matcher(body);

        if (!matcher.find()) {
            sendJson(exchange, 400, "{\"error\":\"Invalid choice\"}");
            return;
        }

        try {
            Game.RoundResult result = GAME.play(matcher.group(1));
            String json = String.format(
                    "{\"playerChoice\":\"%s\",\"computerChoice\":\"%s\",\"result\":\"%s\"}",
                    result.playerChoice(), result.computerChoice(), result.result());
            sendJson(exchange, 200, json);
        } catch (IllegalArgumentException e) {
            sendJson(exchange, 400, "{\"error\":\"Invalid choice\"}");
        }
    }

    private static void handleStaticFile(HttpExchange exchange) throws IOException {
        String requested = exchange.getRequestURI().getPath();
        if (requested.equals("/")) requested = "/index.html";

        Path file = Paths.get(".", requested.substring(1)).normalize();
        Path root = Paths.get(".").toAbsolutePath().normalize();
        if (!file.toAbsolutePath().normalize().startsWith(root) || !Files.isRegularFile(file)) {
            sendText(exchange, 404, "Not found", "text/plain; charset=UTF-8");
            return;
        }

        String contentType = contentType(file.toString());
        byte[] data = Files.readAllBytes(file);
        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.getResponseHeaders().set("Cache-Control", "no-cache");
        exchange.sendResponseHeaders(200, data.length);
        try (OutputStream output = exchange.getResponseBody()) {
            output.write(data);
        }
    }

    private static String contentType(String file) {
        if (file.endsWith(".html")) return "text/html; charset=UTF-8";
        if (file.endsWith(".css")) return "text/css; charset=UTF-8";
        if (file.endsWith(".js")) return "application/javascript; charset=UTF-8";
        return "application/octet-stream";
    }

    private static void sendJson(HttpExchange exchange, int status, String json) throws IOException {
        sendText(exchange, status, json, "application/json; charset=UTF-8");
    }

    private static void sendText(HttpExchange exchange, int status, String text, String contentType) throws IOException {
        byte[] data = text.getBytes(StandardCharsets.UTF_8);
        exchange.getResponseHeaders().set("Content-Type", contentType);
        exchange.sendResponseHeaders(status, data.length);
        try (OutputStream output = exchange.getResponseBody()) {
            output.write(data);
        }
    }
}
