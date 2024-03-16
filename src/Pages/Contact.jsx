import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch} from 'react-redux';
import { CreateContact} from '../Redux/ContactReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const { handleChange, handleSubmit, handleReset, values ,handleBlur,errors,touched} = useFormik({
    initialValues: {
      Name: '',
      Email: '',
      Password: '',
    },
    validationSchema: Yup.object({
      Name: Yup.string().matches(/^[A-Za-z ]*$/, 'Please enter valid name').min(3, 'Minimum 3 letters').max(25, 'Maximum 25 letters').required('Name is required').trim(),
      Email: Yup.string().matches(/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/, 'Please enter a valid email').required('Email is required').trim(),
      Password: Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, 'Minimum eight characters, at least one letter, one number and one special character').required('password is required').trim()
    }),
    onSubmit: (values) => {
      const UniqueData = { ...values, id: Date.now() }
      Dispatch(CreateContact(UniqueData));
      handleReset();
      createToast();
    },
  });

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
            <button type="submit" className="btn btn-outline-dark mt-3">Submit</button>
          </form>
          <ToastContainer />
        </center>
      </div>
     </>
  )
}

export default Contact
