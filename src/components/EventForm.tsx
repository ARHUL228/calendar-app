import React, { useEffect, useState } from 'react';
import { MyEvent } from '../types';

interface EventFormProps {
    onAddEvent: (title: string, start: Date, end: Date, color: string) => void;
    existingEvent: MyEvent | null;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent, existingEvent }) => {
    const [title, setTitle] = useState('');
    const [start, setStart] = useState<Date | null>(null);
    const [end, setEnd] = useState<Date | null>(null);
    const [color, setColor] = useState('');

    useEffect(() => {
        if (existingEvent) {
            setTitle(existingEvent.title);
            setStart(existingEvent.start);
            setEnd(existingEvent.end);
            setColor(existingEvent.color);
        } else {
            setTitle('');
            setStart(null);
            setEnd(null);
            setColor('');
        }
    }, [existingEvent]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (start && end) {
            onAddEvent(title, start, end, color);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Event Title"
                required
            />
            <input
                type="datetime-local"
                value={start ? start.toISOString().slice(0, 16) : ''}
                onChange={e => setStart(new Date(e.target.value))}
                required
            />
            <input
                type="datetime-local"
                value={end ? end.toISOString().slice(0, 16) : ''}
                onChange={e => setEnd(new Date(e.target.value))}
                required
            />
            <input
                type="color"
                value={color}
                onChange={e => setColor(e.target.value)}
                required
            />
            <button type="submit">Save Event</button>
        </form>
    );
};

export default EventForm;