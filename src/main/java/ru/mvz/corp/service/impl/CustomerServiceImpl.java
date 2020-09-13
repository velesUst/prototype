package ru.mvz.corp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mvz.corp.persistence.dao.CustomerDao;
import ru.mvz.corp.persistence.model.Customer;
import ru.mvz.corp.service.CustomerService;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import java.util.Collection;

/**
 * Created by ...
 */
@Service("customerService")
@Transactional
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    CustomerDao customerDao;
    //@Autowired
    //ServletContext context;

    @Override
    public Collection<Customer> findAll() {
        return customerDao.findAll();
    }

    @Override
    public Customer findById(long id) {
        return customerDao.findById(id);
    }

    @Override
    public Customer save(Customer customer) {
        customer =customerDao.save(customer);
        //context.setAttribute("customers",customerDao.findAll());
       return customer;
    }

    @Override
    public Customer findByName(String name) {
       return customerDao.findByName(name);
    }
}
