package com.hexaware.cricket.entity;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
@Entity
@Table(name="players")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder

public class Player {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long playeId;
	@NotBlank(message = "Player name is required")
    @Size(min = 2, max = 100, message = "Player name must be between 2 and 100 characters")
    @Column(nullable = false)
	private String playerName;
	@NotNull(message = "Jersey number is required")
    @Min(value = 0, message = "Jersey number must be 0 or greater")
    @Max(value = 999, message = "Jersey number cannot exceed 999")
    @Column(nullable = false, unique = true)
	private Integer jerseyNumber;
	@NotBlank(message = "Role is required")
	@Pattern(
	        regexp = "^(Batsman|Bowler|Keeper|All Rounder)$",
	        message = "Role must be one of: Batsman, Bowler, Keeper, All Rounder"
	    )
	@Column(nullable=false)
	private String role;
	@Min(value = 0, message = "Total matches cannot be negative")
    @Column(columnDefinition = "int default 0")
	private Integer totalMatches;
	@NotBlank(message = "Team name is required")
    @Column(nullable = false)
	private String teamName;
	@NotBlank(message = "State name is required")
    @Column(nullable = false)
	private String stateName;
	@Column(columnDefinition = "TEXT")
	private String description;
	
}
