import { useFormik } from 'formik'
import React from 'react'

const Form = () => {
    const formik = useFormik({
        initialValues:{
            name:'',
            email:'',
            channel:''
        },
        onSubmit: values => {
            console.log("Form Data : ", values)
        },
        validate: values => {

            let errors = {}

            if(!values.name){
                errors.name = 'Required'
            }

            if(!values.email){
                errors.email = 'Required'
            } else if ( /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i.test(values.email)===false)
            {
                errors.email = 'Invalid Email Format'
            }

            if(!values.channel){
                errors.channel = 'Required'
            }

            return errors
        }
    })
    // console.log(formik.values)
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor='name'>Name :  </label>
                <input
                    type='text'
                    id='name'
                    name='name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
                <br/><br/>
                <label htmlFor='email'>Email :  </label>
                <input
                    type='email'
                    id='email'
                    name='email'
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                <br/><br/>
                <lable htmlFor='channel'>Channel :  </lable>
                <input
                    type='text'
                    id='channel'
                    name='channel'
                    onChange={formik.handleChange}
                    value={formik.values.channel}
                    onBlur={formik.handleBlur}
                />
                {formik.touched.channel && formik.errors.channel ? <div>{formik.errors.channel}</div> : null}
                <br/><br/>
                <button type='submit'>Submit</button>
            </form>
        </div>
    )
}

export default Form
