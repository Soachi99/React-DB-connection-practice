import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";


export default function Principal() {
    const baseUrl = "http://localhost:5049/api/datosprueba";
    const [data, setData] = useState([]);
    const [modalEditar, setModalEditar] = useState(false);
    const [modalAgregar, setModalAgregar] = useState(false);
    const [datoSeleccionado, setDatoSeleccionado] = useState({
        id: '',
        nombre: '',
        ocupacion: '',
        edad: ''
    })

    const handleChange = e => {
        const { name, value } = e.target;
        setDatoSeleccionado({
            ...datoSeleccionado, [name]: value
        });
    }

    const AbrirModalEditar = () => {
        setModalEditar(!modalEditar);
    }

    const AbrirModalAgregar = () => {
        setModalAgregar(!modalAgregar);
    }

    const seleccionarDato = (datos, caso) => {
        setDatoSeleccionado(datos);
        if (caso === "Editar") {
            AbrirModalEditar()
        }
        if (caso === "Eliminar") {
            AbrirModalEliminar();
        }

    }

    const peticionGet = async () => {
        await axios.get(baseUrl).then(response => setData(response.data)).catch(error => console.error(error));
    }

    const peticionPost = async () => {
        delete datoSeleccionado.id;
        datoSeleccionado.edad = parseInt(datoSeleccionado.edad);
        await axios.post(baseUrl, datoSeleccionado).then(response => {
            setData(data.concat(response.data))
            AbrirModalAgregar();
        }).catch(error => console.error(error));
    }

    const peticionPut = async () => {
        datoSeleccionado.edad = parseInt(datoSeleccionado.edad);
        await axios.put(baseUrl + "/" + datoSeleccionado.id, datoSeleccionado).then(response => {
            var respuesta = response.data;
            var dataAuxiliar = data;
            // eslint-disable-next-line array-callback-return
            dataAuxiliar.map(datos => {
                if (datos.id === datoSeleccionado.id) {
                    datos.nombre = respuesta.nombre;
                    datos.ocupacion = respuesta.ocupacion;
                    datos.edad = respuesta.edad;
                }
            })
            AbrirModalEditar();
        }).catch(error => console.error(error));
    }

    const peticionDelete = async () => {
        await axios.delete(baseUrl + "/" + datoSeleccionado.id).then(response => {
            setData(data.filter(datos => datos.id !== response.data))
            Swal.fire('Registro borrado correctamente', '', 'success')
        }).catch(error => console.error(error));
    }

    const AbrirModalEliminar = () => {
        var id = datoSeleccionado && datoSeleccionado.id
        Swal.fire({
            title: '¿Estas seguro que quieres eliminar el registro ' + id + ' ?',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
        }).then((result) => {
            if (result.isConfirmed) {
                peticionDelete();
            }
        })
    }


    useEffect(() => { peticionGet(); }, []);

    return (
        <div>
            <h1 className="mt-3 ms-4"> DATOS DE PRACTICA </h1>
            <div className="Tabla" style={{ textAlign: 'center' }}>
                <table className="table table-bordered border border-dark shadow mt-5" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#ID</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Ocupación</th>
                            <th scope="col">Edad</th>
                            <th scope="col">Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map(datos => (
                            <tr key={datos.id}>
                                <th scope="row">{datos.id}</th>
                                <td>{datos.nombre}</td>
                                <td>{datos.ocupacion}</td>
                                <td>{datos.edad}</td>
                                <td>
                                    <Button variant="primary" onClick={() => seleccionarDato(datos, "Editar")}>Editar</Button>
                                    <Button className="ms-3" variant="danger" key={"Button_" + datos.id} onClick={() => seleccionarDato(datos, "Eliminar")}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
                <Button className="d-block mx-auto mt-5" variant="primary" onClick={() => AbrirModalAgregar()}>Agregar Registro</Button>
            </div>

            <Modal isOpen={modalAgregar}>
                <ModalHeader>Agregar nuevo item a la base de datos</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" name="nombre" onChange={handleChange} />
                            <br />
                            <Form.Label>Ocupación</Form.Label>
                            <Form.Control type="text" placeholder="Ocupación" name="ocupacion" onChange={handleChange} />
                            <br />
                            <Form.Label>Edad</Form.Label>
                            <Form.Control type="number" placeholder="Edad" name="edad" onChange={handleChange} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => peticionPost()} >Agregar</Button>
                    <Button className="ms-3" onClick={() => AbrirModalAgregar()} variant="danger">Cancelar</Button>
                </ModalFooter>
            </Modal>

            <Modal isOpen={modalEditar}>
                <ModalHeader>Editar item de la base de datos</ModalHeader>
                <ModalBody>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" name="id" readOnly value={datoSeleccionado && datoSeleccionado.id} />
                            <br />
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control type="text" placeholder="Nombre" name="nombre" onChange={handleChange} value={datoSeleccionado && datoSeleccionado.nombre} />
                            <br />
                            <Form.Label>Ocupación</Form.Label>
                            <Form.Control type="text" placeholder="Ocupación" name="ocupacion" onChange={handleChange} value={datoSeleccionado && datoSeleccionado.ocupacion} />
                            <br />
                            <Form.Label>Edad</Form.Label>
                            <Form.Control type="number" placeholder="Edad" name="edad" onChange={handleChange} value={datoSeleccionado && datoSeleccionado.edad} />
                        </Form.Group>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button variant="primary" onClick={() => peticionPut()} >Agregar</Button>
                    <Button className="ms-3" onClick={() => AbrirModalEditar()} variant="danger">Cancelar</Button>
                </ModalFooter>
            </Modal>


        </div>);
}

