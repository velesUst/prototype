package ru.mvz.corp.persistence.model;

import javax.persistence.*;
import java.util.Collection;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Created by ...
 */
@Entity
public class Way {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String name= "";

    @JsonIgnore
    @ManyToMany(mappedBy = "ways")
    private Collection<Document> documents;

    @Column(name = "name")
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Collection<Document> getDocuments() {
        return documents;
    }

    public void setDocuments(Collection<Document> documents) {
        this.documents = documents;
    }
}
