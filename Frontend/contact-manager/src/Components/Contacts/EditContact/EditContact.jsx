import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const EditContact = () => {
  const { id } = useParams(); // Get contact ID from the URL
  const navigate = useNavigate(); // For redirecting after update
  const [contact, setContact] = useState({
    name: '',
    photo: '',
    mobile: '',
    email: '',
    title: '',
    group: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the contact details when the component mounts
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch contact");
        }
        const data = await response.json();
        setContact(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, [id]);

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(contact),
      });
      if (!response.ok) {
        throw new Error("Failed to update contact");
      }
      navigate('/contacts/list'); // Redirect to contacts list after update
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    ); // Show a loading state while fetching
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <p className="text-danger fw-bold">Error: {error}</p>
      </div>
    ); // Display any error messages
  }

  return (
    <>
      <section className="py-4 bg-light">
        <div className="container">
          <div className="row">
            <div className="col text-center">
              <h3 className="text-success fw-bold">Edit Contact</h3>
              <p className="fst-italic">Update the details of your contact below.</p>
            </div>
          </div>

          <div className="row align-items-center">
            <div className="col-md-6 mb-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="photo"
                    value={contact.photo}
                    onChange={handleChange}
                    placeholder="Photo URL"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="tel"
                    name="mobile"
                    value={contact.mobile}
                    onChange={handleChange}
                    placeholder="Mobile"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className="form-control"
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="text"
                    name="title"
                    value={contact.title}
                    onChange={handleChange}
                    placeholder="Title"
                    className="form-control"
                  />
                </div>

                <div className="mb-3">
                  <select
                    name="group"
                    value={contact.group}
                    onChange={handleChange}
                    className="form-control"
                    required
                  >
                    <option value="">Select Group</option>
                    <option value="Family">Family</option>
                    <option value="Friends">Friends</option>
                    <option value="Work">Work</option>
                  </select>
                </div>

                <div className="mb-2">
                  <input type="submit" value="Update" className="btn btn-warning" />
                  <Link to={'/contacts/list'} className="btn btn-dark ms-2">
                    Cancel
                  </Link>
                </div>
              </form>
            </div>

            <div className="col-md-6 text-center">
              <img
                src={contact.photo || 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'}
                alt={contact.name}
                className="img-fluid rounded-circle border border-2 border-warning mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditContact;
