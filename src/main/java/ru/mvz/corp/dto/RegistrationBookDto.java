package ru.mvz.corp.dto;

import java.util.*;
/**
 *    ...
 */
public class RegistrationBookDto {

    private long id = 0;
    private String date;
    private long brigade;
    private long product;
    private long documentNo;
    private long documentType;
    private String note;
    private String customer;
    private long documentLink;
    private long numberPi;
    private String documentGroup;
    private long orgstruct;

    private Integer countPage;
    private long vedomost;
    private String note2;
    
    private String ways;
    private long num2;


    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public long getBrigade() {
        return brigade;
    }

    public void setBrigade(long brigade) {
        this.brigade = brigade;
    }

    public long getProduct() {
        return product;
    }

    public void setProduct(long product) {
        this.product = product;
    }

    public long getDocumentNo() {
        return documentNo;
    }

    public void setDocumentNo(long documentNo) {
        this.documentNo = documentNo;
    }

    public long getDocumentType() {
        return documentType;
    }

    public void setDocumentType(long documentType) {
        this.documentType = documentType;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getCustomer() {
        return customer;
    }

    public void setCustomer(String customer) {
        this.customer = customer;
    }

    public long getDocumentLink() {
        return documentLink;
    }

    public void setDocumentLink(long documentLink) {
        this.documentLink = documentLink;
    }

    public long getId() {

        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getNum2() {
        return num2;
    }

    public void setNum2(long num2) {
        this.num2 = num2;
    }

    public long getNumberPi() {
        return numberPi;
    }

    public void setNumberPi(long numberPi) {
        this.numberPi = numberPi;
    }

    public String getDocumentGroup() {
        return documentGroup;
    }

    public void setDocumentGroup(String documentGroup) {
        this.documentGroup = documentGroup;
    }

    public Integer getCountPage() {
        return countPage;
    }

    public void setCountPage(Integer countPage) {
        this.countPage = countPage;
    }

    public long getVedomost() {
        return vedomost;
    }

    public void setVedomost(long vedomost) {
        this.vedomost = vedomost;
    }

    public String getNote2() {
        return note2;
    }

    public void setNote2(String note2) {
        this.note2 = note2;
    }

    public long getOrgstruct() {
        return orgstruct;
    }

    public void setOrgstruct(long orgstruct) {
        this.orgstruct = orgstruct;
    }   

    public String getWays() {
        return ways;
    }

    public void setWays(String ways) {
        this.ways = ways;
    }

}
