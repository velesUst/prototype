package ru.mvz.corp.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.mvz.corp.persistence.dao.WayDao;
import ru.mvz.corp.persistence.model.Way;
import ru.mvz.corp.service.WayService;

import java.util.Collection;
import java.util.List;

/**
 * Created by ...
 */
@Service("wayService")
@Transactional
public class WayServiceImpl implements WayService {
    @Autowired
    private WayDao dao;
    @Override
    public Collection<Way> findAll() {
        return dao.findAll();
    }

    @Override
    public Way findById(long id){return dao.findById(id);}

    @Override
    public Way findByName(String name) {
        List<Way> wayList = dao.findByName(name);
        if (wayList.size() > 0){
            return wayList.get(0);
        }
            return null;
    }
}
