package dev.farhan.movieist.movies.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "seats")
@Data
@NoArgsConstructor
public class Seat {
    private ObjectId id;
    private String seatName;
    private LocalDateTime created;
    private LocalDateTime updated;
    private String style;
    private Double price;
    private String status;

    public Seat(String seatName, LocalDateTime created, LocalDateTime updated, String style, Double price, String status) {
        this.seatName = seatName;
        this.created = created;
        this.updated = updated;
        this.style = style;
        this.price = price;
        this.status = status;
    }
}
