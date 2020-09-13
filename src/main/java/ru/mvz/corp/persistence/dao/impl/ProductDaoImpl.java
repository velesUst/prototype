package ru.mvz.corp.persistence.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Order;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.mvz.corp.persistence.dao.AbstractDao;
import ru.mvz.corp.persistence.dao.ProductDao;
import ru.mvz.corp.persistence.model.Product;

import java.util.List;

/**
 * Created by ...
 */
@Repository
public class ProductDaoImpl extends AbstractDao<Long, Product> implements ProductDao {
    @Override
    public List<Product> getAll() {
        Criteria criteria = createEntityCriteria();
        criteria.addOrder(Order.asc("name"));
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return (List<Product>)criteria.list();
    }

    @Override
    public Product findById(long id) {
        return getByKey(id);
    }

    @Override
    public void save(Product product) {
        super.persist(product);
    }

    @Override
    public void remove(Product product) {
        super.delete(product);
    }

}
