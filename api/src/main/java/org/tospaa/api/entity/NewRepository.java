package org.tospaa.api.entity;

import java.util.Collection;
import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.tospaa.api.model.TickerOnly;

public interface NewRepository extends JpaRepository<New, String> {
  // useful resource: https://docs.spring.io/spring-data/jpa/docs/current/reference/html/#jpa.query-methods.query-creation
  @Query(value = "SELECT * FROM news WHERE textsearchable_index_col @@ plainto_tsquery(:word)", nativeQuery = true)
  public Collection<New> fullTextSearch(String word);

  public Collection<New> findByTickerIgnoreCase(String ticker);

  public Collection<TickerOnly> findDistinctProjectedByAndTickerNotNull();

  public Collection<New> findByPublished(Date date);
  public Collection<New> findByPublishedBetween(Date startDate, Date endDate);
}
