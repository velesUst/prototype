package ru.mvz.corp.persistence.dao;

import ru.mvz.corp.persistence.model.Document;

import java.util.List;

/**
 * Created by ...
 */
public interface DocumentDao {
    Document findById(long id);

    void save(Document document);

    void update(Document document);
    
    void remove(Document document);

    long findMaxDocNo();

    long countBrigade(long brigade, long documentTypeId);
    long countProduct(long product, long documentTypeId);
    
    long lastNumByProductAndBrigade(long product, int productUnite, long brigade, int brigadeUnite, int documentType);
    long countByProductAndBrigade(long product, int productUnite, long brigade, int brigadeUnite, long documentTypeId, String date);

    List<Document> findAll();

    List<Document> findByDate(String date);

    List<Document> findByProduct(long product,long documentType);

    List<Document> findByBrigade(long brigade,long documentType);

    List<Document> findByBrigadeOffset(long brigade,long documentType,int offset, int maxResults);

    List<Document> findByProductOffset(long product,long documentType,int offset, int maxResults);

    List<Document> findByProductAndBrigadeOffset(long product, int productUnite, long brigade,int brigadeUnite,long documentType, int offset, int maxResults, String sortValue, String sortDirection, String onDate);

    List<Document> findByProductAndBrigade(long product, long brigade,long documentType);

    List<Document> findByProductAndDate(long product, String date);

    List<Document> findByBrigadeAndDate(long brigade, String date);

    List<Document> findByProductAndBrigadeAndDate(long product, long brigade, String date);

    List<Document> findByProductBetweenDates(long product, String startDate, String endDate);

    List<Document> findAllBetweenDates(String startDate, String endDate);

    List<Document> findDocumentsOrderDepartmentsBetweenDates(long product, long department, String startDate, String endDate);
}
