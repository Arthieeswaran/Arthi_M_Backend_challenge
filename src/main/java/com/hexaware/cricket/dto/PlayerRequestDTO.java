package com.hexaware.cricket.dto;
import jakarta.validation.constraints.*;
import lombok.*;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class PlayerRequestDTO {
	@NotBlank(message = "Player name is required")
    @Size(min = 2, max = 100, message = "Player name must be between 2 and 100 characters")
	private String playerName;
	@NotNull(message = "Jersey number is required")
    @Min(value = 0, message = "Jersey number must be 0 or greater")
    @Max(value = 999, message = "Jersey number cannot exceed 999")
	private Integer jerseyNumber;
	@NotBlank(message = "Role is required")
    @Pattern(
        regexp = "^(Batsman|Bowler|Keeper|All Rounder)$",
        message = "Role must be one of: Batsman, Bowler, Keeper, All Rounder"
    )
	private String role;
    @Min(value = 0, message = "Total matches cannot be negative")
    private Integer totalMatches;
    @NotBlank(message = "Team name is required")
    private String teamName;
    @NotBlank(message = "State name is required")
	private String stateName;
    private String description;
}
