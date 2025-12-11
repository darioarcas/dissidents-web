import { useDispatch } from "react-redux"
import { uiOpenModal } from "../actions/ui";


const AddNewFab = () => {
    const dispatch = useDispatch();
    const openForm = ()=>{
        dispatch(uiOpenModal());
    }
  return (
    <button 
        onClick={openForm}
        className="btn btn-primary"
        style={{margin:"0px", padding:"0px", bottom:"100px", borderRadius:"50%", position:"fixed", right:"25px", width:"40px", height:"40px"}}
    >
      <p style={{padding:"0px", margin:"0px", fontSize:"20px"}}>+</p>
    </button>
  )
}

export default AddNewFab
