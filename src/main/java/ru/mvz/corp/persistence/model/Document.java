package ru.mvz.corp.persistence.model;

import com.fasterxml.jackson.annotation.*;
import javax.persistence.*;
import java.util.Date;
import java.util.*;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import ru.mvz.corp.util.JsonDateSerializer;

/**
 * Created by ...
 */
@JsonAutoDetect
@Entity
public class Document {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @JsonSerialize(using = JsonDateSerializer.class)
    private Date date;
    private long documentNo;
    private String postfix;
    private String note;
    private String note2;
    private long countPage;
    private String documentGroup;
    private long documentLink;
    //Номер ПИ
    private long num2;
    
    @ManyToOne
    private DocumentType documentType;
    @ManyToOne
    private Product product;
    @ManyToOne
    private Customer customer;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "documents_ways", joinColumns = @JoinColumn(name = "document_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "way_id", referencedColumnName = "id"))
    private Collection<Way> ways;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    User user;


    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public long getDocumentNo() {
        return documentNo;
    }

    public void setDocumentNo(long documentNo) {
        this.documentNo = documentNo;
    }

    public String getPostfix() {
        return postfix;
    }

    public void setPostfix(String postfix) {
        this.postfix = postfix;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public String getNote2() {
        return note2;
    }

    public void setNote2(String note2) {
        this.note2 = note2;
    }

    public long getCountPage() {
        return countPage;
    }

    public void setCountPage(long countPage) {
        this.countPage = countPage;
    }

    public String getDocumentGroup() {
        return documentGroup;
    }

    public void setDocumentGroup(String documentGroup) {
        this.documentGroup = documentGroup;
    }

    public long getDocumentLink() {
        return documentLink;
    }

    public void setDocumentLink(long documentLink) {
        this.documentLink = documentLink;
    }

    public long getNum2() {
        return num2;
    }

    public void setNum2(long num2) {
        this.num2 = num2;
    }

    public DocumentType getDocumentType() {
        return documentType;
    }

    public void setDocumentType(DocumentType documentType) {
        this.documentType = documentType;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public Collection<Way> getWays() {
        return ways;
    }

    public void setWays(Collection<Way> ways) {
        this.ways = ways;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Document document = (Document) o;

        if (id != document.id) return false;
        if (documentNo != document.documentNo) return false;
        if (countPage != document.countPage) return false;
        if (documentLink != document.documentLink) return false;
        if (num2 != document.num2) return false;
        if (date != null ? !date.equals(document.date) : document.date != null) return false;
        if (postfix != null ? !postfix.equals(document.postfix) : document.postfix != null) return false;
        if (note != null ? !note.equals(document.note) : document.note != null) return false;
        if (note2 != null ? !note2.equals(document.note2) : document.note2 != null) return false;
        if (documentGroup != null ? !documentGroup.equals(document.documentGroup) : document.documentGroup != null)
            return false;
        if (documentType != null ? !documentType.equals(document.documentType) : document.documentType != null)
            return false;
        if (product != null ? !product.equals(document.product) : document.product != null) return false;
        if (customer != null ? !customer.equals(document.customer) : document.customer != null) return false;
        if (ways != null ? !ways.equals(document.ways) : document.ways != null) return false;
        return user != null ? user.equals(document.user) : document.user == null;
    }

    @Override
    public int hashCode() {
        int result = (int) (id ^ (id >>> 32));
        result = 31 * result + (date != null ? date.hashCode() : 0);
        result = 31 * result + (int) (documentNo ^ (documentNo >>> 32));
        result = 31 * result + (postfix != null ? postfix.hashCode() : 0);
        result = 31 * result + (note != null ? note.hashCode() : 0);
        result = 31 * result + (note2 != null ? note2.hashCode() : 0);
        result = 31 * result + (int) (countPage ^ (countPage >>> 32));
        result = 31 * result + (documentGroup != null ? documentGroup.hashCode() : 0);
        result = 31 * result + (int) (documentLink ^ (documentLink >>> 32));
        result = 31 * result + (int) (num2 ^ (num2 >>> 32));
        result = 31 * result + (documentType != null ? documentType.hashCode() : 0);
        result = 31 * result + (product != null ? product.hashCode() : 0);
        result = 31 * result + (customer != null ? customer.hashCode() : 0);
        result = 31 * result + (ways != null ? ways.hashCode() : 0);
        result = 31 * result + (user != null ? user.hashCode() : 0);
        return result;
    }

    @Override
    public String toString() {
        return "Document{" +
                "id=" + id +
                ", date=" + date +
                ", documentNo=" + documentNo +
                ", postfix='" + postfix + '\'' +
                ", note='" + note + '\'' +
                ", note2='" + note2 + '\'' +
                ", countPage=" + countPage +
                ", documentGroup='" + documentGroup + '\'' +
                ", documentLink=" + documentLink +
                ", num2=" + num2 +
                ", documentType=" + documentType +
                ", product=" + product +
                ", customer=" + customer +
                ", ways=" + ways +
                ", user=" + user +
                '}';
    }
}
