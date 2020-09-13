package ru.mvz.corp.persistence.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import ru.mvz.corp.persistence.dao.AbstractDao;
import ru.mvz.corp.persistence.dao.CustomerDao;
import ru.mvz.corp.persistence.model.Customer;

import java.util.Collection;
import java.util.List;

/**
 * Created by ...
 */
@Repository("customerDao")
public class CustomerDaoImpl extends AbstractDao<Long, Customer> implements CustomerDao {
    @Override
    public List<Customer> findAll() {
        Criteria criteria = createEntityCriteria();
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return (List<Customer>)criteria.list();
    }

    @Override
    public Customer findById(long id) {
        return getByKey(id);
    }

    @Override
    public Customer save(Customer customer) {
       return persist(customer);
    }

    @Override
    public Customer findByName(String name) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("name", name).ignoreCase());
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return (Customer)criteria.setMaxResults(1).uniqueResult();
    }
}
