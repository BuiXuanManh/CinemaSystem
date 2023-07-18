package dev.farhan.movieist.movies.model;

import lombok.Data;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "seats")
@Data
public class Seat {
    private ObjectId id;
    private String body;
    private LocalDateTime created;
    private LocalDateTime updated;
    private String style;
    private Double price;
    private String status;

    public Seat(String body, LocalDateTime created, LocalDateTime updated, String style, Double price, String status) {
        this.body = body;
        this.created = created;
        this.updated = updated;
        this.style = style;
        this.price = price;
        this.status = status;
    }
}
