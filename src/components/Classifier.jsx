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

    const biodegradableLabels = [
        'banana', 'apple', 'orange', 'strawberry', 'grape', 'corn', 'cucumber', 
        'tomato', 'carrot', 'potato', 'pumpkin', 'zucchini', 'lettuce', 'broccoli',
        'cabbage', 'spinach', 'beet', 'cauliflower', 'eggplant', 'onion', 'garlic',
        'ginger', 'lemon', 'lime', 'pineapple', 'mango', 'papaya', 'watermelon',
        'cantaloupe', 'peach', 'pear', 'plum', 'kiwi', 'cherry', 'avocado', 'fig',
        'dates', 'almond', 'walnut', 'hazelnut', 'peanut', 'pistachio', 'coconut',
        'bread', 'bagel', 'toast', 'biscuit', 'croissant', 'pasta', 'rice', 'oatmeal',
        'cereal', 'egg', 'egg yolk', 'egg white', 'milk', 'butter', 'cheese', 'yogurt',
        'honey', 'jam', 'jelly', 'soup', 'salad', 'sandwich', 'pizza', 'cake', 'muffin',
        'cookie', 'waffle', 'pancake', 'tea', 'coffee', 'tea leaves', 'tea bag', 
        'coffee grounds', 'paper', 'cardboard', 'napkin', 'paper towel', 'wood', 
        'sawdust', 'leaves', 'grass', 'flowers', 'plant', 'tree', 'bark', 'branches',
        'mulch', 'compost', 'soil'
      ];
    const nonBiodegradableLabels = [
        'plastic bag', 'plastic bottle', 'plastic cup', 'plastic fork', 'plastic spoon',
        'plastic knife', 'plastic container', 'plastic wrap', 'plastic straws', 
        'plastic utensils', 'plastic food wrapper', 'plastic packaging', 'plastic sheet',
        'plastic tube', 'plastic box', 'metal can', 'aluminum can', 'steel can', 'tin can',
        'metal bottle', 'metal lid', 'metal foil', 'metal utensil', 'metal pipe', 'metal wire',
        'glass bottle', 'glass jar', 'glass cup', 'glass container', 'glass jar lid', 
        'glass shard', 'glass plate', 'glass bowl', 'glass window', 'glass pane', 'battery',
        'alkaline battery', 'rechargeable battery', 'lithium battery', 'button battery',
        'car battery', 'lead battery', 'light bulb', 'fluorescent bulb', 'incandescent bulb',
        'halogen bulb', 'energy-saving bulb', 'light fixture', 'electronic device', 'cell phone',
        'tablet', 'laptop', 'computer', 'printer', 'TV', 'radio', 'television', 'monitor',
        'keyboard', 'mouse', 'charger', 'cable', 'remote control', 'plastic toys', 'rubber toys',
        'foam toys', 'toys with batteries', 'furniture', 'plastic furniture', 'metal furniture',
        'glass furniture', 'wood furniture', 'upholstery', 'carpet', 'rugs', 'vinyl flooring',
        'synthetic fabrics', 'leather products', 'synthetic leather', 'shoes', 'synthetic shoes',
        'rubber shoes', 'plastic shoes', 'plastic wrap', 'plastic containers', 'plastic utensils',
        'plastic plates', 'plastic cups', 'plastic cutlery', 'plastic bags', 'plastic wrappers',
        'plastic films', 'plastic trays', 'plastic tupperware', 'plastic straws', 'plastic lids',
        'plastic bottle caps'
      ];
    
    const checkCategory = (predictions) => {
        let isBiodegradable = false;
        let isNonBiodegradable = false;

        for (let prediction of predictions) {
            const classNames = prediction.className.toLowerCase().split(', ');
        
            for (let label of classNames) {
                if (biodegradableLabels.includes(label)) {
                    isBiodegradable = true;
                } else if (nonBiodegradableLabels.includes(label)) {
                    isNonBiodegradable = true;
                }
            }
        }

        if (isBiodegradable && !isNonBiodegradable) {
            return 'Biodegradable';
        } else if (isNonBiodegradable && !isBiodegradable) {
            return 'Non-Biodegradable';
        } else if (isBiodegradable && isNonBiodegradable) {
            return 'Mixed (Contains both biodegradable and non-biodegradable items)';
        } else {
            return 'Unknown';
        }
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
        const val = checkCategory(results);
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
                    Identify Image
                </button>
            )}

            <div className="output">
                {results && <h2>This is: {results}</h2>}
            </div>
        </div>

        </>
    );
}

export default Classifier;
