package ru.mvz.corp.persistence.dao;

import ru.mvz.corp.persistence.model.Way;

import java.util.List;

/**
 * Created by ...
 */
public interface WayDao {
    List<Way> findAll();

    Way findById(long id);

    List<Way> findByName(String name);
}
