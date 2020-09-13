package ru.mvz.corp.persistence.dao.impl;

import org.springframework.stereotype.Repository;
import ru.mvz.corp.persistence.dao.AbstractDao;
import ru.mvz.corp.persistence.dao.DocumentDao;
import ru.mvz.corp.persistence.dao.DocumentTypeDao;
import ru.mvz.corp.persistence.model.Customer;
import ru.mvz.corp.persistence.model.DocumentType;

import java.util.List;

/**
 * Created by ...
 */
@Repository
public class DocumentTypeDaoImpl extends AbstractDao<Long,DocumentType> implements DocumentTypeDao {

    @Override
    public DocumentType findById(long id) {
        return getByKey(id);
    }

    @Override
    public DocumentType save(DocumentType documentType) {
        return null;
    }

}
