package  ru.mvz.corp.service;

import ru.mvz.corp.persistence.model.Customer;
import  ru.mvz.corp.persistence.model.DocumentType;

import java.util.Collection;

/**
 * Created by ...
 */
public interface DocumentTypeService {
    Collection<DocumentType> findAll();

    DocumentType findById(long id);

    DocumentType save(DocumentType documentType);

}
