package junit.service;


import mavha.test.model.Item;

public class DataBuilder {


	public static Item createItem() {
		
		Item item = new Item();
		
		item.setId(1);
		item.setDescription("task 1");
		item.setImageUrl("http://www.mavha.com/img/logo-dark.png");
		item.setResolved(true);
		
		return item;
	}
}
