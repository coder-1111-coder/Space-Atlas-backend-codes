import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bodiesAPI } from '../services/api';
import './Detail.css';

function Detail() {
    const { idOrSlug } = useParams();
    const navigate = useNavigate();
    const [body, setBody] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBody();
    }, [idOrSlug]);

    const fetchBody = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await bodiesAPI.getOne(idOrSlug);
            setBody(response.data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (date) => {
        if (!date) return 'Unknown';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="loading-container">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container" style={{ paddingTop: '3rem' }}>
                <div className="alert alert-error">
                    {error}
                </div>
                <button onClick={() => navigate('/')} className="btn btn-primary">
                    Back to Home
                </button>
            </div>
        );
    }

    if (!body) {
        return null;
    }

    return (
        <div className="detail-page">
            <div className="container container-narrow">
                <button onClick={() => navigate('/')} className="btn btn-secondary mb-2">
                    ← Back to Home
                </button>

                <div className="detail-card fade-in">
                    <div className="detail-header">
                        <div>
                            <h1 className="detail-title">{body.name}</h1>
                            <span className={`badge badge-${body.type.toLowerCase().replace(' ', '-')}`}>
                                {body.type}
                            </span>
                        </div>
                    </div>

                    <div className="detail-body">
                        <div className="detail-section">
                            <h3 className="section-title">Description</h3>
                            <p className="detail-description">{body.description}</p>
                        </div>

                        <div className="detail-grid">
                            <div className="detail-info-card">
                                <div className="info-icon">📅</div>
                                <div className="info-content">
                                    <div className="info-label">Discovery Date</div>
                                    <div className="info-value">{formatDate(body.discoveryDate)}</div>
                                </div>
                            </div>

                            <div className="detail-info-card">
                                <div className="info-icon">👤</div>
                                <div className="info-content">
                                    <div className="info-label">Discovered By</div>
                                    <div className="info-value">{body.discoveredBy || 'Unknown'}</div>
                                </div>
                            </div>

                            <div className="detail-info-card">
                                <div className="info-icon">🏷️</div>
                                <div className="info-content">
                                    <div className="info-label">Slug</div>
                                    <div className="info-value">{body.slug}</div>
                                </div>
                            </div>

                            <div className="detail-info-card">
                                <div className="info-icon">🕐</div>
                                <div className="info-content">
                                    <div className="info-label">Last Updated</div>
                                    <div className="info-value">
                                        {new Date(body.updatedAt).toLocaleDateString()}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
