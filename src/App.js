
import { useDispatch } from 'react-redux';
import './App.css';
import { useEffect } from 'react';
import { StoreDataAction } from './Redux/Action-Reducer.js'
import AllUsers from './Users/AllUsers';



function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(StoreDataAction())
  }, [])


  return (
    <AllUsers />
  );

}

export default App;
























