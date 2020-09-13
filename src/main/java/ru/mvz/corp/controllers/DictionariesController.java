package ru.mvz.corp.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.SessionAttributes;
import org.springframework.web.bind.annotation.SessionAttribute;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.servlet.ModelAndView;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import ru.mvz.corp.persistence.model.*;
import ru.mvz.corp.service.*;
import ru.mvz.corp.dto.ProductDto;
import ru.mvz.corp.dto.RequestParamsModel;
import ru.mvz.corp.dto.RegistrationBookDto;
import ru.mvz.corp.dto.VedomostDto;
import ru.mvz.corp.util.Convert;
import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Collection;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Date;
import java.util.Map;
import java.util.stream.Collectors;
import java.lang.String;
import java.util.ArrayList;

@RestController
public class DictionariesController {

    private static final Logger logger = LogManager.getLogger(DictionariesController.class);

    @Autowired
    ProductService productService;
    @Autowired
    DocumentTypeService documentTypeService;
    @Autowired
    WayService wayService;


    @RequestMapping(value = {"/userinfo"}, method = RequestMethod.GET)
    public String userinfo(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        String retStr = "---";
        if (principal != null){
            retStr += principal.getName();
        }
        return retStr;
    }

    @RequestMapping(value = {"/ways"}, method = RequestMethod.GET)
    public Collection<Way> ways() {
        return wayService.findAll();
    }


    @RequestMapping(value = {"/documentType"}, method = RequestMethod.GET)
    public Collection<DocumentType> documentType() {
        return ((List)documentTypeService.findAll());
    }

    
    @RequestMapping(value = {"/product"}, method = RequestMethod.GET)
    public Collection<Product> product() {
        return productService.findAll();
    }


    @RequestMapping(value = {"/product/update"}, method = RequestMethod.POST)
    public String productUpdate(@ModelAttribute("productDto") ProductDto pDto) {
        String err = ""; 
        try {
            Product product = productService.findById(pDto.getId());
            if (product != null) {
                product.setName(pDto.getName());
                product.setFname(pDto.getFname());
                productService.update(product);
            }
        } catch(Exception e) { err = e.toString(); }
        return err;
    }
    @RequestMapping(value = {"/product/add"}, method = RequestMethod.POST)
    public String productAdd(@ModelAttribute("productDto") ProductDto pDto, HttpServletRequest request) {
        String err = ""; 
        try {
            Product product = new Product();
            product.setName(pDto.getName());
            product.setFname(pDto.getFname());
            productService.save(product);
        } catch(Exception e) { err = e.toString(); }
        return err;
    }
    
    @RequestMapping(value = {"/product/delete"}, method = RequestMethod.POST)
    public String productDelete(@ModelAttribute("productDto") ProductDto pDto, HttpServletRequest request) {
        String err = "";
        try {
            Product product = productService.findById(pDto.getId());        
            if (product != null) {
                productService.remove(product);
            }
        } catch(Exception e) { err = e.toString(); }    
        return err;
    }     

}

