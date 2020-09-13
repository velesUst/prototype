package ru.mvz.corp.configuration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.config.AutowireCapableBeanFactory;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;
import javax.servlet.annotation.WebListener;
import ru.mvz.corp.service.*;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import java.util.ArrayList;
import java.util.List;


public class ContextListener implements ServletContextListener {

    @Autowired
    CustomerService customerService;

    @Autowired
    DocumentTypeService documentTypeService;

    @Override
    public void contextInitialized(ServletContextEvent event) {
        ServletContext servletContext = event.getServletContext();
        WebApplicationContext context = WebApplicationContextUtils.getWebApplicationContext(servletContext);
        AutowireCapableBeanFactory factory = context.getAutowireCapableBeanFactory();
        factory.autowireBeanProperties(this, AutowireCapableBeanFactory.AUTOWIRE_BY_TYPE, false);

//        servletContext.setAttribute("products",productService.findAll());

        servletContext.setAttribute("customers", customerService.findAll());
//        servletContext.setAttribute("vedomost", vedomostService.findAll());
        servletContext.setAttribute("documentTypes",documentTypeService.findAll());

/*        List<Page> pages = new ArrayList<>();
        pages.add(new Page("/registrationBook", "Книги регистрации"));
        pages.add(new Page("/accountBook", "Книга учета"));
        pages.add(new Page("/brigade", "Бригада"));
        pages.add(new Page("/department", "Отдел"));
        
        servletContext.setAttribute("pages",pages);*/
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {

    }
}
