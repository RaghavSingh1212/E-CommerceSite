// Products.jsx
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Spinner from 'react-bootstrap/Spinner';

const Products = () => {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchCategories();
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const response = await fetch('https://dummyjson.com/products');
        const result = await response.json();
        setData(result.products);
        setLoading(false);
    };

    const fetchCategories = async () => {
        const response = await fetch('https://dummyjson.com/products/categories');
        const result = await response.json();
        setCategories(result.sort());
    };

    const searchProducts = async () => {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/search?q=${searchQuery}`);
        const result = await response.json();
        setData(result.products);
        setLoading(false);
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        searchProducts();
    };

    const filterProduct = (category) => {
        setSearchQuery('');
        setLoading(true);
        const categoryUrl = category === '' ? 'https://dummyjson.com/products' : `https://dummyjson.com/products/category/${category}`;
        fetch(categoryUrl)
            .then(res => res.json())
            .then(result => {
                setData(result.products);
                setLoading(false);
            });
    };

    const Loading = () => (
        <div className="mt-4">
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
            <Spinner animation="grow" />
        </div>
    );

    const ShowProducts = () => (
        <div className="row">
            {data.map((item) => {
                const imageUrl = item.images && item.images.length > 0 ? item.images[0] : item.thumbnail;
                return (
                    <div key={item.id} className="col-3 mt-5">
                        <Card className="border border-dark">
                            <Card.Img variant="top" style={{ height: '300px' }} src={imageUrl} alt={item.title} />
                            <Card.Body>
                                <Card.Title>{item.title}</Card.Title>
                                <Card.Text className='fw-bold'>
                                    $ {item.price}
                                </Card.Text>
                                <Link to={`/products/${item.id}`}>
                                    <Button variant="dark">Buy Now</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </div>
                );
            })}
        </div>
    );

    return (
        <div className="container mt-5 pb-5">
            <h1 className='display-6'>Products</h1>
            <form onSubmit={handleSearchSubmit} className="mb-3">
                <input type="text" value={searchQuery} onChange={handleSearchChange} placeholder="Search products..." />
                <Button type="submit" variant="outline-secondary">Search</Button>
            </form>
            <div className="mb-3">
                <Button onClick={() => filterProduct('')} className='me-2' variant="outline-dark">All Products</Button>
                {categories.map((category) => (
                    <Button key={category} onClick={() => filterProduct(category)} className='me-2' variant="outline-dark">
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </Button>
                ))}
            </div>
            <hr />
            {loading ? <Loading /> : <ShowProducts />}
        </div>
    );
};

export default Products;
