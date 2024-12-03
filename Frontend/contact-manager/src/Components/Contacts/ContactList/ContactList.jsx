import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  // Fetch contacts from the server
  useEffect(() => {
    axios.get('http://localhost:8080/users')
      .then((response) => {
        setContacts(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      });
  }, []);

  // Handle contact deletion
  const handleDelete = (id) => {
    axios.delete(`http://localhost:8080/users/${id}`)
      .then(() => {
        alert('User deleted successfully!');
        setContacts(contacts.filter(contact => contact.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting contact:', error);
      });
  };

  // Filter contacts based on search query
  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(query.toLowerCase())
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <section className="contact-search py-4 bg-light">
        <div className="container">
          <div className="row justify-content-between align-items-center mb-3">
            <div className="col">
              <h3 className="text-primary fw-bold">
                Contact Manager
                <Link to={'/contacts/add'} className="btn btn-primary ms-3">
                  <i className="fa fa-plus-circle me-1" />
                  Add
                </Link>
              </h3>
              <p className="fst-italic text-muted">
                Manage your contacts easily with this contact manager application.
              </p>
            </div>
            <div className="col-md-6">
              <form>
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="Search Name"
                    onChange={(e) => setQuery(e.target.value)}
                    className="form-control"
                  />
                  <span className="input-group-text">
                    <i className="fa fa-search"></i>
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="contact-list py-4">
        <div className="container">
          <div className="row">
            {/* Show filtered contacts */}
            {filteredContacts.map((contact) => (
              <div className="col-md-6 col-lg-4 mb-4" key={contact.id}>
                <div className="card shadow-sm border-0">
                  <div className="card-body text-center">
                    <img
                      src={contact.photo || 'https://via.placeholder.com/100'}
                      alt={contact.name}
                      className="rounded-circle mb-3"
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                    <h5 className="card-title mb-0">{contact.name}</h5>
                    <p className="text-muted mb-2">{contact.mobile}</p>
                    <p className="text-muted">{contact.email}</p>
                    <div className="d-flex justify-content-center gap-2">
                      <Link to={`/contacts/view/${contact.id}`} className="btn btn-outline-primary btn-sm">
                        <i className="fa fa-eye"></i> View
                      </Link>
                      <Link to={`/contacts/edit/${contact.id}`} className="btn btn-outline-info btn-sm">
                        <i className="fa fa-pen"></i> Edit
                      </Link>
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDelete(contact.id)}
                      >
                        <i className="fa fa-trash"></i> Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Display message if no contacts are found */}
          {filteredContacts.length === 0 && (
            <div className="text-center py-5">
              <p className="h5 text-muted">No contacts found!</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ContactList;
