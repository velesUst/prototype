package ru.mvz.corp.service;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import ru.mvz.corp.configuration.HibernateConfig;
import org.junit.jupiter.api.BeforeEach;

import ru.mvz.corp.service.ProductService;
import ru.mvz.corp.service.impl.ProductServiceImpl;
import ru.mvz.corp.persistence.dao.ProductDao;
import ru.mvz.corp.persistence.model.Product;
import ru.mvz.corp.configuration.WebConfig;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse; 
import org.mockito.Mockito;
import org.mockito.Mock;

@ExtendWith(SpringExtension.class)
@ContextHierarchy({
    @ContextConfiguration(classes=HibernateConfig.class),
    @ContextConfiguration(classes=ServicesIntegrationTest.LAUSUtilityServiceTestConfiguration.class)
})
@ComponentScan(basePackages = {"ru.mvz.corp.persistence.dao.ProductDao"})
public class ServicesIntegrationTest {

    @Configuration
    @EnableTransactionManagement
    @ComponentScan(basePackages = {"ru.mvz.corp.service.impl.ProductServiceImpl"})
    static class LAUSUtilityServiceTestConfiguration{
        @Bean
        public ProductService getProductService() {
            return new ProductServiceImpl();
        }
    }

    @Autowired
    ProductService prServ;

    @Mock
    private ProductDao prDao;


    @BeforeEach
    public void setUp() {
   //       Mockito.when(dao.findAll()).thenReturn(null);
    }

    @DisplayName("Test Spring @Autowired Integration")
    @Test
    void testGet() {
        assertFalse( prServ.findAll().size()==0);
    }
    
}
