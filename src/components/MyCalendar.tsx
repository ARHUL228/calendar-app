import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment'; // Import moment here
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface MyEvent {
    id: number;
    title: string;
    start: Date;
    end: Date;
    color: string;
}

interface MyCalendarProps {
    events: MyEvent[];
    onEventClick: (event: MyEvent) => void;
    onDeleteEvent: (id: number) => void;
    onEventDrop: (updatedEvent: MyEvent) => void;
    onEventResize: (updatedEvent: MyEvent) => void;
    onAddEvent: (title: string, start: Date, end: Date, color: string) => void;
}

const MyCalendar: React.FC<MyCalendarProps> = ({
    events,
    onEventClick,
    onDeleteEvent,
    onEventDrop,
    onEventResize,
    onAddEvent
}) => {
    const [selectedEvent, setSelectedEvent] = React.useState<MyEvent | null>(null);

    const handleSelectEvent = (event: MyEvent) => {
        setSelectedEvent(event);
        onEventClick(event);
    };

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={handleSelectEvent}
                onEventDrop={onEventDrop}
                onEventResize={onEventResize}
                selectable
                onSelectSlot={(slotInfo: { start: Date; end: Date; slots: Date[] }) => {
                    const title = window.prompt('New Event name');
                    if (title) {
                        onAddEvent(title, slotInfo.start, slotInfo.end, '#f0f0f0');
                    }
                }}
            />
            {selectedEvent && (
                <button onClick={() => onDeleteEvent(selectedEvent.id)}>Delete Event</button>
            )}
        </div>
    );
};

export default MyCalendar;