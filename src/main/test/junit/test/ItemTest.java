package junit.test;

import static org.junit.Assert.*;

import mavha.test.controller.ItemController;
import mavha.test.model.Item;
import org.junit.Test;

import junit.service.DataBuilder;

public class ItemTest {

	ItemController service = new ItemController();

	@Test
	public void addItem() {

		Item item = DataBuilder.createItem();

	}

	@Test
	public void removeItem() {

		Item item = DataBuilder.createItem();

	}

	@Test
	public void listItem() {

		Item item = DataBuilder.createItem();

	}

}
