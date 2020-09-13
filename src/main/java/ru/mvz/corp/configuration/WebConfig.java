package ru.mvz.corp.configuration;

import org.springframework.web.context.ContextLoaderListener;
import org.springframework.web.context.WebApplicationContext;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.DispatcherServlet;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.FilterRegistration;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletRegistration;

import javax.servlet.MultipartConfigElement;
import java.io.File;

import org.springframework.context.annotation.Bean;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.context.request.RequestContextListener;

/**
 * Created by ...
 */
public class WebConfig extends AbstractAnnotationConfigDispatcherServletInitializer {

    private String TMP_FOLDER = "/"; 
    private int MAX_UPLOAD_SIZE = 5 * 1024 * 1024; 

    @Override
    public void onStartup(ServletContext servletContext) throws ServletException{
        AnnotationConfigWebApplicationContext rootContext = new AnnotationConfigWebApplicationContext();
        rootContext.register(/*AppConfig.class,*/HibernateConfig.class, SecSecurityConfig.class);
        servletContext.addListener(new ContextLoaderListener(rootContext));


        AnnotationConfigWebApplicationContext servletAppContext = new AnnotationConfigWebApplicationContext();
        servletAppContext.register(MvcConfig.class);

        servletContext.addListener(ContextListener.class);

        DispatcherServlet dispatcherServlet = new DispatcherServlet(servletAppContext);
        dispatcherServlet.setThrowExceptionIfNoHandlerFound(true);


        ServletRegistration.Dynamic dispatcher = servletContext.addServlet("dispatcher",dispatcherServlet);
        dispatcher.setLoadOnStartup(1);
        dispatcher.addMapping("/");
        
        MultipartConfigElement multipartConfigElement = new MultipartConfigElement(TMP_FOLDER, 
            MAX_UPLOAD_SIZE, MAX_UPLOAD_SIZE * 2, MAX_UPLOAD_SIZE / 2);         
        dispatcher.setMultipartConfig(multipartConfigElement);
        
        FilterRegistration.Dynamic encodingFilter = servletContext.addFilter("encoding-filter", new CharacterEncodingFilter());
        encodingFilter.setInitParameter("encoding","UTF-8");
        encodingFilter.setInitParameter("forceEncoding","true");
        encodingFilter.addMappingForUrlPatterns(null,true,"/*");
    }

    @Override
    protected Class<?>[] getRootConfigClasses() {
        return new Class[] {/*AppConfig.class,*/ HibernateConfig.class, SecSecurityConfig.class};
    }

    @Override
    protected Class<?>[] getServletConfigClasses() {
        return null;
    }

    @Override
    protected String[] getServletMappings() {
        return new String[] { "/" };
    }

}
