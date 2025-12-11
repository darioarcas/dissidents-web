import React, { useEffect, useRef, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal, uiOpenModal } from '../../../actions/ui';
import { eventAddNew } from '../../../actions/events';

const now = moment().minutes(0).seconds(0).add(1, "hours");
const now2 = moment().minutes(0).seconds(0).add(2, "hours");

export const CalendarModal = () => {
    const {modalOpen} = useSelector(state => state.ui);
    const dispatch = useDispatch();
    // Estado para las fechas y horas de inicio y fin
    const [startDate, setStartDate] = useState(now.format('YYYY-MM-DD'));
    const [startTime, setStartTime] = useState(now.format('HH:mm'));
    const [endDate, setEndDate] = useState(now.format('YYYY-MM-DD'));
    const [endTime, setEndTime] = useState(now2.format('HH:mm'));
    const modalRef = useRef(null);  // Usamos un ref para referenciar el modal
    const modalInstanceRef = useRef(null);  // Usamos un ref para mantener la instancia del modal





    // Escuchamos cuando el MODAL esta abierto o cerrado
    useEffect(() => {
        const modalElement = modalRef.current;
    
        // Crear la instancia del modal solo una vez
        if (modalElement && !modalInstanceRef.current) {
          modalInstanceRef.current = new window.bootstrap.Modal(modalElement);
    
          // Usamos los eventos de la instancia del modal
          modalInstanceRef.current
            ._element.addEventListener('show.bs.modal', () => {
            //   console.log('El modal está abriéndose...');
            });
    
          modalInstanceRef.current
            ._element.addEventListener('shown.bs.modal', () => {
            //   console.log('El modal está completamente abierto');
            dispatch(uiOpenModal());
            });
    
          modalInstanceRef.current
            ._element.addEventListener('hide.bs.modal', () => {
            //   console.log('El modal está cerrándose...');
            });
    
          modalInstanceRef.current
            ._element.addEventListener('hidden.bs.modal', () => {
            //   console.log('El modal está completamente cerrado');
            dispatch(uiCloseModal());
            });
        }
    
        return () => {
          // Limpiar los listeners cuando el componente se desmonte
          if (modalInstanceRef.current) {
            modalInstanceRef.current._element.removeEventListener('show.bs.modal', () => {});
            modalInstanceRef.current._element.removeEventListener('shown.bs.modal', () => {});
            modalInstanceRef.current._element.removeEventListener('hide.bs.modal', () => {});
            modalInstanceRef.current._element.removeEventListener('hidden.bs.modal', () => {});
          }
        };
      }, []); // Ejecutar solo una vez al montar el componente



    // Funcion para cerrar el MODAL
    const handleClose = () => {
        // Aquí obtenemos la instancia del modal y lo cerramos
        const modalElement = modalRef.current;
        if (window.bootstrap && window.bootstrap.Modal) {
            // dispatch(uiCloseModal());
          const modalInstance = window.bootstrap.Modal.getInstance(modalElement); // Usamos getInstance
          modalInstance.hide();  // Cierra el modal
        }
      };


    const [formValues, setFormValues] = useState({
        id: new Date().getTime(),
        title: "Nombre evento",
        start: now.format('YYYY-MM-DD'),
        startTime: now.format('HH:mm'),
        end: now.format('YYYY-MM-DD'),
        endTime: now2.format('HH:mm'),
        notes: "",
        alumn1: "",
        alumn2: "",
        alumn3: "",
        alumn4: "",
        alumn5: "",
        alumn6: "",
        alumn7: "",
        prof: "",
        course: "",
        user:{
            _id: 123,
            name: "Usuario",
        }

    });

    const {title, notes, alumn1, alumn2, alumn3, alumn4, alumn5, alumn6, alumn7, prof, course} = formValues;

    // Actualiza la fecha y hora de inicio
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
        setEndDate(e.target.value);
        setFormValues({
            ...formValues,
            start: e.target.value
        });
    }

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
        setFormValues({
            ...formValues,
            startTime: e.target.value
        });
    }

    // Actualiza la fecha y hora de fin
    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        setFormValues({
            ...formValues,
            end: e.target.value
        });
    }

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
        setFormValues({
            ...formValues,
            endTime: e.target.value
        });
    }

    // Función para obtener la fecha y hora completa en formato Date
    const getStartDateTime = () => {
        return moment(`${startDate} ${startTime}`, 'YYYY-MM-DD HH:mm').toDate();
    }

    const getEndDateTime = () => {
        return moment(`${endDate} ${endTime}`, 'YYYY-MM-DD HH:mm').toDate();
    }


    const handleInputChange = ({target})=>{
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }


    const handleFormSubmit = (e)=>{
        e.preventDefault();
        dispatch(eventAddNew(formValues));
    }

    return (
        <>
            {/* Button trigger modal */}
            {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Abrir Modal
            </button> */}

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" ref={modalRef}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-black text-center" id="exampleModalLabel">Nuevo evento</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        <form style={{ width: "90%", margin: "0 auto" }} onSubmit={handleFormSubmit}>

                            <div className="form-group mb-2">
                                <label>Fecha y hora inicio</label>
                                <section className='d-flex'>
                                    {/* Input de fecha de inicio */}
                                    <input
                                        type='date'
                                        onChange={handleStartDateChange}
                                        value={startDate}
                                        className="form-control w-50"
                                    />
                                    {/* Input de hora de inicio */}
                                    <input
                                        type='time'
                                        onChange={handleStartTimeChange}
                                        value={startTime}
                                        className="form-control w-50"
                                    />
                                </section>
                            </div>

                            <div className="form-group mb-2">
                                <label>Fecha y hora fin</label>
                                <section className='d-flex'>
                                    {/* Input de fecha de fin */}
                                    <input
                                        type='date'
                                        min={startDate}
                                        onChange={handleEndDateChange}
                                        value={endDate}
                                        className="form-control w-50"
                                    />
                                    {/* Input de hora de fin */}
                                    <input
                                        type='time'
                                        onChange={handleEndTimeChange}
                                        value={endTime}
                                        className="form-control w-50"
                                    />
                                </section>
                            </div>

                            <hr />

                            <div className="form-group mb-2">
                                <label className=' w-100'>Curso
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="course"
                                        onChange={handleInputChange}
                                        value={course}
                                    />
                                </label>
                            </div>

                            <hr/>

                            <div className="form-group mb-2">
                                <label className=' w-100'>Profesor
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="prof"
                                        onChange={handleInputChange}
                                        value={prof}
                                    />
                                </label>
                            </div>

                            <hr/>

                            <div className="form-group mb-2 d-flex">
                                <label>Alumno 1
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="alumn1"
                                        onChange={handleInputChange}
                                        value={alumn1}
                                    />
                                </label>
                                <label>Alumno 2
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="alumn2"
                                        onChange={handleInputChange}
                                        value={alumn2}
                                    />
                                </label>
                            </div>
                            <div className="form-group mb-2 d-flex">
                                <label>Alumno 3
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="alumn3"
                                        onChange={handleInputChange}
                                        value={alumn3}
                                    />
                                </label>
                                <label>Alumno 4
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="alumn4"
                                        onChange={handleInputChange}
                                        value={alumn4}
                                    />
                                </label>
                            </div>
                            <div className="form-group mb-2 d-flex">
                                <label>Alumno 5
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="alumn5"
                                        onChange={handleInputChange}
                                        value={alumn5}
                                    />
                                </label>
                                <label>Alumno 6
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="alumn6"
                                        onChange={handleInputChange}
                                        value={alumn6}
                                    />
                                </label>
                            </div>
                            <div className="form-group mb-2 d-flex">
                                <label>Alumno 7
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="alumn7"
                                        onChange={handleInputChange}
                                        value={alumn7}
                                    />
                                </label>
                            </div>


                            
                            <hr />

                            <div className="form-group mb-2">
                                <label>Titulo y notas</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Título del evento"
                                    name="title"
                                    autoComplete="off"
                                    onChange={handleInputChange}
                                    value={title}
                                />
                                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                            </div>

                            <div className="form-group mb-2">
                                <textarea
                                    type="text"
                                    className="form-control"
                                    placeholder="Notas"
                                    rows="5"
                                    name="notes"
                                    onChange={handleInputChange}
                                        value={notes}
                                ></textarea>
                                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-outline-primary btn-block mb-4 w-100"
                                onClick={handleClose}
                            >
                                <i className="far fa-save"></i>
                                <span> Guardar</span>
                            </button>

                        </form>

                        {/* <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    )
}

