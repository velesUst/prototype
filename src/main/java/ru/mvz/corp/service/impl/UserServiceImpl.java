package ru.mvz.corp.service.impl;

import java.util.Arrays;
import java.util.Collection;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mvz.corp.dto.UserDto;
import ru.mvz.corp.error.UserAlreadyExistException;
import ru.mvz.corp.persistence.dao.RoleDao;
import ru.mvz.corp.persistence.dao.UserDao;
import ru.mvz.corp.persistence.model.User;
import ru.mvz.corp.service.UserService;


/**
 * Created by ...
 */
@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;
    @Autowired
    RoleDao roleDao;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Override
    public User findByName(String name) {
        return userDao.findByName(name);
    }

    @Override
    public List<User> findAll() {
        return userDao.findAll();
    }

    @Override
    public User save(User user) {
        return userDao.save(user);
    }

    @Override
    public void update(User user) {
        userDao.update(user);
    }

    @Override
    public User registerNewUserAccount(UserDto accountDto) throws UserAlreadyExistException {
        if (loginExist(accountDto.getLogin())) {
            throw new UserAlreadyExistException("There is an account with that email adress: " + accountDto.getLogin());
        }
        final User user = new User();

        user.setFirstName(accountDto.getFirstName());
        user.setLastName(accountDto.getLastName());
        user.setPassword(passwordEncoder.encode(accountDto.getPassword()));
        user.setLogin(accountDto.getLogin());
        user.setRoles(Arrays.asList(roleDao.findByName("ROLE_USER")));
        return userDao.save(user);
    }

    private boolean loginExist(final String login) {
        return userDao.findByName(login) != null;
    }
}
