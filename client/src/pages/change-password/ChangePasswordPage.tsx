import React from 'react'
import ChangePasswordConnector from '../../components/ChangePassword/ChangePasswordConnector'

const ChangePasswordPage = (props:any) => {
console.log('ChangePasswordPage', props) 

const {match: {params  : {key}}} = props
console.log('ChangePasswordPage2 ', key) 
 return (<div className="sign-in-sign-up">
     <ChangePasswordConnector keyid={key} />
</div>)
}

export default ChangePasswordPage