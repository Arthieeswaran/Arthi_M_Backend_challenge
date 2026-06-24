package com.hexaware.cricket.dto;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PlayerResponseDTO {
	private Long playerId;
	private String playerName;
	private Integer jerseyNumber;
	private String role;
	private Integer totalMatches;
	private String teamName;
	private String stateName;
	private String description;
}
