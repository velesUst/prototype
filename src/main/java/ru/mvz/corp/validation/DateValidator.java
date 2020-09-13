package ru.mvz.corp.validation;

import java.text.ParseException;
import java.text.SimpleDateFormat;

/**
 * Created by ...
 */
public class DateValidator {
    public boolean isThisDateValid(String dateToValidate){
        if(dateToValidate == null || dateToValidate.equals("")){return false;}
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        sdf.setLenient(false);
        try {
           sdf.parse(dateToValidate);
        } catch (ParseException e) {
            return false;
        }
        return true;
    }
}
