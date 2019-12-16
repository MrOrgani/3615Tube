import React from 'react'
import ChangePasswordConnector from '../../components/ChangePassword/ChangePasswordConnector'

const ChangePasswordPage = (props: any) => {
    const {match : {params : {key}}} = props
return (
<div className="sign-in-sign-up">
     <ChangePasswordConnector token={key}/>
</div>
)}


export default ChangePasswordPage