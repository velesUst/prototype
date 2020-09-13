package ru.mvz.corp.service;

import ru.mvz.corp.persistence.model.Way;

import java.util.Collection;
import java.util.List;

/**
 * Created by ....
 */
public interface WayService {
    Collection<Way> findAll();
    Way findById(long id);
    Way findByName(String name);
}
