import React from 'react'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { EditContact } from '../Redux/ContactReducer';
function Modal({ contact }) {

    const dispatch = useDispatch();

    const { handleChange,handleSubmit, values, handleBlur, errors, touched } = useFormik({
        initialValues: contact,
        enableReinitialize: true,
        validationSchema: Yup.object({
            Name: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').min(3, 'Minimum 3 letters').max(25, 'Maximum 25 letters').required('Name is required').trim(),
            Email: Yup.string().matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please enter a valid email').required('Email is required').trim(),
            Password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character').required('password is required').trim()
        }),
        onSubmit: (values) => {
            dispatch(EditContact(values));
        },
    });

    return (
        <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Contact</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <input type="text" className="form-control mb-3" placeholder="Name" name='Name' onChange={handleChange} onBlur={handleBlur} value={values?.Name} />
                            <strong className='text-danger mt-1'>{touched.Name && errors.Name}</strong>
                            <div className="mt-3">
                                <input type="email" className="form-control mb-3" placeholder="Email" name='Email' onChange={handleChange} onBlur={handleBlur} value={values?.Email} />
                                <strong className='text-danger mt-1'>{touched.Email && errors.Email}</strong>
                            </div>
                            <div className="mt-3">
                                <input type="password" className="form-control mb-3" placeholder="Password" name='Password' onChange={handleChange} onBlur={handleBlur} value={values?.Password} />
                                <strong className='text-danger'>{touched.Password && errors.Password}</strong>
                            </div>
                            <button type="submit" className="btn btn-outline-dark" data-bs-dismiss="modal">Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal
