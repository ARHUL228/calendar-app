import React, { useState } from 'react';
import MyCalendar from './components/MyCalendar';
import EventForm from './components/EventForm';
import { MyEvent } from './types';

const App: React.FC = () => {
    const [events, setEvents] = useState<MyEvent[]>([]);
    const [editingEvent, setEditingEvent] = useState<MyEvent | null>(null);

    const handleAddEvent = (title: string, start: Date, end: Date, color: string) => {
        const newEvent: MyEvent = {
            id: events.length + 1, // Or use a better ID generation strategy
            title,
            start,
            end,
            color,
        };
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    const handleDeleteEvent = (id: number) => {
        setEvents(prevEvents => prevEvents.filter(event => event.id !== id));
    };

    const handleEventClick = (event: MyEvent) => {
        setEditingEvent(event);
    };

    return (
        <div>
            <h1>Event Calendar</h1>
            <EventForm onAddEvent={handleAddEvent} existingEvent={editingEvent} />
            <MyCalendar
                events={events}
                onEventClick={handleEventClick}
                onDeleteEvent={handleDeleteEvent}
                onEventDrop={(updatedEvent) => setEvents(prev => prev.map(event => (event.id === updatedEvent.id ? updatedEvent : event)))}
                onEventResize={(updatedEvent) => setEvents(prev => prev.map(event => (event.id === updatedEvent.id ? updatedEvent : event)))}
                onAddEvent={handleAddEvent}
            />
        </div>
    );
};

export default App;