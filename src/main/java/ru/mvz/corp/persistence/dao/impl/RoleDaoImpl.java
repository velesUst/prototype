package ru.mvz.corp.persistence.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import ru.mvz.corp.persistence.dao.AbstractDao;
import ru.mvz.corp.persistence.dao.RoleDao;
import ru.mvz.corp.persistence.model.Customer;
import ru.mvz.corp.persistence.model.Document;
import ru.mvz.corp.persistence.model.Privilege;
import ru.mvz.corp.persistence.model.Role;

/**
 * Created by ...
 */
@Repository
public class RoleDaoImpl extends AbstractDao<Long, Role> implements RoleDao {
    @Override
    public Role findByName(String name) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("name", name).ignoreCase());
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return (Role)criteria.setMaxResults(1).uniqueResult();
    }

    @Override
    public void save(Role role) {
        super.persist(role);
    }
}
