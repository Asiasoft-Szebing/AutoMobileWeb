function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

export const INITIAL_EVENTS = [
    {
        id: '00001',
        title: 'Garry - Car Maintenance',
        start: "2025-03-10" + 'T09:00:00',
        end: "2025-03-10" + 'T09:30:00',
        customer: 'Garry',
        service: ['Car Maintenance'],
        date: "03/14/2025 09:00 AM",
        employee: 'Felicia Jong',
        payment: 'Paid',
        status: 'Completed',
        color: getRandomColor()
    },
    {
        id: '00002',
        title: 'Mario - Oil Change',
        start: "2025-03-10" + 'T12:00:00',
        end: "2025-03-10" + 'T13:30:00',
        customer: 'Mario',
        service: ['Car Service'],
        date: "03/14/2025 12:00 PM",
        employee: 'Bob Lee',
        payment: 'Pending',
        status: 'Completed'
        , color: getRandomColor()
    },
    {
        id: '00003',
        title: 'Dickson - Oil Change',
        start: "2025-03-13" + 'T14:00:00',
        end: "2025-03-13" + 'T14:30:00',
        customer: 'Dickson',
        service: ['Oil Change'],
        date: "03/14/2025 14:00 PM",
        employee: 'Anna Wong',
        payment: 'Paid',
        status: 'Completed'
        , color: getRandomColor()
    },
    {
        id: '00004',
        title: 'Johnson - Car Wash',
        start: "2025-03-14" + 'T09:00:00',
        end: "2025-03-14" + 'T09:30:00'
        ,
        customer: 'Johnson',
        service: ['Car Wash'],
        date: "03/14/2025 09:00 AM",
        employee: 'Mike Tan',
        payment: 'Unpaid',
        status: 'Completed', color: getRandomColor()
    },
    {
        id: '00005',
        title: 'Mario - Car Service',
        start: "2025-03-14" + 'T11:00:00',
        end: "2025-03-14" + 'T12:00:00',
        customer: 'Mario',
        service: ['Car Service'],
        date: "03/14/2025 12:00 PM",
        employee: 'Bob Lee',
        payment: 'Pending',
        status: 'Completed'
        , color: getRandomColor()
    },
    {
        id: '00006',
        title: 'Dickson - Car Maintenance',
        start: "2025-03-14" + 'T12:00:00',
        end: "2025-03-14" + 'T13:00:00',
        customer: 'Dickson',
        service: ['Car Maintenance'],
        date: "03/14/2025 12:00 PM",
        employee: 'Felicia Jong',
        payment: 'Paid',
        status: 'Completed',
        color: getRandomColor()
        , color: getRandomColor()
    },
    {
        id: '00007',
        title: 'Kenny - Car Wash',
        start: "2025-03-14" + 'T13:00:00',
        end: "2025-03-14" + 'T13:30:00',
        customer: 'Kenny',
        service: ['Car Wash'],
        date: "03/14/2025 01:00 PM",
        employee: 'Mike Tan',
        payment: 'Unpaid',
        status: 'Completed', color: getRandomColor()
    },
    {
        id: '00008',
        title: 'Gary - Car Maintenance',
        start: "2025-03-14" + 'T16:00:00',
        end: "2025-03-14" + 'T17:30:00',
        customer: 'Gary',
        service: ['Car Maintenance'],
        date: "03/14/2025 16:00 AM",
        employee: 'Felicia Jong',
        payment: 'Paid',
        status: 'Completed',
        color: getRandomColor()
    },
]

export function createEventId() {
    return String(eventGuid++)
}