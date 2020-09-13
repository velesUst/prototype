package ru.mvz.corp.service;

import ru.mvz.corp.persistence.model.Customer;

import java.util.Collection;

/**
 * Created by ...
 */
public interface CustomerService {
    Collection<Customer> findAll();

    Customer findById(long id);

    Customer save(Customer customer);

    Customer findByName(String name);
}
