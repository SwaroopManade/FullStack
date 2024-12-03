import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteContact = () => {
  const { id } = useParams(); // Get contact ID from the URL
  const navigate = useNavigate(); // For redirecting after deletion
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the contact details when the component mounts
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`http://localhost:8080/user/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch contact. Please try again later.");
        }
        const data = await response.json();
        setContact(data.data); // Adjusting to match the response structure
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  // Handle delete action
  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:8080/user/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error("Failed to delete contact. Please try again.");
      }
      alert("Contact deleted successfully!");
      navigate('/contacts/list'); // Redirect to contacts list after deletion
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '80vh' }}>
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ); // Show a loading spinner while fetching data
  }

  if (error) {
    return (
      <div className="alert alert-danger text-center" role="alert">
        {error}
      </div>
    );
  }

  return (
    <section>
      <div className="container p-3">
        <div className="row">
          <div className="col">
            <p className="h3 text-danger fw-bold">Delete Contact</p>
            <p>Are you sure you want to delete the following contact?</p>
            <div className="mb-2">
              <img
                src={contact.photo || 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'}
                alt={contact.name}
                className="contact-img"
                style={{ width: '100px', height: '100px', objectFit: 'cover' }}
              />
            </div>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Mobile:</strong> {contact.mobile}</p>
            <p><strong>Email:</strong> {contact.email}</p>

            <button className="btn btn-danger" onClick={handleDelete}>
              Delete
            </button>
            <button className="btn btn-secondary ms-2" onClick={() => navigate('/contacts/list')}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteContact;
