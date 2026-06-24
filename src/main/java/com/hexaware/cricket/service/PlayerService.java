package com.hexaware.cricket.service;
import com.hexaware.cricket.dto.PlayerRequestDTO;
import com.hexaware.cricket.dto.PlayerResponseDTO;
import java.util.List;

public interface PlayerService {
	List<PlayerResponseDTO> getAllPlayers();
	PlayerResponseDTO getPlayerById(Long playerId);
	PlayerResponseDTO createPlayer(PlayerRequestDTO requestDTO);
	PlayerResponseDTO updatePlayer(Long playerId,PlayerRequestDTO requestDTO);
	void deletePlayer(Long playerId);
	List<PlayerResponseDTO> getPlayersByStateName(String stateName);
}
