package ru.mvz.corp.configuration;

import java.io.IOException;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.context.request.RequestContextListener;


@EnableWebMvc
@Configuration
public class MvcConfig extends WebMvcConfigurerAdapter {

    public MvcConfig() {
        super();
    }

    // API
    @Override
    public void addViewControllers(final ViewControllerRegistry registry) {
        super.addViewControllers(registry);

        registry.addViewController("/anonymous.html");

        registry.addViewController("/login.html");
        registry.addViewController("/homepage.html");
        registry.addViewController("/admin/adminpage.html");
        registry.addViewController("/accessDenied");
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/static/**").addResourceLocations("/WEB-INF/view/react/build/static/");

        registry.addResourceHandler("/*.js").addResourceLocations("/WEB-INF/view/react/build/");
        registry.addResourceHandler("/*.json").addResourceLocations("/WEB-INF/view/react/build/");
        registry.addResourceHandler("/*.ico").addResourceLocations("/WEB-INF/view/react/build/");
        registry.addResourceHandler("/index.html").addResourceLocations("/WEB-INF/view/react/build/index.html");
    }

    @Bean
    public ViewResolver viewResolver() {
        final InternalResourceViewResolver bean = new InternalResourceViewResolver();

        bean.setViewClass(JstlView.class);
        bean.setPrefix("/WEB-INF/view/");
        bean.setSuffix(".jsp");

        return bean;
    }


 /*   @Bean @Qualifier("productReport")
    public JasperReportsPdfView jasperProductReportsView() {
        JasperReportsPdfView orderPDFView = new JasperReportsPdfView();
        orderPDFView.setUrl("/WEB-INF/jasper/productReport.jrxml");
        orderPDFView.setReportDataKey("datasource");
        return orderPDFView;
    }

    @Bean @Qualifier("monthReport")
    public JasperReportsPdfView jasperMonthReportsView() {
        JasperReportsPdfView orderPDFView = new JasperReportsPdfView();
        orderPDFView.setUrl("/WEB-INF/jasper/monthReport.jrxml");
        orderPDFView.setReportDataKey("datasource");
        return orderPDFView;
    }

    @Bean @Qualifier("chartReport")
    public JasperReportsPdfView jasperChartReportsView() {
        JasperReportsPdfView orderPDFView = new JasperReportsPdfView();
        orderPDFView.setUrl("/WEB-INF/jasper/chartReport.jrxml");
        orderPDFView.setReportDataKey("datasource");
        return orderPDFView;
    }
*/
    @Bean(name = "multipartResolver")
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver();
        multipartResolver.setMaxUploadSize(5242880);
        return multipartResolver;
    }
    
   /* @Bean 
    public RequestContextListener requestContextListener(){
        return new RequestContextListener();
    }*/ 
}