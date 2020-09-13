package ru.mvz.corp.persistence.dao;

import ru.mvz.corp.persistence.model.Product;

import java.util.List;

/**
 * Created by ...
 */
public interface ProductDao {
    List<Product> getAll();
    Product findById(long id);
    void save(Product product);

    void update(Product product);
    
    void remove(Product product);
}
