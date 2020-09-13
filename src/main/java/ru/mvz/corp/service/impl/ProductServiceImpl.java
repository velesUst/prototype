package ru.mvz.corp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mvz.corp.persistence.dao.ProductDao;
import ru.mvz.corp.persistence.model.Product;
import ru.mvz.corp.service.ProductService;

import java.util.Collection;
import java.util.List;

/**
 * Created by ...
 */
@Service("productService")
@Transactional
public class ProductServiceImpl implements ProductService{
    @Autowired
    ProductDao productDao;

    @Override
    public Collection<Product> findAll() {
        return productDao.getAll();
    }

    @Override
    public Product findById(long id) {
        return productDao.findById(id);
    }

    @Override
    public void save(Product product) {
        productDao.save(product);
    }

    @Override
    public void update(Product product) {
        productDao.update(product);
    }

    @Override
    public void remove(Product product) {
        productDao.remove(product);
    }

}
