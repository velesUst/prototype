package ru.mvz.corp.persistence.dao.impl;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.hibernate.Criteria;
import org.hibernate.FetchMode;
import org.hibernate.Hibernate;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;

import org.springframework.stereotype.Repository;
import ru.mvz.corp.persistence.dao.AbstractDao;
import ru.mvz.corp.persistence.dao.UserDao;
import ru.mvz.corp.persistence.model.Role;
import ru.mvz.corp.persistence.model.User;

/**
 * Created by ...
 */
@Repository("userDao")
public class UserDaoImpl extends AbstractDao<Long, User> implements UserDao {

    //Logger logger = LogManager.getRootLogger();

    @Override
    public User findByName(String name) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("login", name).ignoreCase());
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        User user = (User)criteria.setMaxResults(1).uniqueResult();
        if (user != null)
        for (Role role:user.getRoles()) {
           Hibernate.initialize(role.getPrivileges());
        }
        return user;//setMaxResults(1).uniqueResult();
    }

    public User save(User user) {
        return persist(user);
    }


}
