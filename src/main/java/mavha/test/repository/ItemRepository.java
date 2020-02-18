package mavha.test.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import mavha.test.model.Item;

public interface ItemRepository extends JpaRepository<Item, Integer> {
	

	

}
