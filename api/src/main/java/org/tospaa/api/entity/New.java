package org.tospaa.api.entity;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.*;

@Data
@Entity
@Table(name = "news")
@Getter
@Setter
@NoArgsConstructor
@ToString
public class New implements Serializable {
  private static final long serialVersionUID = 6518279251617083914L;
  @Id
  private String id;
  private String title;
  private String summary;
  private String link;
  private Date published;
  private Date inserted;
  private String img_url;
  private String ticker;
}
