import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../elements/FormikControl'
import { Button } from '@mui/material'
import '../form.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from 'axios';

const CrudForm = () => {

    const [users, setUsers] = useState([]);
    const [temp,setTemp] = useState(null)

    const checkboxOptions = [
        { key: `I agree all terms and conditions`, value: 'accepted' }
    ]
    const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/

    const initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
        mobNo: '',
        terms: '',
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email format...!').required('This field is required...!'),
        password: Yup.string().required('This field is required...!'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), ''], `Password did'nt match`).required('This Field is required...!'),
        mobNo: Yup.string().required('This field is required...!').matches(phoneRegExp, 'Phone number is not valid'),
        terms: Yup.array().required('This field is required...!')
    })



    const fetchUser = () => {
        temp && axios
            .get("http://localhost:8080/users")
            .then((resp) => {
                setUsers(resp.data)
                console.log("Api response", resp.data)
                console.log("State result", users)
            })
    }

    useEffect(() => {
        fetchUser()
    }, [])

    function deleteUser(id){
        axios
        .delete(`http://localhost:8080/users/${id}`)
        fetchUser()
    }


    const onSubmit = (values, onSubmitProps) => {
        console.log(values)
        // onSubmitProps.resetForm()
        axios
            .post("http://localhost:8080/users", values)
            .then(resp => console.log("User addes successfully", resp.data))
            setTemp(1)
        fetchUser();
    }

    return (
        <div >
            <div className='main'>
                <h1 className='heading'> Enter Your Details </h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {
                        formik => {
                            return <Form>
                                <FormikControl
                                    control='input'
                                    type='email'
                                    name='email'
                                    icon={<i className="fa-solid fa-envelope fa-lg" style={{ color: '#2196F3' }}></i>}
                                    label=' Email'
                                    placeholder='Enter Your Email ID'
                                />
                                <FormikControl
                                    control='password'
                                    icon={<i className="fa-solid fa-key fa-lg" style={{ color: '#2196F3' }}></i>}
                                    label=' Enter Password'
                                    name='password'
                                    placeholder='Enter New Password'
                                />
                                <FormikControl
                                    control='password'
                                    icon={<i className="fa-solid fa-key fa-lg" style={{ color: '#2196F3' }}></i>}
                                    label=' Confirm Password'
                                    name='confirmPassword'
                                    placeholder='Enter Password Again'
                                />

                                <FormikControl
                                    control='input'
                                    icon={<i className="fa-solid fa-phone fa-lg" style={{ color: '#2196F3' }}></i>}
                                    name='mobNo'
                                    label=' Mobile Number'
                                    placeholder='Enter Mobile Number'
                                />
                                <FormikControl
                                    control='checkbox'
                                    name='terms'
                                    options={checkboxOptions}
                                />
                                <div className='modal-btn'>
                                    <Button type='submit' variant="contained" className='mui-btn'>Register</Button><br /></div>


                            </Form>
                        }
                    }

                </Formik>
            </div>
            <div className="tabel">




                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Password</TableCell>
                                <TableCell>Confirm</TableCell>
                                <TableCell>Mob no</TableCell>
                                <TableCell colSpan={2}  style={{textAlign:'center'}}>Action</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                users.map((user, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{user.id}</TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>{user.password}</TableCell>
                                        <TableCell>{user.confirmPassword}</TableCell>
                                        <TableCell>{user.mobNo}</TableCell>
                                        <TableCell><Button variant='contained' onClick={()=>deleteUser(user.id)}>Delete</Button></TableCell>
                                        <TableCell><Button variant='contained'>Edit</Button></TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </TableContainer>


            </div>
        </div>
    )
}

export default CrudForm