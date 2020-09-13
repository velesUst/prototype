package ru.mvz.corp.persistence.dao;

import ru.mvz.corp.persistence.model.Privilege;
import ru.mvz.corp.persistence.model.Role;

/**
 * Created by ...
 */
public interface RoleDao {
    Role findByName(String name);

    void save(Role role);
}
