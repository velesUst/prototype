package ru.mvz.corp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mvz.corp.persistence.dao.DocumentTypeDao;
import ru.mvz.corp.persistence.model.DocumentType;
import ru.mvz.corp.service.DocumentTypeService;

import java.util.Collection;

/**
 * Created by ...
 */
@Service
@Transactional
public class DocumentTypeServiceImpl implements DocumentTypeService {
    @Autowired
    DocumentTypeDao documentTypeDao;

    @Override
    public Collection<DocumentType> findAll() {
        return documentTypeDao.findAll();
    }

    @Override
    public DocumentType findById(long id) {
        return documentTypeDao.findById(id);
    }

    @Override
    public DocumentType save(DocumentType documentType) {
        return documentTypeDao.save(documentType);
    }
}
