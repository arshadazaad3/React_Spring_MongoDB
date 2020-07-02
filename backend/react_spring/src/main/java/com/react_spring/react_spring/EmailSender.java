package com.react_spring.react_spring;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mongodb.client.MongoCollection;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Properties;
import javax.mail.*;
import javax.mail.internet.*;
import org.bson.Document;

import com.mongodb.client.MongoDatabase;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;

@RestController
public class EmailSender {


    @RequestMapping(value = "/formdetails", method = RequestMethod.POST)
    public boolean saveUser(@RequestParam Map<String, String> requestParams) throws Exception {



        String email = requestParams.get("email");
        String name = requestParams.get("name");
        String subject = requestParams.get("subject");
        String body = requestParams.get("body");

        System.out.println(email + name + subject + body);
        // Creating a Mongo client
        MongoClient mongo = new MongoClient("localhost", 27017);

        // Creating Credentials
        MongoCredential credential;
        credential = MongoCredential.createCredential("sampleUser", "myDb",
                "password".toCharArray());
        System.out.println("Connected to the database successfully");

        // Accessing the database
        MongoDatabase database = mongo.getDatabase("react_spring");
        System.out.println("Credentials ::" + credential);


        MongoCollection<Document> collection = database.getCollection("sampleCollection");
//
        Document document = new Document("name", name)
                .append("email", email)
                .append("subject", subject)
                .append("body", body);

        //Inserting document into the collection
        collection.insertOne(document);


        EmailSender.send("randomtest3299@gmail.com", "8901rshdg", email, subject, body);


        //perform DB operations
        return true;
    }

    public static void send(String from, String password, String to, String sub, String msg) {
        //Get properties object
        Properties props = new Properties();
        props.put("mail.smtp.host", "smtp.gmail.com");
        props.put("mail.smtp.socketFactory.port", "465");
        props.put("mail.smtp.socketFactory.class",
                "javax.net.ssl.SSLSocketFactory");
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.port", "465");
        //get Session
        Session session = Session.getDefaultInstance(props,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication(from, password);
                    }
                });
        //compose message
        try {
            MimeMessage message = new MimeMessage(session);
            message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));
            message.setSubject(sub);
            message.setText(msg);
            //send message
            Transport.send(message);
            System.out.println("Email sent successfully");
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }

    }

}
