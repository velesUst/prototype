package ru.mvz.corp.util;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;


public class JsonDateSerializer extends JsonSerializer<Date> {
    SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");

    @Override
    public void serialize(final Date date, final JsonGenerator gen, final SerializerProvider provider) throws IOException {

        String dateString = format.format(date);
        gen.writeString(dateString);
    }

}