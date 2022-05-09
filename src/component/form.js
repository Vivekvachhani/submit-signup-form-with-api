import React, { useRef, useState } from 'react'
import TextField from './TextField'
import SimpleReactValidator from 'simple-react-validator';
import { FAN_SIGNUP_URL, TALENT_SIGNUP_URL } from '../shared/constant'
import { toast } from "react-toastify";
import { mainPostServices } from '../shared/services'

const Form = () => {
    const [User, setUser] = useState({
        first_name: '',
        last_name: '',
        username: '',
        email: '',
        password: '',

    })
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [selectedTeb, setSelectedTeb] = useState('FANSIGNUP')
    const simpleValidator = useRef(new SimpleReactValidator({
        autoForceUpdate: this,
        validators: {}
    }))

    const handleChange = (e) => {
        const { name, value } = e.target
        setUser({ ...User, [name]: value })
    }

    const signUpHandler = async (e) => {
        e.preventDefault()
        if (simpleValidator.current.allValid()) {

            let data = {
                firstName: User?.first_name,
                lastName: User?.last_name,
                email: User?.email,
                password: User?.password,
                username: User?.username,
            }
            let API = (selectedTeb === "FANSIGNUP") ? FAN_SIGNUP_URL : TALENT_SIGNUP_URL
            const { success } = await mainPostServices(API, data);

            if (success) {
                toast.success('successfully sign up...')
            }

            else {
                simpleValidator.current.showMessages();
                toast.error('failed...')
            }

        } else {
            simpleValidator.current.showMessages()
            forceUpdate()
        }
    }
    return (
        <>
            {/* <div> */}
            <div className="form">
                <ul className="tab-group">
                    <li onClick={() => setSelectedTeb('FANSIGNUP')} className={`${selectedTeb === "FANSIGNUP" ? 'active' : ''} tab`}> FAN SIGNUP</li>
                    <li onClick={() => setSelectedTeb('TALENTSIGNUP')} className={`${selectedTeb === "TALENTSIGNUP" ? 'active' : ''} tab`}>TALENT SIGNUP</li>
                </ul>
                <div className="tab-content">
                    <div id="signup">
                        <form onSubmit={(e) => signUpHandler(e)} method='post'>
                            <div className="field-wrap">
                                <TextField type="text" placeholder='First Name' name="first_name" value={User?.first_name} handleChange={handleChange} errorValidation={simpleValidator.current.message('First Name', User.first_name, 'required')} label="First Name" />
                            </div>
                            <div className="field-wrap">
                                <TextField type="text" placeholder='Last Name' name="last_name" value={User?.last_name} handleChange={handleChange} errorValidation={simpleValidator.current.message('Last Name', User?.last_name, 'required')} label="Last Name" />
                            </div>
                            <div className="field-wrap">
                                <TextField type="text" placeholder=' User Name' name="username" value={User?.username} handleChange={handleChange} errorValidation={simpleValidator.current.message('User Name', User?.username, 'required')} label=" User Name" />
                            </div>
                            <div className="field-wrap">
                                <TextField type="email" placeholder='Email Address' name="email" value={User?.email} handleChange={handleChange} errorValidation={simpleValidator.current.message('Email', User.email, 'email|required')} label="Email Address" />
                            </div>
                            <div className="field-wrap">
                                <TextField type="password" placeholder='Password' name="password" value={User?.password} handleChange={handleChange} errorValidation={simpleValidator.current.message('Password', User?.password, 'required')} label="Password" />
                            </div>
                            <button type="submit" className="button button-block" >Sign Up</button>
                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Form