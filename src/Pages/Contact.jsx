import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch} from 'react-redux';
import { CreateContact, EditContact } from '../Redux/ContactReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';

const Contact = () => {


  const Dispatch = useDispatch();

  const createToast = () => toast.success(
    'Recorded Added', {
    position: "bottom-left",
    autoClose: 2000,
    pauseOnHover: false,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: "dark",
  }
  );

  const { handleChange, handleSubmit, handleReset, values ,handleBlur,errors,touched,setFieldValue} = useFormik({
    initialValues: {
      Name: '',
      Email: '',
      Password: '',
      avatar:'',
    },
    validationSchema: Yup.object({
      Name: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').min(3, 'Minimum 3 letters').max(25, 'Maximum 25 letters').required('Name is required').trim(),
      Email: Yup.string().matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please enter a valid email').required('Email is required').trim(),
      Password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character').required('password is required').trim()
    }),
    onSubmit: (values) => {
      const UniqueData = { ...values, id: Date.now() }
      Dispatch(CreateContact(UniqueData));
      console.log(values);
      handleReset();
      createToast();
    },
  });

  const [preview,setPreview]=useState(undefined)

  const handleImgChange = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setFieldValue('avatar', reader.result);
        setPreview(reader.result)
      }
    } 
    reader.readAsDataURL(e.target.files[0]);
  }

  return (
    <>
      <div className="mt-5 MainWrapper">
        <center>
          <h1>Create Contact</h1>
          <form className="mt-4 container" onSubmit={handleSubmit}>
            <div className="">
              <input type="text" className="form-control mb-3" placeholder="Name" name='Name' onChange={handleChange} onBlur={handleBlur} value={values.Name} />
              <strong className='text-danger mt-1'>{touched.Name && errors.Name}</strong>
            </div>
            <div className="mt-3">
              <input type="email" className="form-control mb-3" placeholder="Email" name='Email' onChange={handleChange} onBlur={handleBlur} value={values.Email} />
              <strong className='text-danger mt-1'>{touched.Email && errors.Email}</strong>
            </div>
            <div className="mt-3">
              <input type="password" className="form-control mb-3" placeholder="Password" name='Password' onChange={handleChange} onBlur={handleBlur} value={values.Password} />
              <strong className='text-danger'>{touched.Password && errors.Password}</strong>
            </div>
            <div className='mt-3'>
              <input type="file" className='form-control' onChange={(e)=>handleImgChange(e)} name='avatar'/>
            </div>
            <div className='col-md-6'>
              <img style={{ borderRadius: '50%'}} src={preview ? preview :`https://cdn4.iconfinder.com/data/icons/business-and-office-29/512/396-_profile__avatar__image__dp_-512.png`} className='mt-3' width={100} alt="" value={values.avatar}/>
            </div>
            <button type="submit" className="btn btn-outline-dark mt-3">Submit</button>
          </form>
          <ToastContainer />
        </center>
      </div>
     </>
  )
}

export default Contact
