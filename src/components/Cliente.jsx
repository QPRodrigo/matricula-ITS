import React, {useState, useEffect} from 'react';
import {store, uploadFile} from '../firebaseconfig'

import Select from 'react-select';
import Alert from 'react-bootstrap/Alert';

const tipoCortesia = [
    { label: '', value: ''},
    { label: 'Excel', value: 'Excel'},
    { label: 'Power BI', value: 'Power BI'},
    { label: 'Excel / Power BI', value: 'Excel /Power BI'},
]

const tipoMultiplicidad = [
    { label: '', value: ''},
    { label: 'Uno', value: 'uno'},
    { label: 'Dos', value: 'Dos'},
    { label: 'Tres', value: 'Tres'},
]

const tipoFormaPago = [
    { label: '', value: ''},
    { label: 'Cuotas', value: 'Cuotas'},
    { label: 'Contado', value: 'Contado'},
    { label: 'Reserva', value: 'Reserva'},
]

const tipoFormaAccesoSap = [
    { label: '', value: ''},
    { label: 'Serie', value: 'Serie'},
    { label: 'Paralelo', value: 'Paralelo'},
]

const Cliente = () => {
    
    const[modoedicion, setModoEdicion] = useState(null)

    const[idcliente, setIdCliente] = useState('') //id Cliente
    const[mescreacion, setMescreacion] = useState('') // Mes de Creacion Cliente
    const[fechacreacion, setfechacreacion] = useState('') // Fecha de Creacion Cliente
    const[nombreusuario, setNombreUsuario] = useState('') //Nombre Cliente
    const[nombrecliente, setNombreCliente] = useState('') //Nombre Cliente
    const[dni, setDni] = useState('') // DNI Cliente
    const[phone, setPhone] = useState('') // Telefono Cliente
    const[correo, setCorreo] = useState('') // Correo Cliente

    const[cortesia, setCortesia] = useState('') //multiplicidad
    const[multiplicidad, setMultiplicidad] = useState('') //multiplicidad
    const[formapago, setFormaPago] = useState('') //multiplicidad
    const[formaacceso, setFormaAcceso] = useState('') //Formas de Acceso

    const[linkarchivodni, setLinkarchivodni] = useState('')
    const[linkarchivovoucher, setLinkarchivovoucher] = useState('')
    const[linkarchivorecibo, setLinkarchivorecibo] = useState('')
    const[linkarchivoterminos, setLinkarchivoterminos] = useState('')

    const[error, setError] = useState('') // 
    const[clienteagenda, setClienteAgenda] = useState([])
    

    const[file, setFile] = useState(null)

    const setClientes = async(e) => {
        e.preventDefault()
        if(!mescreacion.trim()){
            setError('El campo Mes esta vacio')
        }
        else if(!fechacreacion.trim()){
            setError('El campo Fecha esta vacio')
        }
        else if(!nombreusuario.trim()){
            setError('El campo Nombre de Asesor esta vacio')
        }
        else if(!nombrecliente.trim()){
            setError('El campo Nombre de Cliente esta vacio')
        }
        else if(!dni.trim()){
            setError('El campo DNI esta vacio')
        }
        else if(!phone.trim()){
            setError('El campo telefono esta vacio')
        }
        else if(!correo.trim()){
            setError('El campo correo esta vacio')
        }
        // 
        else if(!cortesia.trim()){
            setError('El campo Curso de Cortesia de Cliente esta vacio')
        }
        else if(!multiplicidad.trim()){
            setError('El campo Multiplicidad de Cursos esta vacio')
        }
        else if(!formapago.trim()){
            setError('El campo Forma de Pago esta vacio')
        }
        else if(!formaacceso.trim()){
            setError('El campo forma de Acceso esta vacio')
        }
        else if(!linkarchivodni.trim()){
            setError('El Documento DNI esta vacio')
        }

        const usuario = {
            mes: mescreacion,
            fecha: fechacreacion,
            asesor: nombreusuario,
            nombre: nombrecliente,
            dni: dni,
            telefono: phone,
            correo: correo,
            cortesia: cortesia,
            multiplicidad: multiplicidad,
            formapago: formapago,
            formaacceso: formaacceso,
            linkdni: linkarchivodni,
            linkvoucher: linkarchivovoucher,
            linkrecibo: linkarchivorecibo,
            linkterminos: linkarchivoterminos,            
        }

        try{
            const data = await store.collection('cliente').add(usuario)
            const {docs} = await store.collection('cliente').get()
            const nuevoArray = docs.map( item => ({id:item.id, ...item.data()}))
            setClienteAgenda(nuevoArray)
            console.log('Cliente Añadido')
            alert('Cliente Añadido')
        }catch(e){
            console.log(e)
        }

        setMescreacion('')
        setfechacreacion('')
        setNombreUsuario('')
        setNombreCliente('')
        setDni('')
        setPhone('')
        setCorreo('')

        setCortesia('')
        setMultiplicidad('')
        setFormaPago('')
        setFormaAcceso('')
    }
  
    const handleSelectCortesia = ({value}) =>{
        setCortesia(value);
    }

    const handleSelectMultiplicidad = ({value}) =>{
        setMultiplicidad(value);
    }

    const handleSelectFormaPago = ({value}) =>{
        setFormaPago(value);
    }

    const handleSelectFormaAccesoSap = ({value}) =>{
        setFormaAcceso(value);
    }


    const handleSubmitFileDNI = async (e) =>{
        e.preventDefault();
        try{
            const result = await uploadFile(file);
            console.log(result)
            setLinkarchivodni(result)
        }catch(error){
            console.error(error);
            alert('Fallo al subir el Archivo')
        }

        
    };

    const handleSubmitFileVoucher = async (e) =>{
        e.preventDefault();
        try{
            const result = await uploadFile(file);
            console.log(result)
            setLinkarchivovoucher(result)
        }catch(error){
            console.error(error);
            alert('Fallo al subir el Archivo')
        }
    };

    const handleSubmitFileRecibo = async (e) =>{
        e.preventDefault();
        try{
            const result = await uploadFile(file);
            console.log(result)
            setLinkarchivorecibo(result)
        }catch(error){
            console.error(error);
            alert('Fallo al subir el Archivo')
        }
    };

    const handleSubmitFileTerminosCondiciones = async (e) =>{
        e.preventDefault();
        try{
            const result = await uploadFile(file);
            console.log(result)
            setLinkarchivoterminos(result)
        }catch(error){
            console.error(error);
            alert('Fallo al subir el Archivo')
        }
    };
    return(
        <div className = 'container'>
            <h2 className=' mt-3'>Formulario de Creacion de Clientes</h2>
            <form onSubmit={setClientes} className='form group'>   

                <div className='row'>
                    <div className="col">
                        <label >Nombre del Asesor:</label>
                        <br/>
                        <input
                            value={nombreusuario}
                            onChange={(e) => {setNombreUsuario(e.target.value)}}
                            className='form-control'
                            placeholder='Introduzca el Nombre del ASESOR'
                            type="text" />
                    </div>
                </div>

                <div className="row">
                    <div className="col">
                        <label >Mes de Creacion del Cliente:</label>
                        <br/>
                        <input 
                            value={mescreacion}
                            onChange={(e) => {setMescreacion(e.target.value)}}
                            className='form-control '
                            placeholder='Introduce el Mes de Creacion del Cliente'
                            type="text" />
                        <label >Nombre del Cliente:</label>
                        <br/>
                        <input
                            value={nombrecliente}
                            onChange={(e) => {setNombreCliente(e.target.value)}}
                            className='form-control'
                            placeholder='Introduce el Nombre del Cliente'
                            type="text" />
                        <label >Correo del Cliente:</label>
                        <input 
                            value={correo}
                            onChange={(e) => {setCorreo(e.target.value)}}
                            className='form-control'
                            placeholder='Introduce el Correo del Cliente'
                            type="text" /> 
                    </div>

                    <div className="col">
                        <label > Fecha de creacion del Cliente:</label>
                        <input 
                            value={fechacreacion}
                            onChange={(e) => {setfechacreacion(e.target.value)}}
                            className='form-control'
                            placeholder='Introduce la Fecha de creacion del Cliente'
                            type="text" /> 
                        <label > DNI / CE del Cliente:</label>
                        <input
                            value={dni}
                            onChange={(e) => {setDni(e.target.value)}}
                            className='form-control'
                            placeholder='Introduce el DNI / CE del Cliente'
                            type="text" />
                        <label >Celular del Cliente:</label>
                        <input 
                            value={phone}
                            onChange={(e) => {setPhone(e.target.value)}}
                            className='form-control'
                            placeholder='Introduce el Celular del Cliente'
                            type="text" />  

                    </div>
                </div>

                <div className='row'>
                    <div className="col">
                        <label> Ingrese los Cursos de Cortesia:</label>
                        <Select
                            options={tipoCortesia}
                            onChange={handleSelectCortesia}
                        />  
                    </div>
                    <div className="col">
                        <label> Ingrese el Tipo de Multiplicidad:</label>
                        <Select
                            options={tipoMultiplicidad}
                            onChange={handleSelectMultiplicidad}
                        />
                    </div>
                    <div className="col">
                        <label> Ingrese la Forma de Pago:</label>
                        <Select
                            options={tipoFormaPago}
                            onChange={handleSelectFormaPago}
                        />
                    </div>
                    <div className="col">
                        <label>Ingrese la Forma de Acceso SAP</label>    
                        <Select
                            options={tipoFormaAccesoSap}
                            onChange={handleSelectFormaAccesoSap}
                        />
                    </div>
                </div>

                <div className='row mt-3 '>
                    <div className="col">
                        <label> Ingrese la Archivo DNI:</label>
                        <br />
                        <input type="file" onChange={e => setFile(e.target.files[0])}/>
                        <button onClick={handleSubmitFileDNI}>Guardar Archivo</button>
                    </div>
                    
                    <div className="col">
                        <label> Ingrese el Archivo Voucher:</label>
                        <br />
                        <input type="file" onChange={e => setFile(e.target.files[0])}/>
                        <button onClick={handleSubmitFileVoucher}>Guardar Archivo</button>
                    </div>

                </div>
                <div className='row mt-3'>
                    <div className="col">
                        <label> Ingrese el Archivo Recivo:</label>
                        <br />
                        <input type="file" onChange={e => setFile(e.target.files[0])}/>
                        <button onClick={handleSubmitFileRecibo}>Guardar Archivo</button>
                    </div>
                    <div className="col">
                        <label> Ingrese el Archivo Terminos y Condiciones:</label>
                        <br />
                        <input type="file" onChange={e => setFile(e.target.files[0])}/>
                        <button onClick={handleSubmitFileTerminosCondiciones}>Guardar Archivo</button>
                    </div>
                </div>

                <div className='row justify-content-md-center'>
                    <div className="col col-lg-1">
                        <input type="submit" value="Registrar" className='btn btn-success btn-block mt-3'/>   
                    </div>
                </div>

            </form>  

            {
                error ?
                (
                    <div>
                        <p>{error}</p>
                    </div>
                )
                :
                (
                    <span></span>
                )
            }
        </div>
    );
}

export default Cliente;