package edu.swaroop.contact.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import edu.swaroop.contact.entity.Response;
import edu.swaroop.contact.entity.User;
import edu.swaroop.contact.service.UserService;

@CrossOrigin(origins = "*")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping(value = "/users") // Changed to plural
    protected ResponseEntity<Response<User>> addUser(@RequestBody User user) {
        User addedUser = userService.addUser(user);
        Response<User> response = new Response<>();
        response.setMessage("User Added");
        response.setHttpStatusCode(HttpStatus.CREATED.value());
        response.setData(addedUser);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }

    @DeleteMapping(value = "/users/{id}") // Changed to plural
    protected ResponseEntity<Response<User>> deleteUser(@PathVariable int id) {
        User deletedUser = userService.deleteUser(id);
        Response<User> response = new Response<>();
        if (deletedUser != null) {
            response.setMessage("User Deleted");
            response.setHttpStatusCode(HttpStatus.OK.value());
            response.setData(deletedUser);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setMessage("User Not Found");
            response.setHttpStatusCode(HttpStatus.NOT_FOUND.value());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping(value = "/users/{id}") // Changed to plural
    protected ResponseEntity<Response<User>> findUserById(@PathVariable int id) {
        User user = userService.findUserById(id);
        Response<User> response = new Response<>();
        if (user != null) {
            response.setMessage("User Found");
            response.setHttpStatusCode(HttpStatus.OK.value());
            response.setData(user);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            response.setMessage("User Not Found");
            response.setHttpStatusCode(HttpStatus.NOT_FOUND.value());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(value = "/users/{id}") // Kept plural for consistency
    protected ResponseEntity<Response<User>> updateUser(@PathVariable int id,@RequestBody User user) {
        user.setId(id);
    	User updatedUser = userService.updateUser(user);
    Response<User> response = new Response<>();
        response.setMessage("User Updated"); // Updated the message for clarity
        response.setHttpStatusCode(HttpStatus.OK.value()); // Changed to 200 OK
        response.setData(updatedUser);
        return new ResponseEntity<>(response, HttpStatus.OK); // Changed to 200 OK
    }
    
    @GetMapping(value = "/users")
    protected ResponseEntity<Response<List<User>>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        Response<List<User>> response = new Response<>();
        response.setMessage("Users Found");
        response.setHttpStatusCode(HttpStatus.OK.value());
        response.setData(users);
        return new ResponseEntity<Response<List<User>>>(response, HttpStatus.OK);
    }
}
