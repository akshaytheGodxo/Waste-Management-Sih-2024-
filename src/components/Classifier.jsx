import React, { useState, useEffect, useRef } from "react";
import * as mobilenet from "@tensorflow-models/mobilenet";
import './styles/Classifier.css'; // Import the CSS file
import NavBar from "./LandingPage/NavBar";
import Footer from "./LandingPage/Footer";

const Classifier = () => {
    const [isModelLoading, setIsModelLoading] = useState(false);
    const [model, setModel] = useState(null);
    const [imageURL, setImageURL] = useState(null);
    const [results, setResults] = useState('');
    const imageRef = useRef();

    // Define plastic-related labels
    const plasticLabels = [
        'plastic bag', 'plastic bottle', 'plastic cup', 'plastic fork', 'plastic spoon',
        'plastic knife', 'plastic container', 'plastic wrap', 'plastic straws', 
        'plastic utensils', 'plastic food wrapper', 'plastic packaging', 'plastic sheet',
        'plastic tube', 'plastic box', 'plastic toys', 'plastic containers', 'plastic utensils',
        'plastic plates', 'plastic cups', 'plastic cutlery', 'plastic bags', 'plastic wrappers',
        'plastic films', 'plastic trays', 'plastic tupperware', 'plastic straws', 'plastic lids',
        'plastic bottle caps'
    ];

    const estimatePlasticAmount = (predictions) => {
        let plasticAmount = 0;

        for (let prediction of predictions) {
            const classNames = prediction.className.toLowerCase().split(', ');
            
            for (let label of classNames) {
                if (plasticLabels.includes(label)) {
                    // Assume a simple scoring based on confidence
                    plasticAmount += prediction.probability;
                }
            }
        }

        // Return the plastic amount as a percentage
        const percentage = (plasticAmount * 100).toFixed(2); // Round to 2 decimal places
        return `${percentage}% of the image contains plastic`;
    }

    const loadModel = async() => {
        setIsModelLoading(true);
        try {
            const model = await mobilenet.load();
            setModel(model);
            setIsModelLoading(false);
        } catch(error) {
            console.log(error);
            setIsModelLoading(false);
        }
    }

    const identify = async () => {
        const results = await model.classify(imageRef.current);
        console.log(results);
        const val = estimatePlasticAmount(results);
        setResults(val);
    }

    useEffect(() => {
        loadModel()
    }, [])

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageURL(url);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const uploadImage = (e) => {
        const { files } = e.target;
        if (files.length > 0) {
            const url = URL.createObjectURL(files[0]);
            setImageURL(url);
        } else {
            setImageURL(null);
        }
    };

    if (isModelLoading) {
        return <h2>Model loading....</h2>
    }

    return (
        <>
        <NavBar />
        <div className="classifier-container">
            <div 
                className="drop-zone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
            >
                {imageURL ? (
                    <div className="image-preview">
                        <img src={imageURL} alt="upload preview" ref={imageRef} />
                    </div>
                ) : (
                    <p>Drag and drop an image here, or click to upload</p>
                )}
            </div>

            <input 
                type="file" 
                accept="image/*" 
                capture="camera" 
                className="upload-input" 
                onChange={uploadImage}
                style={{ display: 'none' }}
            />
            <button 
                className="upload-button" 
                onClick={() => document.querySelector('.upload-input').click()}
            >
                Upload Image
            </button>

            {imageURL && (
                <button 
                    className="identify-button" 
                    style={{ backgroundColor: 'grey' }} 
                    onClick={identify}
                >
                    Identify Plastic Amount
                </button>
            )}

            <div className="output">
                {results && <h2>{results}</h2>}
            </div>
        </div>
        <Footer />
        </>
    );
}

export default Classifier;
