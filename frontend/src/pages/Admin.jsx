import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { bodiesAPI, authAPI } from '../services/api';
import './Admin.css';

function Admin() {
    const navigate = useNavigate();
    const [bodies, setBodies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [editingBody, setEditingBody] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        type: 'Planet',
        description: '',
        discoveryDate: '',
        discoveredBy: '',
        imageUrl: '',
        funFact: ''
    });
    const [formErrors, setFormErrors] = useState([]);

    const types = ['Planet', 'Moon', 'Asteroid', 'Dwarf Planet', 'Comet'];

    useEffect(() => {
        if (!authAPI.isAuthenticated()) {
            navigate('/login');
            return;
        }
        fetchBodies();
    }, []);

    const fetchBodies = async () => {
        try {
            setLoading(true);
            const response = await bodiesAPI.getAll({ limit: 100 });
            setBodies(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (body = null) => {
        if (body) {
            setEditingBody(body);
            setFormData({
                name: body.name,
                type: body.type,
                description: body.description,
                discoveryDate: body.discoveryDate || '',
                discoveredBy: body.discoveredBy || '',
                imageUrl: body.imageUrl || '',
                funFact: body.funFact || ''
            });
        } else {
            setEditingBody(null);
            setFormData({
                name: '',
                type: 'Planet',
                description: '',
                discoveryDate: '',
                discoveredBy: '',
                imageUrl: '',
                funFact: ''
            });
        }
        setFormErrors([]);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingBody(null);
        setFormErrors([]);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors([]);
        setError('');

        try {
            const payload = {
                ...formData,
                discoveryDate: formData.discoveryDate || null
            };

            if (editingBody) {
                await bodiesAPI.update(editingBody._id, payload);
                setSuccess('Celestial body updated successfully!');
            } else {
                await bodiesAPI.create(payload);
                setSuccess('Celestial body created successfully!');
            }

            handleCloseModal();
            fetchBodies();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            if (err.errors && err.errors.length > 0) {
                setFormErrors(err.errors);
            } else {
                setError(err.message);
            }
        }
    };

    const handleDelete = async (body) => {
        if (!window.confirm(`Are you sure you want to delete "${body.name}"?`)) {
            return;
        }

        try {
            await bodiesAPI.delete(body._id);
            setSuccess('Celestial body deleted successfully!');
            fetchBodies();
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            setError(err.message);
        }
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-header">
                    <div>
                        <h1 className="admin-title">Admin Dashboard</h1>
                        <p className="admin-subtitle">Manage celestial bodies</p>
                    </div>
                    <button onClick={() => handleOpenModal()} className="btn btn-primary">
                        + Add New Body
                    </button>
                </div>

                {success && (
                    <div className="alert alert-success fade-in">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="alert alert-error fade-in">
                        {error}
                    </div>
                )}

                <div className="admin-table-container">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Type</th>
                                <th>Description</th>
                                <th>Discovery Date</th>
                                <th>Discovered By</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bodies.map(body => (
                                <tr key={body._id}>
                                    <td className="table-name">{body.name}</td>
                                    <td>
                                        <span className={`badge badge-${body.type.toLowerCase().replace(' ', '-')}`}>
                                            {body.type}
                                        </span>
                                    </td>
                                    <td className="table-description">
                                        {body.description.substring(0, 100)}...
                                    </td>
                                    <td>
                                        {body.discoveryDate
                                            ? new Date(body.discoveryDate).toLocaleDateString()
                                            : 'Unknown'}
                                    </td>
                                    <td>{body.discoveredBy || 'Unknown'}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button
                                                onClick={() => handleOpenModal(body)}
                                                className="btn btn-sm btn-secondary"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDelete(body)}
                                                className="btn btn-sm btn-danger"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {bodies.length === 0 && (
                        <div className="empty-state">
                            <p>No celestial bodies found. Create one to get started!</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2 className="modal-title">
                                {editingBody ? 'Edit Celestial Body' : 'Add New Celestial Body'}
                            </h2>
                            <button onClick={handleCloseModal} className="modal-close">
                                ✕
                            </button>
                        </div>

                        {formErrors.length > 0 && (
                            <div className="alert alert-error">
                                <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                                    {formErrors.map((err, idx) => (
                                        <li key={idx}>{err}</li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="modal-form">
                            <div className="form-group">
                                <label htmlFor="name" className="form-label">Name *</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="form-input"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="type" className="form-label">Type *</label>
                                <select
                                    id="type"
                                    name="type"
                                    className="form-select"
                                    value={formData.type}
                                    onChange={handleChange}
                                    required
                                >
                                    {types.map(type => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="description" className="form-label">Description *</label>
                                <textarea
                                    id="description"
                                    name="description"
                                    className="form-textarea"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="discoveryDate" className="form-label">Discovery Date</label>
                                <input
                                    type="date"
                                    id="discoveryDate"
                                    name="discoveryDate"
                                    className="form-input"
                                    value={formData.discoveryDate}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="discoveredBy" className="form-label">Discovered By</label>
                                <input
                                    type="text"
                                    id="discoveredBy"
                                    name="discoveredBy"
                                    className="form-input"
                                    value={formData.discoveredBy}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="imageUrl" className="form-label">Image URL *</label>
                                <input
                                    type="url"
                                    id="imageUrl"
                                    name="imageUrl"
                                    className="form-input"
                                    placeholder="https://example.com/image.jpg"
                                    value={formData.imageUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="funFact" className="form-label">Fun Fact *</label>
                                <textarea
                                    id="funFact"
                                    name="funFact"
                                    className="form-textarea"
                                    placeholder="Enter an interesting fact about this celestial body..."
                                    value={formData.funFact}
                                    onChange={handleChange}
                                    required
                                    rows="3"
                                />
                            </div>

                            <div className="modal-actions">
                                <button type="button" onClick={handleCloseModal} className="btn btn-secondary">
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {editingBody ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Admin;
