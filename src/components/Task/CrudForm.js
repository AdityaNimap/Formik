import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import FormikControl from '../elements/FormikControl'
import { Button } from '@mui/material'


const CrudForm = () => {

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

    const onSubmit = (values, onSubmitProps) => {
        console.log(values)
        onSubmitProps.resetForm()
    }

    return (
        <div>
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
    )
}

export default CrudForm