package ru.mvz.corp.persistence.dao;

import ru.mvz.corp.persistence.model.Privilege;
import ru.mvz.corp.persistence.model.User;

/**
 * Created by ...
 */
public interface PrivilegeDao {
    Privilege findByName(String name);

    void save(Privilege privilege);
}
