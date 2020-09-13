package ru.mvz.corp.persistence.dao;

import ru.mvz.corp.persistence.model.Customer;
import ru.mvz.corp.persistence.model.DocumentType;

import java.util.Collection;
import java.util.List;

/**
 * Created by ...
 */
public interface DocumentTypeDao {
    List<DocumentType> findAll();

    DocumentType findById(long id);

    DocumentType save(DocumentType documentType);

}
