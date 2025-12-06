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

    return (
        <Link to={`/body/${body.slug || body._id}`} className="body-card">
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

            <div className="body-card-hover-effect"></div>
        </Link>
    );
}

export default BodyCard;
