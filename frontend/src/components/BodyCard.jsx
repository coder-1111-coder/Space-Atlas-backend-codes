import { Link } from 'react-router-dom';
import './BodyCard.css';

function BodyCard({ body }) {
    const formatDate = (date) => {
        if (!date) return 'Unknown';
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getTypeColor = (type) => {
        const colors = {
            'Planet': 'badge-planet',
            'Moon': 'badge-moon',
            'Asteroid': 'badge-asteroid',
            'Comet': 'badge-comet',
            'Dwarf Planet': 'badge-dwarf',
            'Other': 'badge-other'
        };
        return colors[type] || 'badge-other';
    };

    // Function to get fallback image based on celestial body type
    const getFallbackImage = (type) => {
        const fallbacks = {
            'Planet': 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=300&fit=crop',
            'Moon': 'https://images.unsplash.com/photo-1509773896068-7fd415d91e2e?w=400&h=300&fit=crop',
            'Asteroid': 'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=400&h=300&fit=crop',
            'Comet': 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=300&fit=crop',
            'Dwarf Planet': 'https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=300&fit=crop',
            'Other': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=300&fit=crop'
        };
        return fallbacks[type] || fallbacks['Other'];
    };

    const imageUrl = body.imageUrl || getFallbackImage(body.type);

    return (
        <Link to={`/body/${body._id}`} className="body-card">
            <div className="body-card-image" style={{ backgroundImage: `url(${imageUrl})` }}>
                <div className="body-card-image-overlay"></div>
            </div>

            <div className="body-card-content">
                <div className="body-card-header">
                    <h3 className="body-card-title">{body.name}</h3>
                    <span className={`badge ${getTypeColor(body.type)}`}>
                        {body.type}
                    </span>
                </div>

                <p className="body-card-description">
                    {body.description.length > 150
                        ? `${body.description.substring(0, 150)}...`
                        : body.description}
                </p>

                <div className="body-card-footer">
                    <div className="body-card-info">
                        <span className="info-label">Discovered:</span>
                        <span className="info-value">{formatDate(body.discoveryDate)}</span>
                    </div>
                    {body.discoveredBy && (
                        <div className="body-card-info">
                            <span className="info-label">By:</span>
                            <span className="info-value">{body.discoveredBy}</span>
                        </div>
                    )}
                </div>
            </div>

            <div className="body-card-hover-effect"></div>
        </Link>
    );
}

export default BodyCard;
