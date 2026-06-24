package com.hexaware.cricket.controller;
import com.hexaware.cricket.dto.PlayerRequestDTO;
import com.hexaware.cricket.dto.PlayerResponseDTO;
import com.hexaware.cricket.service.PlayerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
@RestController
@RequestMapping("/api/players")
@RequiredArgsConstructor
@Slf4j

public class PlayerController {
	private final PlayerService playerService;
	@GetMapping
    public ResponseEntity<List<PlayerResponseDTO>> getAllPlayers() {
        log.info("GET /api/players called");
        List<PlayerResponseDTO> players = playerService.getAllPlayers();
        return ResponseEntity.ok(players);
    }
	 @GetMapping("/{playerId}")
	 public ResponseEntity<PlayerResponseDTO> getPlayerById(@PathVariable Long playerId) {
		 log.info("GET /api/players/{} called", playerId);
	     PlayerResponseDTO player = playerService.getPlayerById(playerId);
	     return ResponseEntity.ok(player);
	 }
	 @PostMapping
	 public ResponseEntity<PlayerResponseDTO> createPlayer(@Valid @RequestBody PlayerRequestDTO requestDTO) {
		 log.info("POST /api/players called for player: {}", requestDTO.getPlayerName());
	     PlayerResponseDTO createdPlayer = playerService.createPlayer(requestDTO);
	     return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);  // Returns 201
	 }
	 @PutMapping("/{playerId}")
	 public ResponseEntity<PlayerResponseDTO> updatePlayer(@PathVariable Long playerId,@Valid @RequestBody PlayerRequestDTO requestDTO) {
		 log.info("PUT /api/players/{} called", playerId);
	     PlayerResponseDTO updatedPlayer = playerService.updatePlayer(playerId, requestDTO);
	     return ResponseEntity.ok(updatedPlayer);
	 }
	 @DeleteMapping("/{playerId}")
	 public ResponseEntity<Void> deletePlayer(@PathVariable Long playerId) {
		 log.info("DELETE /api/players/{} called", playerId);
	     playerService.deletePlayer(playerId);
	     return ResponseEntity.noContent().build();  // Returns 204 No Content
	 }	 
	 @GetMapping("/state/{stateName}")
	 public ResponseEntity<List<PlayerResponseDTO>> getPlayersByStateName(
	         @PathVariable String stateName) {
	     log.info("GET /api/players/state/{} called", stateName);
	     List<PlayerResponseDTO> players = playerService.getPlayersByStateName(stateName);
	     return ResponseEntity.ok(players);
	 }
}
