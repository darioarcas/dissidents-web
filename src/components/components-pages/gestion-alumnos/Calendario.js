import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import { messages } from '../../helpers/idiomaCalendario';
import { CalendarioEventos } from './calendario/CalendarioEventos';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendario.css';
import "moment/locale/es";
import { CalendarModal } from './CalendarModal';
import { useDispatch, useSelector } from 'react-redux';
import { uiOpenModal } from '../../../actions/ui';
import { eventSetActive } from '../../../actions/events';
import AddNewFab from '../../../ui/AddNewFab';

moment.locale("es");
const localizer = momentLocalizer(moment);

const DnDCalendar = withDragAndDrop(Calendar);  // HOC para drag-and-drop

export const Calendario = () => {
  const { modalOpen } = useSelector(state => state.ui);
  const { events } = useSelector(state => state.calendar);
  const dispatch = useDispatch();

  const [lastView, setLastView] = useState(localStorage.getItem("lastView") || "month");
  const [myEvents, setMyEvents] = useState(events);
  const eventoAnt = useRef(events);

  useEffect(() => {
    if (modalOpen === true) {
      openModalNow();
    }
  }, [modalOpen]);

  useEffect(() => {
    if (eventoAnt.current !== events) {
      setMyEvents(events);
      eventoAnt.current = events;
    }
  }, [events]);

  // Abrir el MODAL
  const openModalNow = () => {
    const modalElement = document.getElementById('exampleModal');
    if (modalElement) {
      const modalInstance = new window.bootstrap.Modal(modalElement);
      modalInstance.show();
    }
  };

  const onDoubleClick = (e) => {
    dispatch(uiOpenModal());
  };

  const onSelectEvent = (e) => {
    dispatch(uiOpenModal());
    dispatch(eventSetActive(e));
  };

  const onViewChange = (e) => {
    setLastView(e);
    localStorage.setItem("lastView", e);
  };

  const eventStyleGetter = (event, start, end, isSelected) => {
    const style = {
      backgroundColor: "#367CF7",
      borderRadius: "5px",
      opacity: .9,
      display: "block",
      color: "white"
    };
    return {
      style
    };
  };

  // Mover evento (drag and drop)
  const moveEvent = useCallback(
    ({ event, start, end, isAllDay: droppedOnAllDaySlot = false }) => {
      const { allDay } = event;
      if (!allDay && droppedOnAllDaySlot) {
        event.allDay = true;
      }
      if (allDay && !droppedOnAllDaySlot) {
        event.allDay = false;
      }

      setMyEvents((prev) => {
        const updatedEvents = prev.map((ev) =>
          ev.id === event.id ? { ...ev, start, end, allDay: event.allDay } : ev
        );
        return updatedEvents;
      });
    },
    []
  );

  // Redimensionar evento
  const resizeEvent = useCallback(
    ({ event, start, end }) => {
      console.log('Evento redimensionado:', event, start, end);

      setMyEvents((prev) => {
        const updatedEvents = prev.map((ev) =>
          ev.id === event.id ? { ...ev, start, end } : ev
        );
        return updatedEvents;
      });
    },
    []
  );

  return (
    <>
      <div className="height600 calendar-screen" style={{ marginTop: "55px", backgroundColor: "white" }}>
        <DnDCalendar
          draggableAccessor={(event) => true}  // Asegurarse de que el evento se puede arrastrar
          localizer={localizer}
          events={myEvents}
          messages={messages}
          eventPropGetter={eventStyleGetter}
          onSelectEvent={onSelectEvent}
          onDoubleClickEvent={onDoubleClick}
          onView={onViewChange}
          view={lastView}
          components={{
            event: CalendarioEventos,
          }}
          onEventDrop={moveEvent}  // Asegurarse de que esta función maneja el drag-and-drop
          onEventResize={resizeEvent}  // Asegurarse de que esta función maneja el redimensionamiento
          popup
          resizable  // Habilitar el redimensionamiento
        />
        <AddNewFab />
        <CalendarModal />
      </div>
    </>
  );
};
