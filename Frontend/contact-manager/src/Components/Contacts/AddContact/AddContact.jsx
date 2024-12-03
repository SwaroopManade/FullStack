import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddContact = () => {
  const [contact, setContact] = useState({
    name: '',
    photo: '',
    mobile: '',
    email: '',
    title: '',
    group: ''
  });

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  // Handle input change and update state
  const handleInputChange = (e) => {
    setContact({
      ...contact,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic input validation
    if (!contact.name || !contact.mobile || !contact.email) {
      setError(true);
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(contact.email)) {
      setError(true);
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setError(false);
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await axios.post('http://localhost:8080/users', contact);
      if (response.status === 201) {
        setSuccessMessage('Contact added successfully!');
        setTimeout(() => {
          setSuccessMessage(''); // Clear success message after 3 seconds
          navigate('/contacts/list');
        }, 3000);
        // Clear form fields
        setContact({
          name: '',
          photo: '',
          mobile: '',
          email: '',
          title: '',
          group: ''
        });
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      setError(true);
      setErrorMessage('Failed to add contact. Please try again later.');
    }
  };

  return (
    <>
      <section>
        <div className="container p-3">
          <div className="row">
            <div className="col">
              <p className="h3 text-success fw-bold">Create Contact</p>
              <p className="fst-italic">
                Use this form to add a new contact to the list. Make sure to fill in all required fields.
              </p>
            </div>
          </div>

          <div className="row">
            <div className="col-4 mb-4">
              {/* Show error message if validation fails */}
              {error && <p className="text-danger">{errorMessage}</p>}
              {/* Show success message after adding a contact */}
              {successMessage && <p className="text-success">{successMessage}</p>}
              <form onSubmit={handleSubmit}>
                <div className="mb-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-control"
                    value={contact.name}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-2">
                  <input
                    type="text"
                    name="photo"
                    placeholder="Photo URL"
                    className="form-control"
                    value={contact.photo}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-2">
                  <input
                    type="text"
                    name="mobile"
                    placeholder="Mobile"
                    className="form-control"
                    value={contact.mobile}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="form-control"
                    value={contact.email}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-2">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="form-control"
                    value={contact.title}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mb-2">
                  <select
                    name="group"
                    className="form-control"
                    value={contact.group}
                    onChange={handleInputChange}
                  >
                    <option value="">Select Group</option>
                    <option value="Family">Family</option>
                    <option value="Friends">Friends</option>
                    <option value="Work">Work</option>
                  </select>
                </div>

                <div className="mb-2">
                  <input type="submit" value="Create" className="btn btn-success" />
                  <Link to={'/contacts/list'} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AddContact;
