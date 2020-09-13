package ru.mvz.corp.persistence.dao;
import java.io.Serializable;

import java.lang.reflect.ParameterizedType;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.criterion.CriteriaSpecification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.sql.DataSource;

/**
 * Created by ...
 */
@Transactional
public abstract class AbstractDao<PK extends Serializable, T> {

    @Autowired
    private DataSource dataSource;

    @Autowired
    @Qualifier("sessionFactory")
    private SessionFactory sessionFactory;

    private final Class<T> persistentClass;

    @SuppressWarnings("unchecked")
    public AbstractDao(){
        this.persistentClass =(Class<T>) ((ParameterizedType) this.getClass().getGenericSuperclass()).getActualTypeArguments()[1];
    }

    protected Session getSession(){
       // return  em.unwrap(org.hibernate.Session.class);
        return sessionFactory.getCurrentSession();
    }

    @SuppressWarnings("unchecked")
    public T getByKey(PK key) {
        return (T) getSession().get(persistentClass, key);
    }

    public T persist(T entity) {
        PK id = (PK) getSession().save(entity);
        T obj = getByKey(id);
        return obj;
    }

    public void update(T entity) {
        getSession().update(entity);
    }

    public List<T> findAll(){
        Criteria criteria = createEntityCriteria().setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return (List<T>)criteria.list();
    }

    public void delete(T entity) {
        getSession().delete(entity);
    }

    protected Criteria createEntityCriteria(){
        return getSession().createCriteria(persistentClass);
    }

}