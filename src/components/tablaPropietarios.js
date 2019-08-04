import React from 'react'
import Swal from 'sweetalert2'
import axios from 'axios'

class TablaPropietario extends React.Component {
    constructor(props){
        super(props)
        this.state = {mascotas: []}
        //this.eliminarPropietario.bind(this)
    }
    //acccion  para eliminar un usuario
    eliminarPropietario(propietario,event){
        event.preventDefault();
        let me = this.props;
        
        Swal.fire({
            title: `Está seguro de eliminar al propietario ${propietario.nombre}?`,
            text: "No podrá revertir esta acción!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            cancelButtonText: 'cancelar',
            confirmButtonText: 'Si, eliminar'
          }).then((result,me) => {
            //console.log("el mees es: ",this.props)    
            let ctm = this
            if (result.value) {
                axios.delete(`https://patriciocabrera-webpage.herokuapp.com/propietarios/propietario/${propietario._id}`)
                .then(function (response) {
                    Swal.fire({
                        position: 'center',
                        type: 'success',
                        title: 'Propuetario borrado exitosamente!',
                        showConfirmButton: false,
                        timer: 1500
                    }).then((me) => {
                        window.location.reload()
                    })
            
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
          })
    }
    verMascotas(propietario,event){
        event.preventDefault();
        let me = this
        axios.get(`https://patriciocabrera-webpage.herokuapp.com/propietarios/propietario/${propietario._id}`)
        .then(function (response) {
            //console.log("tiene mascotas: ",response.data.propietarioMascota);
            me.setState({mascotas: response.data.propietarioMascota})
    
        })
        .catch(function (error) {
            console.log(error);
        });
       
    }
    render(){
        //console.log("las props que llegaron aca son: ",this.props)
        let { propietarios } = this.props;
        let bodyTareas = []
        if(propietarios.length > 0){
            propietarios.map( (elem,i) =>{
                //console.log("el elemento es: ",elem)
                bodyTareas.push(
                 <tr key = {i}>
                     <td>{elem.nombre}</td>
                     <td>{elem.apellido}</td>
                     <td>{elem.email}</td>
                     <td>
                        <button onClick = { e =>  this.verMascotas(elem,e)}  type="button" className="btn btn-success" data-toggle="modal" data-target="#exampleModal">
                            <span className = "fa fa-search-plus"></span>
                        </button>    
                        <button onClick = { e =>  this.eliminarPropietario(elem,e)}  className="btn btn-danger">
                            <span className = "fa fa-times"></span>
                        </button>
                 
                     </td>
                 </tr>
    
                )
            })
        }
        let {mascotas} = this.state
        let arrayMascota = []
        if(mascotas.length > 0){
            mascotas.map( (elem,i) => {
                arrayMascota.push(
                    <div className = "alert alert-success" key = {i}>
                        <div className = "form-group">
                            <label>Nombre: <b>{elem.nombre}</b></label>
                        </div>
                        <div className = "form-group">
                            <label>Tipo: <b>{elem.tipo}</b></label>
                        </div>
                    </div>
                )
            })
        }else{
            arrayMascota.push(
                <div className = "alert alert-danger">
                    Propietario sin mascotas
                </div>
            )
        }
        return(
                <div className = "card">   
                    
                    {this.props.propietarios.length > 0 ?
                    <div className = "table-responsive">
                        <table className = "table table-warning table-sm table-hover table-bordered table-condensed">
                            <thead className = "thead-dark">
                                <tr>
                                    <th>Nombre</th>
                                    <th>Apellido</th>
                                    <th>Email</th>
                                    <th>Accion</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bodyTareas}
                            </tbody>
                        </table>
                    </div>
                    :
                    <div className = "alert alert-danger">
                        No hay registro de propietarios de mascotas aun
                    </div>
                }
             
              

                <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Mascotas del usuario</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {arrayMascota}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-info" data-dismiss="modal">Cerrar</button>
                    </div>
                    </div>
                </div>
                </div>
             
            </div>
        )
    }
}   

export default TablaPropietario