package ru.mvz.corp.persistence;

import java.util.List;
import java.util.Optional;

//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
//import static org.hamcrest.MatcherAssert.assertThat;
//import static org.hamcrest.Matchers.instanceOf;
//import static org.hamcrest.Matchers.is;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

import ru.mvz.corp.configuration.HibernateConfig;
import ru.mvz.corp.persistence.dao.ProductDao;
import ru.mvz.corp.persistence.model.Product;
import ru.mvz.corp.service.ProductService;
import ru.mvz.corp.configuration.WebConfig;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse; 


@ExtendWith(SpringExtension.class)
@ContextHierarchy({
    @ContextConfiguration(classes=HibernateConfig.class)
})
public class JpaIntegrationTest {

    @Autowired
    private ProductDao productDao;
   
    @Test
    public void givenLocationId_whenFindStores_thenGetStores() {
        //List<Store> stores = storeRepository.findStoreByLocationId(1L);
        List<Product> products = (List<Product>)productDao.getAll();
        assertFalse( products.size()==0);
    }
}
