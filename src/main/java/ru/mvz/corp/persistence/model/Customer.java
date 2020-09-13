package ru.mvz.corp.persistence.model;

import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

/**
 * Created by ...
 */
@Entity
public class Customer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;

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
}
