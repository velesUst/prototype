package ru.mvz.corp.service;

import ru.mvz.corp.dto.UserDto;
import ru.mvz.corp.persistence.model.User;

import java.util.Collection;
import java.util.List;

/**
 * Created by ...
 */
public interface UserService {

    User findByName(String name);

    List<User> findAll();

    User save(User user);

    void update(User user);

    User registerNewUserAccount(final UserDto accountDto);
}