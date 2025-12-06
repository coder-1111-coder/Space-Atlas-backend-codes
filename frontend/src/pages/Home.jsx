import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { bodiesAPI } from '../services/api';
import BodyCard from '../components/BodyCard';
import './Home.css';

function Home() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [bodies, setBodies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        search: searchParams.get('search') || '',
        type: searchParams.get('type') || '',
        sort: searchParams.get('sort') || '-createdAt',
        page: parseInt(searchParams.get('page')) || 1,
        limit: 12
    });
    const [pagination, setPagination] = useState(null);

    const types = ['Planet', 'Moon', 'Asteroid', 'Comet', 'Dwarf Planet', 'Other'];

    useEffect(() => {
        fetchBodies();
    }, [filters]);

    const fetchBodies = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await bodiesAPI.getAll(filters);
            setBodies(response.data);
            setPagination(response.pagination);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value, page: 1 };
        setFilters(newFilters);

        // Update URL search params
        const params = new URLSearchParams();
        if (newFilters.search) params.set('search', newFilters.search);
        if (newFilters.type) params.set('type', newFilters.type);
        if (newFilters.sort && newFilters.sort !== '-createdAt') params.set('sort', newFilters.sort);
        if (newFilters.page > 1) params.set('page', newFilters.page.toString());
        setSearchParams(params);
    };

    const handlePageChange = (newPage) => {
        const newFilters = { ...filters, page: newPage };
        setFilters(newFilters);

        // Update URL search params
        const params = new URLSearchParams();
        if (newFilters.search) params.set('search', newFilters.search);
        if (newFilters.type) params.set('type', newFilters.type);
        if (newFilters.sort && newFilters.sort !== '-createdAt') params.set('sort', newFilters.sort);
        if (newFilters.page > 1) params.set('page', newFilters.page.toString());
        setSearchParams(params);

        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title fade-in">
                            Explore the Cosmos
                        </h1>
                        <p className="hero-subtitle fade-in">
                            Discover celestial bodies, planets, moons, and more in our comprehensive space atlas
                        </p>
                    </div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="filters-section">
                <div className="container">
                    <div className="filters-container">
                        <div className="filter-group">
                            <input
                                type="text"
                                placeholder="🔍 Search celestial bodies..."
                                className="form-input search-input"
                                value={filters.search}
                                onChange={(e) => handleFilterChange('search', e.target.value)}
                            />
                        </div>

                        <div className="filter-group">
                            <select
                                className="form-select"
                                value={filters.type}
                                onChange={(e) => handleFilterChange('type', e.target.value)}
                            >
                                <option value="">All Types</option>
                                {types.map(type => (
                                    <option key={type} value={type}>{type}</option>
                                ))}
                            </select>
                        </div>

                        <div className="filter-group">
                            <select
                                className="form-select"
                                value={filters.sort}
                                onChange={(e) => handleFilterChange('sort', e.target.value)}
                            >
                                <option value="-createdAt">Newest First</option>
                                <option value="createdAt">Oldest First</option>
                                <option value="name">Name (A-Z)</option>
                                <option value="-name">Name (Z-A)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bodies Grid */}
            <section className="bodies-section">
                <div className="container">
                    {loading ? (
                        <div className="loading-container">
                            <div className="spinner"></div>
                        </div>
                    ) : error ? (
                        <div className="alert alert-error">
                            {error}
                        </div>
                    ) : bodies.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">🌌</div>
                            <h3>No celestial bodies found</h3>
                            <p>Try adjusting your filters</p>
                        </div>
                    ) : (
                        <>
                            <div className="bodies-grid">
                                {bodies.map(body => (
                                    <BodyCard key={body._id} body={body} />
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination && pagination.pages > 1 && (
                                <div className="pagination">
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                        disabled={pagination.page === 1}
                                    >
                                        Previous
                                    </button>

                                    <div className="pagination-info">
                                        Page {pagination.page} of {pagination.pages}
                                        <span className="text-muted"> ({pagination.total} total)</span>
                                    </div>

                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                        disabled={pagination.page === pagination.pages}
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Home;
