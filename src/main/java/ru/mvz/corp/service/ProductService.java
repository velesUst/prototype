package ru.mvz.corp.service;

import ru.mvz.corp.persistence.model.Product;

import java.util.Collection;
import java.util.List;

/**
 * Created by ...
 */
public interface ProductService {
    Collection<Product> findAll();
    Product findById(long id);
    void save(Product product);

    void update(Product product);
    
    void remove(Product product);

}
