import React from 'react'
import ModalAgregaCliente from './modalAgregaCliente'
import axios from 'axios';
import Swal from 'sweetalert2'
import TablaPropietarios from './tablaPropietarios'
import FormMascota from './FormMascota'

class InfoCliente extends React.Component {
    constructor (props) {
       super(props); 
       this.state = {propietarios:[],nombre: '',apellido: '', email: '', errores: []};
       this.guardarCliente.bind(this)
       this.validarFormulario.bind(this)
       this.recargarPadre.bind(this)
    }

    listarCliente(){
        axios.get('http://localhost:3000/propietarios/propietario',{
            mode: 'no-cors'
        })
        .then(response => {
          console.log("la response es: ",response.data);
          this.setState({ propietarios: response.data.data });
        })
        .catch(error => {
          console.log(error);
        });
    }
    componentDidMount() {
        this.listarCliente();
    }
    limpiarFormulario(){
        this.setState({
            nombre: '',
            apellido: '',
            email: ''
        })
    }
    validarFormulario() {
        let errores = []
        if (this.state.nombre && this.state.apellido && this.state.email) {
            return true;
        }
        if(!this.state.nombre){
           errores.push({error:"Dene ingresar un nombre",key: "nombre"})
            this.setState({errores})
        }
        if(!this.state.apellido){
            errores.push({error:"Dene ingresar un nombre",key: "apellido"})
             this.setState({errores})
         }
         if(!this.state.email){
            errores.push({error:"Dene ingresar un email",key: "email"})
             this.setState({errores})
         }
        console.log("los errores son: ",errores)
        /*this.errors = [];

        if (!this.nombre) {
            this.errors.push('El nombre es obligatorio.');
        }
        if (!this.descripcion) {
            this.errors.push('Debe ingresar una descripción.');
        }*/

    
    }
    guardarCliente = (event) =>{
        console.log("guardando cliente");
        let me = this;
        event.preventDefault()
        let formValido = this.validarFormulario(event)
        if(formValido){
            axios.post('http://localhost:3000/propietarios/propietario', {
                mode: 'no-cors',
                nombre: this.state.nombre,
                apellido: this.state.apellido,
                email: this.state.email
            })
            .then(function (response) {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Categoria registrada exitosamente!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    me.setState({ errores: []})
                    me.listarCliente();
                    me.limpiarFormulario();
                })
        
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    recargarPadre(){
        this.listarCliente()
    }
    render () {
        //let id = this.state.nombre
        let {errores} = this.state
        let erroresForm = []
        if(errores.length > 0 ){
            errores.map(e => {

                erroresForm.push(
                    <li><b>{e.key}: </b>{e.error} </li>
                )
            })
        }

        return(
            <div>
                {
                    errores.length >0 ?
                    <div className = "row">
                        <div className = "col">
                            <div className = "alert alert-danger">
                                Ocurrio un error en el ingreso del propietario
                                <ul>
                                    {erroresForm}
                                </ul>  
                            </div>
                        </div>
                    </div>
                    :
                    <div className = "row">
                        <div className = "col">
                        
                        </div>
                    </div>

                }

          
                <div className = "row">
                    <div className = "col">
                        <div className="card">
                            <div className="card bg-primary text-white">Agregar dueño</div>
                            <div className="card-body">
                                <form onSubmit = { (e) => this.guardarCliente(e)}>
                                    <div className= "form-group">
                                        <label>Nombre</label>
                                        <input type="text" className = "form-control" value = {this.state.nombre} onChange = { (e) => this.setState({nombre: e.target.value}) } />
                                    </div>
                                    <div className= "form-group">
                                        <label>Apellido</label>
                                        <input type="text" className = "form-control" value = {this.state.apellido} onChange = { (e) => this.setState({apellido: e.target.value}) } />
                                    </div>
                                    <div className= "form-group">
                                        <label>Email</label>
                                        <input type="email" className = "form-control" value = {this.state.email} onChange = { (e) => this.setState({email: e.target.value}) } />
                                    </div>
                                    <div>
                                        <button  type ="submit" className = "btn btn-success">Crear</button>
                                    </div>
                                </form>
                            </div> 
                        
                        </div>
                        
                    </div>
                    <div className = "col">
                        <FormMascota propietarios = {this.state.propietarios} />
                    </div>
                   
                </div>
                <br></br>
               <div className = "row">
                    <div className = "col">
                        <TablaPropietarios recargar= {this.recargarPadre} propietarios = {this.state.propietarios}/>
                    </div>
               </div>
                
                    
            </div>
    
        )
    
    }
  }


export default InfoCliente