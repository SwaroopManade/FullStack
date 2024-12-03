package edu.swaroop.contact.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.swaroop.contact.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

}
