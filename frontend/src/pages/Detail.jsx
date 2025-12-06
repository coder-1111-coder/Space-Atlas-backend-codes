import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { bodiesAPI } from '../services/api';
import './Detail.css';

function Detail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [body, setBody] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchBody();
    }, [id]);

    const fetchBody = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await bodiesAPI.getOne(id);
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

    const getFallbackImage = (type) => {
        const fallbacks = {
            'Planet': 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=400&fit=crop',
            'Moon': 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=800&h=400&fit=crop',
            'Asteroid': 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=400&fit=crop',
            'Comet': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=400&fit=crop',
            'Dwarf Planet': 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&h=400&fit=crop',
            'Other': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop'
        };
        return fallbacks[type] || fallbacks['Other'];
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

    const imageUrl = body.imageUrl || getFallbackImage(body.type);

    return (
        <div className="detail-page">
            <div className="container container-narrow">
                <button onClick={() => navigate(-1)} className="btn btn-secondary mb-2">
                    ← Back
                </button>

                <div className="detail-card fade-in">
                    <div className="detail-image" style={{ backgroundImage: `url(${imageUrl})` }}>
                        <div className="detail-image-overlay"></div>
                    </div>

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
                                    <div className="info-value">{body.discoveryDate}</div>
                                </div>
                            </div>

                            <div className="detail-info-card">
                                <div className="info-icon">👤</div>
                                <div className="info-content">
                                    <div className="info-label">Discovered By</div>
                                    <div className="info-value">{body.discoveredBy || 'Unknown'}</div>
                                </div>
                            </div>
                        </div>

                        <div className="detail-section" style={{ marginTop: 'var(--spacing-xl)' }}>
                            <h3 className="section-title">💡 Fun Fact</h3>
                            <p className="detail-description" style={{ fontStyle: 'italic', color: 'var(--color-primary-light)' }}>
                                {body.funFact}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Detail;
