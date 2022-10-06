import React,{useState} from 'react';
import {auth} from '../firebaseconfig'
import {useNavigate} from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()

    const[email, setEmail] = useState('')
    const[pass, setPass] = useState('')
    const[msgerror, setMsgError] = useState(null)

    const RegistrarUsuario = (e)=>{
        e.preventDefault()
        auth.createUserWithEmailAndPassword(email,pass)
            .then( r => (
                navigate('/')
            ))
            .catch( e => {
                if(e.code == 'auth/invalid-email'){
                    setMsgError('Formato Email Incorrecto')
                }
                if(e.code == 'auth/weak-password'){
                    setMsgError('La password debe tener 6 caracteres')
                } 
            })
    }

    const LoginUsuario = () =>{
        auth.signInWithEmailAndPassword(email, pass)
        .then( (r)=> navigate('/'))
        .catch( (err) =>{
            //auth/wrong-password
            if(err.code == 'auth/wrong-password'){
                setMsgError('Password Incorrecta')
            }
        })
    }

    return(
        <div className='row mt-5'>
            <div className='col'></div>
            <div className='col'>
                <form onSubmit={RegistrarUsuario} className="form-group">
                    <input 
                        onChange={(e)=>{setEmail(e.target.value)}}
                        className='form-control' 
                        placeholder='Introduce el Email' 
                        type="email" />
                    <input 
                        onChange={(e)=>{setPass(e.target.value)}}
                        className='form-control mt-4'  
                        placeholder='Introduce la Password' 
                        type="password" />
                    <input className= 'btn btn-dark btn-block mt-4' value='Registrar Usuario' type="submit"/>
                </form>
                <button 
                    onClick={LoginUsuario}
                    className='btn btn-success btn-block'>
                    Iniciar Session
                </button>

                {
                    msgerror != null ?
                    (
                        <div>
                            {msgerror}
                        </div>
                    )
                    :
                    (
                        <span></span>
                    )
                }
            </div>
            <div className='col'>

            </div>
        </div>
    );
}

export default Login;