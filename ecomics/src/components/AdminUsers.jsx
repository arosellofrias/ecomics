import Axios from 'axios'
import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import MaterialTable from 'material-table'
import styles from './compStyles/adminUsers.module.css'
import Swal from 'sweetalert2'
import axios from 'axios'


const AdminUsers = () => {
    const [users, setUsers] = useState([])
    const [cambios, setCambios] = useState({})
    const [eliminado, setEliminado] = useState(0)
    const user = JSON.parse(localStorage.getItem("user"))
    const userId = user.id

    useEffect(() => {
        Axios.get(`http://localhost:3001/api/admin/users/${userId}`)
            .then(res => setUsers(res.data))
    },[cambios, eliminado])

    const handleAdmin = (userId, privilegios) => {
        Swal.fire({
            title: "¿Seguro del cambio?",
            text: "Cambiarás el estado Admin del usuario",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, cambialo",
          })
          .then((result)=> {
              if (result.isConfirmed){
                axios.put("http://localhost:3001/api/admin/users", 
                {
                    userId : userId,
                    privilegios: privilegios
                }).then(res => setCambios(res.data))
              }
          })
          .then((data) => {
            Swal.fire("Cambiado", "Cambio de estado correcto", "success");
          })
    }
    console.log(cambios)
    const handleDelete = (id) => {
        Swal.fire({
            title: "¿Seguro quieres eliminar permanentemente?",
            text: "Eliminarás definitivamente al usuario",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, eliminalo",
          })
        .then((result)=>{
            if (result.isConfirmed){
                axios.delete(`http://localhost:3001/api/admin/users/${userId}`,
                {data: {
                    userId: id
                }}).then(res => setCambios(res))
            }
        })
        .then(data => {
            Swal.fire("Eliminado", "El usuario fue eliminado correctamente", "success");
        })
    }

    // ID NOMBRE APELLIDO EMAIL PRIVILEGIOS
    const columns = [
        {
            title: "Id",
            field: "id"
        },
        {
            title: "Nombre",
            field: "nombre"
        },
        {
            title: "Apellido",
            field: "apellido"
        },
        {
            title: "Email",
            field: "email"
        },
        {
            title: "ADMIN",
            field: "privilegios",
        }
    ]
 

    return(
        <div>
        {user && user.privilegios === true ?
            <div className={styles.table}>
            <MaterialTable
                columns= {columns}
                data={users}
                actions={[
                    {
                        icon: 'c',
                        tooltip: "Cambiar estado ADMIN",
                        onClick: (event, rowData) => {handleAdmin(rowData.id, rowData.privilegios)}
                    },
                    {
                        icon: 'e',
                        tooltip: "eliminar usuario",
                        onClick: (event, rowData) => {handleDelete(rowData.id)}
                    }
                ]}
                options={{
                    actionsColumnIndex: -1
                }}
                localization={{
                    header:{
                        actions: 'Cambiar/Eliminar'
                    }   
                }}
                
            />
            </div>
            :
            <div>
                 <h1>You shall not pass.</h1>
                 <img src="https://media1.giphy.com/media/YkfhemFXalh7O/giphy.gif?cid=790b7611ea781e4c2093f9763f595210ca323b2befef5596&rid=giphy.gif&ct=g" alt="Necesitas ser admin" />
                <Link to={"/comics"} ><h1>Volver al Home</h1></Link>

            </div>
            }

           </div>
    )
}

export default AdminUsers