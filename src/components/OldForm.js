import { useFormik } from 'formik'
import React from 'react'
import './form.css'
import * as Yup from 'yup'


const OldForm = () => {

    const initialValues = {
        name: '',
        email: '',
        channel: ''
    }
    const onSubmit = values => {
        console.log("Form Data : ", values)
    }
    // const validate = values => {

    //     let errors = {}

    //     if (!values.name) {
    //         errors.name = 'Required'
    //     }

    //     if (!values.email) {
    //         errors.email = 'Required'
    //     } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(values.email) === false) {
    //         errors.email = 'Invalid Email Format'
    //     }

    //     if (!values.channel) {
    //         errors.channel = 'Required'
    //     }

    //     return errors
    // }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required'),
        email: Yup.string().required('Required').email('Invalid email format'),
        channel: Yup.string().required('Required')
    })

    const formik = useFormik({
        initialValues ,
        onSubmit,
        // validate
        validationSchema
    })
    // console.log(formik.values)
    return (
        <div className='parent'>
            <div className='main'>
                <h1 className='heading'>Simple Form</h1>
                <form onSubmit={formik.handleSubmit}>
                    <input
                        type='text'
                        className='inputField'
                        placeholder='Enter Your Name'
                        id='name'
                        name='name'
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.name && formik.errors.name ? <div className='err'>{formik.errors.name}</div> : null}
                    <br />
                    <input
                        type='email'
                        className='inputField'
                        placeholder='Enter Your Email ID'
                        id='email'
                        name='email'
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.email && formik.errors.email ? <div className='err'>{formik.errors.email}</div> : null}
                    <br />
                    <input
                        type='text'
                        className='inputField'
                        placeholder='Enter Your Channel Name'
                        id='channel'
                        name='channel'
                        onChange={formik.handleChange}
                        value={formik.values.channel}
                        onBlur={formik.handleBlur}
                    />
                    {formik.touched.channel && formik.errors.channel ? <div className='err'>{formik.errors.channel}</div> : null}
                    <br />
                    <button type='submit' className='btn'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default OldForm
