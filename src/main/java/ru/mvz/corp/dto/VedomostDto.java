package ru.mvz.corp.dto;

/**
 * Created by ...
 */
public class VedomostDto {
    private long id;
    private long kbstructId;
    private String name;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getKbstructId() {
        return kbstructId;
    }

    public void setKbstructId(long kbstructId) {
        this.kbstructId = kbstructId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
