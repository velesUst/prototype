package ru.mvz.corp.persistence.dao;

import ru.mvz.corp.persistence.model.User;

import java.util.List;

/**
 * Created by ...
 */
public interface UserDao {

    List<User> findAll();

    User findByName(String name);

    User save(User user);

    void update(User user);

}
