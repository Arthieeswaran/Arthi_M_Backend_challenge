package com.hexaware.cricket.repository;
import com.hexaware.cricket.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;
@Repository

public interface PlayerRepository extends JpaRepository<Player,Long> {
	List<Player> findByTeamName(String teamName);
	List<Player> findByRole(String Role);
	boolean existsByJerseyNumber(Integer jerseyNumber);
	Optional<Player> findByJerseyNumber(Integer jerseyNumber);
	
}
