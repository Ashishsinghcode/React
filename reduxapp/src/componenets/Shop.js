import React from 'react'
import { useDispatch } from 'react-redux'
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state';

function Shop() {
  const dispatch = useDispatch();
  const {depositeMoney, WithdrawMoney} = bindActionCreators(actionCreators,dispatch)
  return (
    <>
    <h2>Deposite / Withdraw money</h2>
        <button className='btn btn-primary' onClick={()=>depositeMoney(100)}>+</button> 
        Update Balance
        <button className='btn btn-primary' onClick={()=>WithdrawMoney(100)}>-</button> 

        {/* <button className='btn btn-primary' onClick={()=>dispatch(actionCreators.depositeMoney(100))}>+</button> 
        Update Balance
        <button className='btn btn-primary' onClick={()=>dispatch(actionCreators.WithdrawMoney(100))}>-</button>  */}
    </>
  )
}

export default Shop
