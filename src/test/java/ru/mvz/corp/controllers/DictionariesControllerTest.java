package ru.mvz.corp.controllers;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.api.BeforeEach;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse; 
import org.mockito.Mockito;
import org.mockito.Mock;
import org.mockito.InjectMocks;

import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.ContextHierarchy;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.test.web.servlet.MockMvc;

import ru.mvz.corp.configuration.HibernateConfig;
import ru.mvz.corp.controllers.DictionariesController;
import ru.mvz.corp.configuration.WebConfig;
import ru.mvz.corp.configuration.MvcConfig;
import ru.mvz.corp.configuration.ContextListener;


@ExtendWith(SpringExtension.class)
@Transactional
@WebAppConfiguration
@ContextConfiguration(classes = {WebConfig.class, MvcConfig.class, HibernateConfig.class})
public class DictionariesControllerTest {
    
    @InjectMocks
    private DictionariesController dictionariesController;

    private MockMvc mockMvc;

    @BeforeEach
    public void init() {
    // - тут ошибка    mockMvc = MockMvcBuilders.standaloneSetup(this.dictionariesController).build();
    }


    @Test
    void testGetInf() {
       // assertFalse( brServ.findAll().size()==0);
       // assertEquals("test", brServ.getAnyString());
    }
    
}
