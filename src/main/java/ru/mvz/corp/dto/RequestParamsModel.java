package ru.mvz.corp.dto;

/**
 * Created by ...
 */
public class RequestParamsModel {

    private String productFilter = "0";
    private String productUniteFilter = "0";
    private String brigadeFilter = "0";
    private String brigadeUniteFilter = "0";
    private String orgstructFilter = "0";     
    private String dateFilter = "";
    private String documentTypeFilter = "0";
    private String sortValue = "0";
    private String sortDirection = "0";
    private String param_1 = "0";
    private String param_2 = "0";
    private String param_3 = "0";
    private String param_4 = "0";
    private String actualMonth = "0";
    private String behindType = "0";
    private String actualTypeDoc = "";
    private String actualDep = "";
    private String actualOrgstruct = "";
    private int offset;
    private int maxResults;


    public String getProductFilter() {
        return productFilter;
    }

    public void setProductFilter(String productFilter) {
        this.productFilter = productFilter;
    }

    public String getProductUniteFilter() {
        return productUniteFilter;
    }

    public void setProductUniteFilter(String productUniteFilter) {
        this.productUniteFilter = productUniteFilter;
    }

    public String getBrigadeFilter() {
        return brigadeFilter;
    }

    public void setBrigadeFilter(String brigadeFilter) {
        this.brigadeFilter = brigadeFilter;
    }

    public String getBrigadeUniteFilter() {
        return brigadeUniteFilter;
    }

    public void setBrigadeUniteFilter(String brigadeUniteFilter) {
        this.brigadeUniteFilter = brigadeUniteFilter;
    }

    public String getOrgstructFilter() {
        return orgstructFilter;
    }

    public void setOrgstructFilter(String orgstructFilter) {
        this.orgstructFilter = orgstructFilter;
    }

    public String getDateFilter() {
        return dateFilter;
    }

    public void setDateFilter(String dateFilter) {
        this.dateFilter = dateFilter;
    }

    public int getOffset() {
        return offset;
    }

    public void setOffset(int offset) {
        this.offset = offset;
    }

    public int getMaxResults() {
        return maxResults;
    }

    public void setMaxResults(int maxResults) {
        this.maxResults = maxResults;
    }

    public String getParam_1() {
        return param_1;
    }

    public void setParam_1(String param_1) {
        this.param_1 = param_1;
    }

    public String getParam_2() {
        return param_2;
    }

    public void setParam_2(String param_2) {
        this.param_2 = param_2;
    }

    public String getParam_3() {
        return param_3;
    }

    public void setParam_3(String param_3) {
        this.param_3 = param_3;
    }

    public String getParam_4() {
        return param_4;
    }

    public void setParam_4(String param_4) {
        this.param_4 = param_4;
    }

    public String getActualMonth() {
        return actualMonth;
    }

    public void setActualMonth(String actualMonth) {
        this.actualMonth = actualMonth;
    }

    public String getBehindType() {
        return behindType;
    }

    public void setBehindType(String behindType) {
        this.behindType = behindType;
    }

    public String getActualTypeDoc() {
        return actualTypeDoc;
    }

    public void setActualTypeDoc(String actualTypeDoc) {
        this.actualTypeDoc = actualTypeDoc;
    }

    public String getActualDep() {
        return actualDep;
    }

    public void setActualDep(String actualDep) {
        this.actualDep = actualDep;
    }

    public String getActualOrgstruct() {
        return actualOrgstruct;
    }

    public void setActualOrgstruct(String actualOrgstruct) {
        this.actualOrgstruct = actualOrgstruct;
    }

    public String getDocumentTypeFilter() {
        return documentTypeFilter;
    }

    public void setDocumentTypeFilter(String documentTypeFilter) {
        this.documentTypeFilter = documentTypeFilter;
    }

    public String getSortValue() {
        return sortValue;
    }

    public void setSortValue(String sortValue) {
        this.sortValue = sortValue;
    }

    public String getSortDirection() {
        return sortDirection;
    }

    public void setSortDirection(String sortDirection) {
        this.sortDirection = sortDirection;
    }

}
