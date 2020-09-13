package ru.mvz.corp.util;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Convert {

   public static Date stringToDate(String date) {
        DateFormat format = new SimpleDateFormat("yyyy-MM-dd");      
        try {
            return format.parse(date);
        } catch (ParseException e) {
            return null;
        }
    }
}
