package ru.mvz.corp.persistence.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Projections;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;
import ru.mvz.corp.persistence.dao.AbstractDao;
import ru.mvz.corp.persistence.dao.DocumentDao;
import ru.mvz.corp.persistence.model.Document;
import ru.mvz.corp.util.Convert;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by ...
 */
@Repository("documentDao")
public class DocumentDaoImpl extends AbstractDao<Long, Document> implements DocumentDao {

    private static final Logger logger = LogManager.getLogger(DocumentDaoImpl.class);

    @Override
    public Document findById(long id) {
        Document document = getByKey(id);
        return document;
    }

    @Override
    public void remove(Document document) {
        super.delete(document);
    }

    @Override
    public void save(Document document) {
        super.persist(document);
    }

    @Override
    public long findMaxDocNo() {
        Criteria criteria = createEntityCriteria();
        criteria.setProjection(Projections.max("documentNo"));
        return (Integer) criteria.uniqueResult();
    }

    @Override
    public List<Document> findAll() {
        Criteria criteria = createEntityCriteria();
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return (List<Document>)criteria.list();
    }

    @Override
    public List<Document> findByDate(String date) {
        Date d = Convert.stringToDate(date);
        if (d == null) return new ArrayList<>();
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.between("date", d, d));
        criteria.addOrder(Order.desc("documentNo"));
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.list();
    }

    @Override
    public List<Document> findByProduct(long product, long documentType) {
        Criteria criteria = createEntityCriteria();
        criteria.createAlias("product", "product");
        criteria.add(Restrictions.eq("product.id", product));
        if (documentType != 0) {
            criteria.createAlias("documentType", "documentType");
            criteria.add(Restrictions.eq("documentType.id", documentType));
        }
        criteria.addOrder(Order.desc("documentNo"));
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.list();
    }

    @Override
    public List<Document> findByBrigade(long brigade, long documentType) {
        Criteria criteria = createEntityCriteria();
        criteria.createAlias("brigade", "brigade");
        if (documentType != 0) {
            criteria.createAlias("documentType", "documentType");
            criteria.add(Restrictions.eq("documentType.id", documentType));
        }
        criteria.add(Restrictions.eq("brigade.id", brigade));
        criteria.addOrder(Order.desc("documentNo"));
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.list();

    }

    @Override
    public List<Document> findByBrigadeOffset(long brigade, long documentType, int offset, int maxResults) {
        Criteria criteria = createEntityCriteria();
        criteria.createAlias("brigade", "brigade");
        criteria.add(Restrictions.eq("brigade.id", brigade));
        if (documentType != 0) {
            criteria.createAlias("documentType", "documentType");
            criteria.add(Restrictions.eq("documentType.id", documentType));
        }
        criteria.addOrder(Order.desc("documentNo"));
        criteria.setFirstResult(offset)
                .setMaxResults(maxResults);
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.list();
    }

    @Override
    public List<Document> findByProductOffset(long product, long documentType, int offset, int maxResults) {
        Criteria criteria = createEntityCriteria();
        criteria.createAlias("product", "product");
        criteria.add(Restrictions.eq("product.id", product));
        if (documentType != 0) {
            criteria.createAlias("documentType", "documentType");
            criteria.add(Restrictions.eq("documentType.id", documentType));
        }
        criteria.addOrder(Order.desc("documentNo"));
        criteria.setFirstResult(offset)
                .setMaxResults(maxResults);
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.list();
    }

    //------------------------------------------------------------------------------------------
    @Override
    public List<Document> findByProductAndBrigadeOffset(long product, int productUnite, long brigade, int brigadeUnite, long documentType, int offset, int maxResults, String sortValue, String sortDirection, String onDate) {
        Criteria criteria = createEntityCriteria();
        if( productUnite != 0) {
            if (product != 0) {
                criteria.createAlias("product", "product");
                criteria.add(Restrictions.eq("product.id", product));
            }
        }  
        else {
            if (product != 0) {
                criteria.createAlias("product", "product");
                criteria.add( 
                    Restrictions.or(
                        Restrictions.eq("product.unite_id", (int)product), 
                        Restrictions.eq("product.id", product)));
            }
        }

        if( brigadeUnite != 0) {
            if (brigade != 0) {
                criteria.createAlias("brigade", "brigade");
                criteria.add(Restrictions.eq("brigade.id", brigade));
            }
        }  
        else {
            if (brigade != 0) {
                criteria.createAlias("brigade", "brigade");
                criteria.add( 
                    Restrictions.or(
                        Restrictions.eq("brigade.unite_id", (int)brigade), 
                        Restrictions.eq("brigade.id", brigade)));
            }
        }

        if (documentType != 0) {
            criteria.createAlias("documentType", "documentType");
            criteria.add(Restrictions.eq("documentType.id", documentType));
        }
        if(null!=sortValue && null!=sortDirection) {
            if(sortValue.equals("NUM")) {
                if(sortDirection.equals("desc"))
                    criteria.addOrder(Order.desc("documentNo"));
                if(sortDirection.equals("asc"))     
                    criteria.addOrder(Order.asc("documentNo"));
            }
            if(sortValue.equals("DATE")) {
                if(sortDirection.equals("desc"))
                    criteria.addOrder(Order.desc("date"));
                if(sortDirection.equals("asc"))     
                    criteria.addOrder(Order.asc("date"));
            }
        }
        if(null!=onDate) {
            Date d = Convert.stringToDate(onDate);
            if (d != null) {
                criteria.add(Restrictions.between("date", d, d));
            }
        }

        criteria.setFirstResult(offset)
                .setMaxResults(maxResults);
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return (List<Document>)criteria.list();
    }

    @Override
    public long countBrigade(long brigade, long documentType) {
        Criteria criteria = createEntityCriteria()
                .createAlias("brigade", "brigade");
        if (documentType != 0) {
            criteria.createAlias("documentType", "documentType");
            criteria.add(Restrictions.eq("documentType.id", documentType));
        }
        criteria.add(Restrictions.eq("brigade.id", brigade));
        criteria.setProjection(Projections.rowCount()).setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return ((Long) criteria.uniqueResult()).intValue();
    }

    @Override
    public long countProduct(long product, long documentType) {
        Criteria criteria = createEntityCriteria()
                .createAlias("product", "product");
        if (documentType != 0) {
            criteria.createAlias("documentType", "documentType");
            criteria.add(Restrictions.eq("documentType.id", documentType));
        }
        criteria.add(Restrictions.eq("product.id", product));
        criteria.setProjection(Projections.rowCount()).setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return ((Long) criteria.uniqueResult()).intValue();
    }

  /*  @Override
    public long countByProductAndBrigade(long product, long brigade, long documentType) {
        Criteria criteria = createEntityCriteria()
                .createAlias("product", "product")
                .createAlias("brigade", "brigade");
        if (documentType != 0) {
            criteria.createAlias("documentType", "documentType");
            criteria.add(Restrictions.eq("documentType.id", documentType));
        }
        criteria.add(Restrictions.eq("product.id", product));
        criteria.add(Restrictions.eq("brigade.id", brigade));
        criteria.setProjection(Projections.rowCount()).setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return ((Long) criteria.uniqueResult()).intValue();
    }*/
    //------------------------------------------------------------------------------------------------------------------
    @Override
    public long countByProductAndBrigade(long product, int productUnite, long brigade, int brigadeUnite, long documentType, String date) {
        Criteria criteria = createEntityCriteria();
        // - здесь правильнее ограничивать большие запросы (если ничего не указано)
        if( productUnite != 0) {
            if (product != 0) {
                criteria.createAlias("product", "product");
                criteria.add(Restrictions.eq("product.id", product));
            }
        }  
        else {
            if (product != 0) {
                criteria.createAlias("product", "product");
                criteria.add( 
                    Restrictions.or(
                        Restrictions.eq("product.unite_id", (int)product), 
                        Restrictions.eq("product.id", product)));
            }
        }

        // - поиск бригад по обобщению
        if( brigadeUnite != 0) {
            if (brigade != 0) {
                criteria.createAlias("brigade", "brigade");
                criteria.add(Restrictions.eq("brigade.id", brigade));
            }
        }  
        else {
            if (brigade != 0) {
                criteria.createAlias("brigade", "brigade");
                criteria.add( 
                    Restrictions.or(
                        Restrictions.eq("brigade.unite_id", (int)brigade), 
                        Restrictions.eq("brigade.id", brigade)));
            }
        }

        if (documentType != 0) {
            criteria.createAlias("documentType", "documentType");
            criteria.add(Restrictions.eq("documentType.id", documentType));
        }
        if(null!=date) {
            Date d = Convert.stringToDate(date);
            if (d != null) {
                criteria.add(Restrictions.between("date", d, d));
            }
        }
        
        criteria.setProjection(Projections.rowCount()).setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return ((Long) criteria.uniqueResult()).intValue();
    }
    //------------------------------------------------------------------------------------------------------------------

    @Override
    public long lastNumByProductAndBrigade(long product, int productUnite, long brigade, int brigadeUnite, int documentType) {
        logger.info("Infio   ------"+product+ "--"+productUnite+"---"+brigade+ "----"+brigadeUnite);
        Criteria criteria = createEntityCriteria();
        // - здесь правильнее ограничивать большие запросы (если ничего не указано)
        if( productUnite != 0) {
            criteria.createAlias("product", "product");
            criteria.add( 
                Restrictions.or(
                    Restrictions.eq("product.unite_id", (int)productUnite), 
                    Restrictions.eq("product.id", (long)productUnite)));
        }  
        else {
            if (product != 0) {
                criteria.createAlias("product", "product");
                criteria.add( 
                    Restrictions.or(
                        Restrictions.eq("product.unite_id", (int)product), 
                        Restrictions.eq("product.id", product)));
            }
        }

        // - поиск бригад по обобщению
        if( brigadeUnite != 0) {
            criteria.createAlias("brigade", "brigade");
            criteria.add( 
                Restrictions.or(
                    Restrictions.eq("brigade.unite_id", (int)brigadeUnite), 
                    Restrictions.eq("brigade.id", (long)brigadeUnite)));
        }  
        else {
            if (brigade != 0) {
                criteria.createAlias("brigade", "brigade");
                criteria.add( 
                    Restrictions.or(
                        Restrictions.eq("brigade.unite_id", (int)brigade), 
                        Restrictions.eq("brigade.id", brigade)));
            }
        }

        if (documentType != 0) {
            criteria.createAlias("documentType", "documentType");
            criteria.add(Restrictions.eq("documentType.id", (long)documentType));
        }

        criteria.setProjection(Projections.rowCount()).setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        criteria.setProjection(Projections.max("documentNo"));
        
        long ret = 0;
        Object rez = criteria.uniqueResult();
        if(null!=rez)
          ret = (Long)rez;
        
        return ret;
    }

    @Override
    public List<Document> findByProductAndBrigade(long product, long brigade, long documentType) {
        Criteria criteria = createEntityCriteria();
        if (product != 0) {
            criteria.createAlias("product", "product");
            criteria.add(Restrictions.eq("product.id", product));
        }
        if (brigade != 0) {
            criteria.createAlias("brigade", "brigade");
            criteria.add(Restrictions.eq("brigade.id", brigade));
        }
        if (documentType != 0) {
            criteria.createAlias("documentType", "documentType");
            criteria.add(Restrictions.eq("documentType.id", documentType));
        }

       // criteria.addOrder(Order.desc("documentNo"));
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return (List<Document>)criteria.list();
    }

    @Override
    public List<Document> findByProductAndDate(long product, String date) {
        Date d = Convert.stringToDate(date);
        if (d == null) return new ArrayList<>();
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.between("date", d, d));
        criteria.createAlias("product", "product");
        criteria.add(Restrictions.eq("product.id", product));
        criteria.addOrder(Order.desc("documentNo"));
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.list();
    }

    @Override
    public List<Document> findByBrigadeAndDate(long department, String date) {
        Date d = Convert.stringToDate(date);
        if (d == null) return new ArrayList<>();
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.between("date", d, d));
        criteria.createAlias("brigade", "brigade");
        criteria.add(Restrictions.eq("brigade.id", department));
        criteria.addOrder(Order.desc("documentNo"));
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.list();
    }

    @Override
    public List<Document> findByProductAndBrigadeAndDate(long product, long brigade, String date) {
        Date d = Convert.stringToDate(date);
        if (d == null) return new ArrayList<>();
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.between("date", d, d));
        criteria.createAlias("brigade", "brigade");
        criteria.createAlias("product", "product");
        criteria.add(Restrictions.eq("brigade.id", brigade));
        criteria.add(Restrictions.eq("product.id", product));
        criteria.addOrder(Order.desc("documentNo"));
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.list();
    }

    @Override
    public List<Document> findByProductBetweenDates(long product, String startDate, String endDate) {
        Date d1 = Convert.stringToDate(startDate);
        Date d2 = Convert.stringToDate(endDate);
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.between("date", d1, d2));
        criteria.createAlias("product", "product");
        criteria.add(Restrictions.eq("product.id", product));
        criteria.addOrder(Order.asc("date"));
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.list();
    }

    @Override
    public List<Document> findAllBetweenDates(String startDate, String endDate) {
        Date d1 = Convert.stringToDate(startDate);
        Date d2 = Convert.stringToDate(endDate);
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.between("date", d1, d2));
        criteria.addOrder(Order.asc("date"));
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.list();
    }

    @Override
    public List<Document> findDocumentsOrderDepartmentsBetweenDates(long product, long department, String startDate, String endDate) {
        Date d1 = Convert.stringToDate(startDate);
        Date d2 = Convert.stringToDate(endDate);
        Criteria criteria = createEntityCriteria();
        criteria.add(Restrictions.between("date", d1, d2));
        criteria.createAlias("product", "product");
        criteria.add(Restrictions.eq("product.id", product));
        criteria.createAlias("brigade", "brigade");
        criteria.createAlias("brigade.department", "department");
        criteria.add(Restrictions.eq("department.id", department));
        criteria.addOrder(Order.asc("date"));
        criteria.setResultTransformer(CriteriaSpecification.DISTINCT_ROOT_ENTITY);
        return criteria.list();
    }
}
