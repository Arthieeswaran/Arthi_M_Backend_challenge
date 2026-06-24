package com.hexaware.cricket.service;
import com.hexaware.cricket.dto.PlayerRequestDTO;
import com.hexaware.cricket.dto.PlayerResponseDTO;
import com.hexaware.cricket.entity.Player;
import com.hexaware.cricket.exception.PlayerNotFoundException;
import com.hexaware.cricket.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
@Slf4j

public class PlayerServiceImpl implements PlayerService {
	private final PlayerRepository playerRepository;
	@Override
	public List<PlayerResponseDTO> getAllPlayers(){
		log.info("Fetching all players");
		List<Player> players=playerRepository.findAll();
		return players.stream().map(this::mapToResponseDTO).collect(Collectors.toList());
	}
	@Override
	public PlayerResponseDTO getPlayerById(Long playerId) {
		log.info("Fetching player with ID: {}",playerId);
		Player player=playerRepository.findById(playerId).orElseThrow(()-> new PlayerNotFoundException(playerId));
		return mapToResponseDTO(player);
	}
	@Override
	public PlayerResponseDTO createPlayer(PlayerRequestDTO requestDTO) {
		log.info("Creating new player: {}",requestDTO.getPlayerName());
		Player player=mapToEntity(requestDTO);
		Player savedPlayer=playerRepository.save(player);
		log.info("Player created successfully with ID: {}", savedPlayer.getPlayeId());
        return mapToResponseDTO(savedPlayer);
	}
	@Override
	public List<PlayerResponseDTO> getPlayersByStateName(String stateName) {
	    log.info("Fetching players by state: {}", stateName);
	    List<Player> players = playerRepository.findByStateName(stateName);
	    if (players.isEmpty()) {
	        throw new PlayerNotFoundException("No players found for state: " + stateName);
	    }
	    return players.stream()
	            .map(this::mapToResponseDTO)
	            .collect(Collectors.toList());
	}
	@Override
    public PlayerResponseDTO updatePlayer(Long playerId, PlayerRequestDTO requestDTO) {
        log.info("Updating player with ID: {}", playerId);
        Player existingPlayer = playerRepository.findById(playerId)
                .orElseThrow(() -> new PlayerNotFoundException(playerId));
        existingPlayer.setPlayerName(requestDTO.getPlayerName());
        existingPlayer.setJerseyNumber(requestDTO.getJerseyNumber());
        existingPlayer.setRole(requestDTO.getRole());
        existingPlayer.setTotalMatches(requestDTO.getTotalMatches());
        existingPlayer.setTeamName(requestDTO.getTeamName());
        existingPlayer.setStateName(requestDTO.getStateName());
        existingPlayer.setDescription(requestDTO.getDescription());
        Player updatedPlayer = playerRepository.save(existingPlayer);
        log.info("Player updated successfully with ID: {}", updatedPlayer.getPlayeId());
        return mapToResponseDTO(updatedPlayer);
    }
	@Override
	public void deletePlayer(Long playerId) {
		log.info("Deleting player with ID:{}",playerId);
		Player player=playerRepository.findById(playerId).orElseThrow(()-> new PlayerNotFoundException(playerId));
		playerRepository.delete(player);
		log.info("Player deleted successfully with ID: {}",playerId);
	}
	private PlayerResponseDTO mapToResponseDTO(Player player) {
        return PlayerResponseDTO.builder()
                .playerId(player.getPlayeId())
                .playerName(player.getPlayerName())
                .jerseyNumber(player.getJerseyNumber())
                .role(player.getRole())
                .totalMatches(player.getTotalMatches())
                .teamName(player.getTeamName())
                .stateName(player.getStateName())
                .description(player.getDescription())
                .build();
    }
	private Player mapToEntity(PlayerRequestDTO dto) {
        return Player.builder()
                .playerName(dto.getPlayerName())
                .jerseyNumber(dto.getJerseyNumber())
                .role(dto.getRole())
                .totalMatches(dto.getTotalMatches() != null ? dto.getTotalMatches() : 0)
                .teamName(dto.getTeamName())
                .stateName(dto.getStateName())
                .description(dto.getDescription())
                .build();
    }

}
