package edu.swaroop.contact.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.swaroop.contact.entity.User;
import edu.swaroop.contact.repository.UserRepository;


@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository;

	public User addUser(User user) {
		return userRepository.save(user);
	}
	
	public User deleteUser(int id) {
		User user = userRepository.findById(id).get();
		userRepository.deleteById(id); 
		return user;
	}

	public User findUserById(int id) {
		Optional<User> user = userRepository.findById(id);
		if(user.isPresent()) {
		return user.get();
		}else {
		return null;
		}
	}

	public User updateUser(User user) {
	    // Find the existing user by ID
	    User existingUser = userRepository.findById(user.getId())
	            .orElseThrow(() -> new RuntimeException("User not found"));

	    // Update the fields of the existing user with the new values
	    existingUser.setName(user.getName());
	    existingUser.setEmail(user.getEmail());
	    existingUser.setMobile(user.getMobile());
	    existingUser.setPhoto(user.getPhoto());
	    existingUser.setTitle(user.getTitle());
//	    existingUser.setGroup(user.getGroup());
	    // Add other fields you want to update

	    // Save the updated user
	    return userRepository.save(existingUser);
	}


	public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
