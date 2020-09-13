package ru.mvz.corp.persistence.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import ru.mvz.corp.persistence.dao.AbstractDao;
import ru.mvz.corp.persistence.dao.PrivilegeDao;
import ru.mvz.corp.persistence.model.Privilege;
import ru.mvz.corp.persistence.model.Role;

/**
 * Created by ...
 */
@Repository
public class PrivilegeDaoImpl extends AbstractDao<Long, Privilege> implements PrivilegeDao{
    @Override
    public Privilege findByName(String name) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("name", name).ignoreCase());
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return (Privilege)criteria.setMaxResults(1).uniqueResult();
    }

    @Override
    public void save(Privilege privilege) {
        persist(privilege);
    }
}
