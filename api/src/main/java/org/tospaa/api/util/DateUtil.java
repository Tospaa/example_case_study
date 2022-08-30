package org.tospaa.api.util;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;
import java.time.temporal.TemporalAccessor;
import java.util.Date;

public class DateUtil {
  private DateUtil() {}

  public static Date parseDateFromISOString(String isoString) {
    TemporalAccessor ta = DateTimeFormatter.ISO_INSTANT.parse(isoString);
    Instant i = Instant.from(ta);
    return Date.from(i);
  }

  public static Date addDaysToDate(Date date, int days) {
    return Date.from(date.toInstant().plus(days, ChronoUnit.DAYS));
  }
}
