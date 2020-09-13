package ru.mvz.corp.persistence.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import ru.mvz.corp.persistence.dao.AbstractDao;
import ru.mvz.corp.persistence.dao.WayDao;
import ru.mvz.corp.persistence.model.Way;

import java.util.List;

/**
 * Created by ...
 */
@Repository("wayDao")
public class WayDaoImpl extends AbstractDao<Long, Way> implements WayDao {
    @Override
    public List<Way> findAll() {
        Criteria criteria = createEntityCriteria();
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return (List<Way>)criteria.list();
    }

    @Override
    public Way findById(long id) {
       return getByKey(id);
    }

    @Override
    public List<Way> findByName(String name) {
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.eq("name",name).ignoreCase());
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.setMaxResults(1).list();
    }
}
