import React, { useEffect, useState } from 'react';
import styles from './Modal.module.scss';
import axios from 'axios';
import { FaLightbulb } from "react-icons/fa";
import { BsFillSunFill } from "react-icons/bs";
import axiosInstance from '../../../utils/axiosinstance';

const Modal = ({ definition }) => {
    const [imgLink, setImgLink] = React.useState('');
    const [analogy, setAnalogy] = React.useState('analogy');
    const [example, setExample] = React.useState('analogy');
    const [clickExample, setClickExample] = React.useState(false);
    const [clickAnalogy, setClickAnalogy] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const hasLoaded = React.useRef(false);
    const host = process.env.REACT_APP_BACKEND;
    const headers={headers:
        {
            'Authorization':localStorage.getItem('token')
        }}      
    const getAnalogy = async () => {
        try {
            setAnalogy('Loading Analogy...')
            const response = await axiosInstance.get(host+`/explain/get_analogy?query=${definition}`,headers);
            
            if (response.data && response.data.content && response.data.content.length > 0) {
                setAnalogy('Analogy:'+response.data.content[0].analogy);
            } else {
                setAnalogy('No analogy found.');
            }
        } catch (error) {
            console.error(error);
            setAnalogy('Failed to fetch analogy.');
        }
    };

    const getExample = async () => {
        try {
            setExample('Loading Example...')
            const response = await axiosInstance.get(host+`/explain/get_example?query=${definition}`,headers);
            
            if (response.data && response.data.content && response.data.content.length > 0) {
                setExample('Example:'+response.data.content[0].example);
                console.log(response);
            } else {
                setExample('No example found.');
            }
        } catch (error) {
            console.error(error);
            setExample('Failed to fetch example.');
        }
    };
    const getImgLink = async () => {
        try {
            setLoading(true);
            setImgLink('https://images.unsplash.com/photo-1607434472257-d9f8e57a643d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D');
            const response = await axiosInstance.get(host+`/explain/get_image?query=${definition}`,headers);
            console.log(response);

            if (response.data.status === "success") {            
                console.log(response.data.url);
                setImgLink(response.data.url);
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleClickAnalogy = async () => {
        await getAnalogy();
        setClickExample(false);
        setClickAnalogy(true);
    };

    const handleClickExample = async () => {
        await getExample();
        setClickAnalogy(false);
        setClickExample(true);
    };
    useEffect(()=>{
        if(hasLoaded.current) return;
        hasLoaded.current = true;
        getImgLink();
    },[])

    return (
            <div className={styles.modal_container}>
                <div className={styles.card} style={{marginBottom:"10px"}}>
                    <p>{definition}</p>
                </div>
                <div className={styles.image_container}>
                    {imgLink!=='' && <img className={styles.image} src={imgLink} alt="Generated Image" />}
                </div>
                <div className={styles.button_box}>
                    <div className={styles.button} onClick={() => handleClickExample()}>
                        <FaLightbulb className={styles.icon_button}/>
                        Example
                    </div>
                    <div className={styles.button} onClick={() => handleClickAnalogy()}>
                        <BsFillSunFill className={styles.icon_button} />
                        Analogy
                    </div>
                </div>
                <div className={styles.card}>
                {clickAnalogy && (<p>{analogy}</p>)}
                {clickExample && (<p>{example}</p>)}
                </div>

            </div>
    )
}

export default Modal