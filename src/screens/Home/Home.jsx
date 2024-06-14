import React, { useEffect } from 'react'
import Navbar from './Navbar'
import Tasks from './Tasks'
import useLoginUser from '../../hooks/loginUser'
import { useSelector } from 'react-redux'

const Home = () => {

  const {loginUser} = useLoginUser();
  const user = useSelector(state => state.user);

  useEffect(() => {
    if(!user) {
      loginUser();
    }
  }, [])

  return (
    <div>
        <Tasks />
    </div>
  )
}

export default Home