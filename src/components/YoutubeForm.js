import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import React from 'react'
import './form.css'
import * as Yup from 'yup'
import TextError from './TextError'


const YoutubeForm = () => {

    const initialValues = {
        name: '',
        email: '',
        channel: '',
        comments: '',
        social: {
            facebook: '',
            twitter: ''
        },
        mobNos: ['', ''],
        phNos: ['']
    }
    const onSubmit = (values, onSubmitProps) => {
        console.log("Form Data : ", values)
        console.log("on Submit props",onSubmitProps)
        onSubmitProps.resetForm()
    }

    const validationSchema = Yup.object({
        name: Yup.string().required('Required...!'),
        email: Yup.string().required('Required...!').email('Invalid email format'),
        channel: Yup.string().required('Required...!'),
    })

    const validateComments = (value)=>{
        let error
        if(!value){
            error = 'Required'
        }
        return error
    }


    // console.log(formik.values)
    return (
        <div className='parent'>
            <div className='main'>
                <h1 className='heading'>Simple Form</h1>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>

                    <Form>
                        <Field
                            className='inputField'
                            placeholder='Enter Your Name'
                            id='name'
                            name='name'
                        />
                        <ErrorMessage name='name' component={TextError} />
                        <br />
                        <Field
                            className='inputField'
                            placeholder='Enter Your Email ID'
                            id='email'
                            name='email'
                        />
                        <ErrorMessage name='email'>
                            {
                                (errMsg) => <div className='err'>{errMsg}</div>
                            }
                        </ErrorMessage>
                        <br />
                        <Field
                            className='inputField'
                            placeholder='Enter Your Channel Name'
                            id='channel'
                            name='channel'
                        />
                        <ErrorMessage name='channel' component={TextError} />
                        <br />
                        <Field
                            as='textarea'
                            className='inputField'
                            placeholder='Enter Your Comment'
                            id='comments'
                            name='comments'
                            validate={validateComments}
                        />
                        <ErrorMessage name='comments' component={TextError}/>
                        <br />
                        <Field
                            className='inputField'
                            placeholder='Enter Your Facebook Profile'
                            name='social.facebook'
                        />
                        <br />
                        <Field
                            className='inputField'
                            placeholder='Enter Your Twitter Profile'
                            name='social.twitter'
                        />
                        <br />
                        <Field
                            className='inputField'
                            placeholder='Enter Your Primary Mob number'
                            name='mobNos[0]'
                        />
                        <br />
                        <Field
                            className='inputField'
                            placeholder='Enter Your Secondary Mob Number'
                            name='mobNos[1]'
                        />
                        <br />
                        <FieldArray name='phNos'>
                            {
                                (fieldArrayProps) => {
                                    // console.log(fieldArrayProps)
                                    const { push, remove, form } = fieldArrayProps
                                    const { values } = form
                                    const { phNos } = values
                                    return <div>
                                        {
                                            phNos.map((phNo, index) => (
                                                <div key={index}>
                                                    <Field name={`phNos[${index}]`}
                                                        className='inputField' placeholder='Enter Your Phone Number' />
                                                        {
                                                            index>0 && 
                                                            <button type='button' onClick={() => remove(index)}>-</button>
                                                        }
                                                    
                                                    <button type='button' onClick={() => push('')}>+</button>
                                                </div>
                                            ))
                                        }
                                    </div>
                                }
                            }
                        </FieldArray>
                        <br />
                        <button type='submit' className='btn'>Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default YoutubeForm
