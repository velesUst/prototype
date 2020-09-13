package  ru.mvz.corp.service;

import  ru.mvz.corp.persistence.model.Document;

import java.util.Collection;
import java.util.List;

/**
 * Created by ...
 */
public interface DocumentService {
    Document findById(long id);

    void save(Document document);

    void update(Document document);
    
    void remove(Document document);

    long getNextDocNo();

    long countBrigade(long brigade, long documentTypeId);
    long countProduct(long product, long documentTypeId);
    long countByProductAndBrigade(long product,int productUnite, long brigade,int brigadeUnite,long documentTypeId, String date);
    long lastNumByProductAndBrigade(long product,int productUnite, long brigade, int brigadeUnite, int documentTypeId);

    Collection<Document> findAll();

    Collection<Document> findByDate(String date);

    Collection<Document> findByProductAndDepartmentAndDocType(long product, long department,long documentType);

    Collection<Document> findByProductAndDepartmentAndDate(long product, long department, String date);

    List<Document> findByBrigadeOffset(long brigade,long documentType, int offset, int maxResults);

    List<Document> findByProductOffset(long product, long documentType, int offset, int maxResults);

    List<Document> findByProductAndBrigadeOffset(long product, int productUnite, long brigade, int brigadeUnite, long documentType, int offset, int maxResults, String sortValue, String sortDirection, String onDate);

    Collection<Document> findByProductBetweenDates(long product, String startDate, String endDate);

    Collection<Document> findAllBetweenDates(String startDate, String endDate);

    Collection<Document> findDocumentsOrderDepartmentsBetweenDates(long product, long department, String startDate, String endDate);
}
