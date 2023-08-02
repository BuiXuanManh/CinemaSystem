package dev.farhan.movieist.movies.model;


import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.annotation.processing.Generated;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Document(collection = "seats")
@Data
@NoArgsConstructor
public class Seat {
    @Id
    private ObjectId id;
    private String seatName;
    private LocalDateTime created;
    private LocalDateTime updated;
    private String style;
    private Double price;
    private String status;
    private String moviesId;
    public Seat(String seatName, LocalDateTime created, LocalDateTime updated, String style, Double price, String status) {
        this.seatName = seatName;
        this.created = created;
        if(created==null)
            this.created= LocalDateTime.now();
        this.updated = updated;
        if(updated==null)
            this.updated = LocalDateTime.now();
        this.style = style;
        this.price = price;
        this.status = status;
    }
}
