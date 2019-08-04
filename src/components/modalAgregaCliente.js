import React from 'react'
//componente funcional



const ModalAgregaCliente = () =>(
<div>
  <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
    Agregar Dueño
  </button>
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
              <input type= "text" class = "form-control"></input>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>

  <table className = "table table-bordered table-hover">
    <thead>
      <th>Nombre</th>
      <th>Apellido</th>
    </thead>
    <tbody>
      <td>sadasd</td>
      <td>asdasd</td>
    </tbody>
  </table>
</div>

)
export default ModalAgregaCliente