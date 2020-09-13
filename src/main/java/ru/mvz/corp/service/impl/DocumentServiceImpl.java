package  ru.mvz.corp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mvz.corp.persistence.dao.DocumentDao;
import ru.mvz.corp.persistence.model.Document;
import ru.mvz.corp.service.DocumentService;
import ru.mvz.corp.validation.DateValidator;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

/**
 * Created by ...
 */
@Service("documentService")
@Transactional
public class DocumentServiceImpl implements DocumentService {

/*    @Autowired
    AppProperty appProperty;*/

    DateValidator dateValidator = new DateValidator();

    @Autowired
    private DocumentDao dao;

    @Override
    public Document findById(long id) {
        return dao.findById(id);
    }

    @Override
    public void save(Document document) {
        dao.save(document);
    }

    @Override
    public void update(Document document) {
        dao.update(document);
    }

    @Override
    public void remove(Document document) {
        dao.remove(document);
    }

    @Override
    public long getNextDocNo() {
        return dao.findMaxDocNo()+1;
    }

    @Override
    public long countBrigade(long brigade, long documentType) {
        return dao.countBrigade(brigade,documentType);
    }

    @Override
    public long countProduct(long product, long documentType) {
        return dao.countProduct(product,documentType);
    }
    
    @Override
    public long lastNumByProductAndBrigade(long product, int productUnite, long brigade, int brigadeUnite, int documentTypeId) {
        return dao.lastNumByProductAndBrigade(product, productUnite, brigade, brigadeUnite, documentTypeId);
    }

    @Override
    public long countByProductAndBrigade(long product, int productUnite, long brigade, int brigadeUnite, long documentTypeId, String date) {
        return dao.countByProductAndBrigade(product, productUnite, brigade, brigadeUnite, documentTypeId, date);
    }

    @Override
    public Collection<Document> findAll() {
        return null;//dao.findAll();
    }

    @Override
    public Collection<Document> findByDate(String date) {
        return dao.findByDate(date);
    }

    @Override
    public Collection<Document> findByProductAndDepartmentAndDocType(long product, long department,long documentType) {
/*        if (product != 0 && department != 0){
          return   dao.findByProductAndBrigade(product,department,documentType);
        }
        if (product == 0 && department != 0){
            return   dao.findByBrigade(department,documentType);
        }
        if (product != 0 && department == 0){
            return   dao.findByProduct(product,documentType);
        }
        if (product == 0 && department == 0){
            return new ArrayList<>();
        }
        return new ArrayList<>();*/
        return   dao.findByProductAndBrigade(product,department,documentType);
    }

    @Override
    public Collection<Document> findByProductAndDepartmentAndDate(long product, long department, String date) {
        if(dateValidator.isThisDateValid(date)){
            if (product != 0 && department != 0){
                return   dao.findByProductAndBrigadeAndDate(product,department,date);
            }
            if (product == 0 && department != 0){
                return   dao.findByBrigadeAndDate(department,date);
            }
            if (product != 0 && department == 0){
                return   dao.findByProductAndDate(product,date);
            }
            if (product == 0 && department == 0){
                return dao.findByDate(date);
            }
        }
        return null;
    }

    @Override
    public Collection<Document> findAllBetweenDates(String startDate, String endDate) {
        return dao.findAllBetweenDates(startDate, endDate);
    }

    @Override
    public Collection<Document> findDocumentsOrderDepartmentsBetweenDates(long product, long department, String startDate, String endDate){
        return dao.findDocumentsOrderDepartmentsBetweenDates(product, department, startDate, endDate);
    }

    @Override
    public List<Document> findByBrigadeOffset(long brigade,long documentType, int offset, int maxResults) {
//        if (maxResults == 0) maxResults = appProperty.getPaginationMax();
//        return dao.findByBrigadeOffset(brigade,documentType,offset,maxResults);
return null;
    }

    @Override
    public List<Document> findByProductOffset(long product, long documentType, int offset, int maxResults) {
//        if (maxResults == 0) maxResults = appProperty.getPaginationMax();
//        return dao.findByProductOffset(product,documentType,offset,maxResults);
return null;
    }

    @Override
    public List<Document> findByProductAndBrigadeOffset(long product, int productUnite, long brigade, int brigadeUnite, long documentType, int offset, int maxResults, String sortValue, String sortDirection, String onDate) {
        return dao.findByProductAndBrigadeOffset(product, productUnite, brigade, brigadeUnite, documentType, offset, maxResults, sortValue, sortDirection, onDate);     
    }

    @Override
    public Collection<Document> findByProductBetweenDates(long product, String startDate, String endDate) {
        if(dateValidator.isThisDateValid(startDate) && dateValidator.isThisDateValid(endDate)){
            if (product != 0){
                return   dao.findByProductBetweenDates(product, startDate, endDate);
            } else {
                return null;
            }
        }
        return null;
    }
}
