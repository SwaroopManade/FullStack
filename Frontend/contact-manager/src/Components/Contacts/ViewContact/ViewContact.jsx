import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const placeholderImage = 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png';

const ViewContact = () => {
  const { id } = useParams(); // Retrieve contact ID from URL parameters
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the contact details using the ID from URL
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`); // Ensure the endpoint is correct
        setContact(response.data.data); // Adjusting based on response structure
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch contact data.'); // Improved error handling
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <p className="text-danger fw-bold">Error: {error}</p>
      </div>
    );
  }

  return (
    <>
      <section className="view-contact-intro py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h3 className="text-warning fw-bold">View Contact</h3>
              <p className="fst-italic">
                Here are the details of the selected contact.
              </p>
            </div>
          </div>
        </div>
      </section>
      {contact && (
        <section className="view-contact-list py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-md-6 my-2 text-center">
                <img
                  src={contact.photo || placeholderImage}
                  className="img-fluid rounded-circle border border-2 border-warning"
                  alt={contact.name}
                  style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                />
              </div>
            </div>

            <div className="row justify-content-center my-2">
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <strong>Name:</strong> <span className="fw-bold">{contact.name}</span>
                  </li>
                  <li className="list-group-item">
                    <strong>Email:</strong> <span className="fw-bold">{contact.email}</span>
                  </li>
                  <li className="list-group-item">
                    <strong>Contact:</strong> <span className="fw-bold">{contact.mobile}</span>
                  </li>
                  <li className="list-group-item">
                    <strong>Company:</strong> <span className="fw-bold">{contact.company}</span>
                  </li>
                  <li className="list-group-item">
                    <strong>Title:</strong> <span className="fw-bold">{contact.title}</span>
                  </li>
                  <li className="list-group-item">
                    <strong>Group:</strong> <span className="fw-bold">{contact.group}</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row d-flex justify-content-center my-2">
              <div className="col-md-6 text-center">
                <Link to={'/contacts/list'} className="btn btn-warning">
                  Back
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ViewContact;
