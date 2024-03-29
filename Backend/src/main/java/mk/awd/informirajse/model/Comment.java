package mk.awd.informirajse.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.LocalDate;

@Entity
@Data
@Table(name = "informirajse_comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Id;
    private String commentDescription;
    private LocalDate dateComment;
    @ManyToOne
    @JoinColumn(name = "blog_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private Blog blog;
    @ManyToOne
    @JoinColumn(name = "comment_owner_id")
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JsonBackReference
    private User commentOwner;

    public Comment() {}

    public Comment(String commentDescription, Blog blog, User user){
        this.commentDescription = commentDescription;
        this.blog = blog;
        this.commentOwner = user;
        this.dateComment = LocalDate.now();
    }
}

