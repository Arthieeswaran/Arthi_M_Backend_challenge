package com.hexaware.cricket.exception;

public class PlayerNotFoundException extends RuntimeException{
	public PlayerNotFoundException(Long playerId) {
		super("Player not found with ID:"+playerId);
	}
	public PlayerNotFoundException(String message) {
		super(message);
	}
}
