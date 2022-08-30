package org.tospaa.api.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.tospaa.api.entity.New;
import org.tospaa.api.entity.NewRepository;
import org.tospaa.api.model.TickerOnly;
import org.tospaa.api.util.DateUtil;

import java.util.*;

@RestController
@RequestMapping(path="api/news")
@CrossOrigin(origins = "*")
public class NewsController {
  @Autowired
  private NewRepository newRepository;

  @GetMapping
  @ResponseBody
  public ResponseEntity<Collection<New>> getNews() {
    Collection<New> listNews = newRepository.findAll();
    return new ResponseEntity<>(listNews, HttpStatus.OK);
  }

  @GetMapping(path="/search")
  @ResponseBody
  public ResponseEntity<Collection<New>> searchNews(@RequestParam String q) {
    Collection<New> searchResults = newRepository.fullTextSearch(q);
    return new ResponseEntity<>(searchResults, HttpStatus.OK);
  }

  @GetMapping(path="/ticker")
  @ResponseBody
  public ResponseEntity<Collection<TickerOnly>> getAvailableTickers() {
    Collection<TickerOnly> searchResults = newRepository.findDistinctProjectedByAndTickerNotNull();
    return new ResponseEntity<>(searchResults, HttpStatus.OK);
  }

  @GetMapping(path="/ticker/{name}")
  @ResponseBody
  public ResponseEntity<Collection<New>> findByTicker(@PathVariable String name) {
    Collection<New> searchResults = newRepository.findByTickerIgnoreCase(name);
    return new ResponseEntity<>(searchResults, HttpStatus.OK);
  }

  @GetMapping(path="/date")
  @ResponseBody
  public ResponseEntity<Collection<New>> filterDate(
    @RequestParam(required = false) String exactDate,
    @RequestParam(required = false) String startDate,
    @RequestParam(required = false) String endDate) {
    Date date1 = null;
    Date date2 = null;
    if (exactDate != null) {
      date1 = DateUtil.parseDateFromISOString(exactDate);
      date2 = DateUtil.addDaysToDate(DateUtil.parseDateFromISOString(exactDate), 1);
    } else if (startDate != null && endDate != null) {
      date1 = DateUtil.parseDateFromISOString(startDate);
      date2 = DateUtil.addDaysToDate(DateUtil.parseDateFromISOString(endDate), 1);
    }

    Collection<New> filterResults = newRepository.findByPublishedBetween(date1, date2);

    return new ResponseEntity<>(filterResults, HttpStatus.OK);
  }
}
