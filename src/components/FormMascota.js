import React from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'

class FormMascota extends React.Component {
    constructor(props){
        super(props)
        this.state = {nombre: '',tipo:'',owner:'', errores: []}
        this.guardarMascota.bind(this)
    }
    validarFormulario() {
        let errores = []
        if (this.state.nombre && this.state.tipo && this.state.owner) {
            return true;
        }
        if(!this.state.nombre){
           errores.push({error:"Dene ingresar un nombre",key: "nombre"})
            this.setState({errores})
        }
        if(!this.state.tipo){
            errores.push({error:"Dene ingresar un nombre",key: "tipo"})
             this.setState({errores})
         }
         if(!this.state.owner){
            errores.push({error:"Dene ingresar un propietario",key: "propietario"})
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
    guardarMascota = (event) =>{
        console.log("guardando mascota");
        let me = this;
        event.preventDefault()
        let formValido = this.validarFormulario(event)
        if(formValido){
            axios.post('https://patriciocabrera-webpage.herokuapp.com/mascotas/mascota', {
                mode: 'no-cors',
                nombre: this.state.nombre,
                tipo: this.state.tipo,
                owner: this.state.owner
            })
            .then(function (response) {
                Swal.fire({
                    position: 'center',
                    type: 'success',
                    title: 'Mascota registrada exitosamente!',
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    me.limpiarFormulario();
                })
        
            })
            .catch(function (error) {
                console.log(error);
            });
        }
    }
    limpiarFormulario(){
        this.setState({
            nombre: '',
            tipo: '',
            owner: ''
        })
    }
    render(){
        //console.log("las props que llegaron aca son: ",this.props)
        let { propietarios } = this.props;
        let arrayPropietarios = []
        if(propietarios.length > 0){
            propietarios.map( (elem,i) =>{
                //console.log("el elemento es: ",elem)
                arrayPropietarios.push(
                    <option key={i} value = {elem._id}>{elem.nombre}</option>
                )
            })
        }else{
            arrayPropietarios.push(
                <option disabled> Sin propietarios</option>
            )
        }
        
        return(
         
                <div className="card">
                    <div className="card bg-success text-white">Agregar mascota</div>
                    <div className="card-body">
                        <form onSubmit = { e => this.guardarMascota(e)}>
                            <div className= "form-group">
                                <label>Nombre</label>
                                <input type="text" required className = "form-control" value = {this.state.nombre} onChange = { (e) => this.setState({nombre: e.target.value}) } />
                            </div>
                            <div className= "form-group">
                                <label>Tipo</label>
                                <input type="text" required className = "form-control" value = {this.state.tipo} onChange = { (e) => this.setState({tipo: e.target.value}) } />
                            </div>
                            <div className= "form-group">
                                <label>Propietario</label>
                                <select required className = "form-control" value = {this.state.owner} onChange = { (e) => this.setState({owner: e.target.value}) } >
                                    <option value = ''>Seleccione un opcion</option>
                                    {arrayPropietarios}
                                </select>
                            </div>
                            <div>
                                <button  type ="submit" className = "btn btn-success">Crear</button>
                            </div>
                        </form>
                    </div> 
                
                </div>
       
        
      
                 
         
        )
    }
}   

export default FormMascota