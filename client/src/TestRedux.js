
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import  * as actions from "./redux/action/index";
function TestRedux() {
   const dispatch = useDispatch();
   const [users, setUsers] = useState([]);
   const usersRedux = useSelector((state) => state.user.users);
   useEffect(() => {
      dispatch(actions.getAllUserAction());
   }, []);
   useEffect(() => {
   console.log(usersRedux);
   }, [usersRedux]);
 return (
   <div className='text-black font-semibold text-lg'></div>
  )
}

export default TestRedux;
