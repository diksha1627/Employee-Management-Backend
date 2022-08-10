import { Paper, Button, Typography } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const AddFile = () => {

    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };



    const handleSubmission = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append('file', selectedFile);
        console.log(selectedFile);

        axios({
            method: 'post',
            url: 'http://127.0.0.1:5000',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
        }
        )
            .then((response) => response.json())
            .then((result) => {
                console.log('Success:', result);
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    };

    const [data, setData] = useState([]);
    useEffect(() => {

        axios.get('http://127.0.0.1:5000')
            .then(res => {
                console.log(res.data)
                setData(res.data.items)
            })
            .catch(err => console.log(err))
    }, []);



    return (
        <div >
            <form action="/" method="post" enctype="multipart/form-data" name="file" onSubmit={handleSubmission}>
                <input type="file" name="file" onChange={changeHandler} />
                <button >Submit</button>
            </form>



            <table id="table" class="table">
                <thead>
                    <tr>
                        <th>Name</th>
                    </tr>
                </thead>
                <tbody id="tbody">
                    {data.map((item) => {
                        return (
                            <tr>
                                <th>{item.name}</th>
                                <th>'
                                    <Link to={`/payslip/${item._id}`}>
                                        <button type="submit">View Payslip</button>
                                    </Link>
                                </th>
                            </tr>

                        )
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default AddFile