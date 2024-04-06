// Product.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { useDispatch } from 'react-redux';
import { ADD } from '../redux/actions/action';

const Product = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(false);

    const send = (item) => {
        dispatch(ADD(item));
        alert("Item added successfully");
    };

    useEffect(() => {
        getProduct();
    }, [id]);

    const getProduct = async () => {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const result = await response.json();
        setProduct(result);
        setLoading(false);
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

    const ShowProduct = () => {
        if (!product) {
            return null;
        }

        // Use either the thumbnail or the first image in the images array
        const imageUrl = product.images && product.images.length > 0 ? product.images[0] : product.thumbnail;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 mt-5">
                        <img src={imageUrl} alt={product.title} height="400" width="500" />
                    </div>
                    <div className="col-lg-6 mt-5">
                        <h4 className='text-uppercase'>{product.category}</h4>
                        <h1 className='display-5'>{product.title}</h1>
                        <p className='fw-bolder'>Rating {product.rating}</p>
                        <h3>$ {product.price}</h3>
                        <p>{product.description}</p>
                        <Button onClick={() => send(product)} variant="dark">Add to Cart</Button>
                        <Button className='ms-3' variant="dark">Go to Cart</Button>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="container">
            {loading ? <Loading /> : <ShowProduct />}
        </div>
    );
}

export default Product;
