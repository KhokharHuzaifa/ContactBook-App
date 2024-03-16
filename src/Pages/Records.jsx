import { useSelector, useDispatch } from "react-redux";
import { DeleteContact } from "../Redux/ContactReducer";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Records = () => {

  const Dispatch = useDispatch();

  const { ContactReducer } = useSelector(state => state);

  const deleteToast = () => toast.error(
    'Recorded Deleted', {
    position: "bottom-left",
    autoClose: 2000,
    pauseOnHover: false,
    hideProgressBar: false,
    closeOnClick: true,
    progress: undefined,
    theme: "dark",
  }
  );

  const handledelete = (id) => {
    Dispatch(DeleteContact(id));
    deleteToast();
  }

  return (
      <div className="mt-5 MainWrapper">
      <center>
        <h1>All Records</h1>
        {
          ContactReducer.value.length < 1 ? <><h2 className="text-danger mt-3">Records are empty</h2><Link to={'/contact'} className="nav-link text-primary">Create them?</Link></>:
          ContactReducer.value.map((p, idx) => {
            return <>
              <div className="accordion container mt-4" key={idx}>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button className="accordion-button bg-light" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${p.id}`}>
                      <strong>{idx + 1} {p.Name}</strong>
                    </button>
                  </h2>
                  <div id={`collapse${p.id}`} className="accordion-collapse collapse">
                    <div className="accordion-body">
                      <strong>Name: <span className='text-success'>{p.Name}</span></strong>
                      <strong>Email: <span className='text-success'>{p.Email}</span></strong>
                      <strong>Password: <span className='text-success'>{p.Password}</span></strong>
                      <div className='mt-1'>
                        <button className='btn btn-danger' onClick={() => handledelete(p.id)}><i className="fa-regular fa-trash-can"></i></button>
                        <button className='btn btn-warning ms-2'><i className="fa-solid fa-pencil"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          })
        }
        <ToastContainer />
      </center>
    </div>
  )
}

export default Records
