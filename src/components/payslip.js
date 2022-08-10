import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../index.css';
import pic from '../images/images.png'
import pic1 from '../images/Signature_Purbali (1).png'
function Payslip() {

    const handleDownload= ()=>{
        window.print();
    }

    const {id} = useParams({});

    const [data, setData] = useState();
    useEffect(() => {

        axios.get(`http://127.0.0.1:5000/get-single-payslip/${id}`)
            .then(res => {
                console.log(res.data.data)
                setData(res.data.data)
            })
            .catch(err => console.log(err))
    }, []);
    console.log(data+"xyz");
    return (
        <div class="container mt-5 mb-5">
            <img  class="image" src={pic} alt="" srcset="" />
                <div class="row">
                <div class="col-md-12">
                    <div class="text-center lh-1 mb-2">
                        <h6 class="fw-bold">Payslip</h6> <span class="fw-normal">Payment slip for the month of {data && data.paymentMonth} 2022</span>
                    </div>

                    <div class="d-flex justify-content-end"> <span>Working Branch:105 Upohar town center</span> </div>
                    <div class="row">
                        <div class="col-md-10">
                            <div class="row">

                                <div class="col-md-6">
                                    <div> <span class="fw-bolder">Date of Joining</span> <small class="ms-3"></small>{data && data.dateOfJoining} </div>
                                </div>

                                <div class="col-md-6">
                                    <div> <span class="fw-bolder">Employee Name</span> <small class="ms-3"></small>{data && data.name}</div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div> <span class="fw-bolder">Employee Code</span> <small class="ms-3">{data && data.employeeCode}</small> </div>
                                </div>
                                <div class="col-md-6">
                                    <div> <span class="fw-bolder">Designation</span> <small class="ms-3">{data && data.designation}</small> </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div> <span class="fw-bolder">Issuer Name </span> <small class="ms-3">{data && data.issuerName}</small> </div>
                                </div>
                                <div class="col-md-6">
                                    <div> <span class="fw-bolder">Department</span> <small class="ms-3">{data && data.department}</small> </div>
                                </div>
                            </div>
                        </div>
                        <table class="mt-4 table table-bordered">
                            <thead class="bg-dark text-white">
                                <tr>
                                    <th scope="col">Payment Details</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <th scope="row">Account Number</th>
                                    <td>{data && data.accountNumber}</td>

                                </tr>
                                <tr>
                                    <th scope="row">Mode of Transaction</th>
                                    <td>{data && data.modeTransaction}</td>

                                </tr>
                                <tr>
                                    <th scope="row">Payment Status</th>
                                    <td>{data && data.paymentStatus}</td>

                                </tr>
                                <tr>
                                    <th scope="row">Email Id</th>
                                    <td>{data && data.email}</td>

                                </tr>
                                <tr>
                                    <th scope="row">Payment for the Month of</th>
                                    <td>{data && data.paymentMonth}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="row">
                        <div class="col-md-4"> <br /> <span class="fw-bold">Total Payable amount  : {data && data.amount}</span> </div>
                      
                    </div>
                    <div class="d-flex justify-content-end">
                         <img src={pic1} class="image2" alt="" />
                        <div class="currentDate"> <span class="fw-bolder ">Current Date</span> <small class="ms-3 "></small>{data && data.currentDate} </div>
                        <div class="d-flex flex-column mt-2"> <span class="fw-bolder"></span> <span class="mt-4 sig">Authorised Signatory</span> </div>
                    </div>
                </div>
            </div>
             
            <div>
                <button  onClick={handleDownload}>Download</button> 
            </div>
        </div>
        
    )
}

export default Payslip
