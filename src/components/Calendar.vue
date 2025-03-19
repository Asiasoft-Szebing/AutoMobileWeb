<script>
import { defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS } from './event-utils'

export default defineComponent({
  components: {
    FullCalendar,
  },
  data() {
    return {
      showEventModal: false,
      selectedEvent: null,
      calendarOptions: {
        customButtons: {
          myTitle: {
            text: 'Upcoming Appointment',
            click: () => false, // Cannot be clicked
          },
        },
        plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
        headerToolbar: {
          left: 'myTitle',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        },
        initialView: 'timeGridWeek',
        allDaySlot: false,
        businessHours: {
          startTime: '09:00',
          endTime: '18:00',
        },
        editable: false,
        selectable: true,
        weekends: false,
        eventsSet: this.handleEvents,
        slotDuration: '01:00',
        slotMinTime: '09:00',
        slotMaxTime: '18:00',
        slotLabelFormat: {
          hour: '2-digit',
          minute: '2-digit',
          hour12: true, // Set to true for AM/PM format
        },
        timeZone: 'local',
        height: '100%', // Fit container height
        contentHeight: 'auto', // Adjust height dynamically
        expandRows: true, // Ensures even row distribution
        initialEvents: INITIAL_EVENTS,
        eventClick: this.handleEventClick,
      },

    }
  }, methods: {
    handleEventClick(clickInfo) {
      this.showEventModal = true;
      this.selectedEvent = {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        customer: clickInfo.event.extendedProps.customer,
        service: clickInfo.event.extendedProps.service.join(', '),
        start: clickInfo.event.start,
        end: clickInfo.event.end,
        employee: clickInfo.event.extendedProps.employee,
        payment: clickInfo.event.extendedProps.payment,
        status: clickInfo.event.extendedProps.status
      };
      clickInfo.jsEvent.preventDefault();
    },
    closeModal() {
      this.showEventModal = false
      this.selectedEvent = null
    },
    viewDetails(selectedEvent) {
      try {
        console.log(selectedEvent);
      if (!this.selectedEvent?.id) {
        console.warn('ID not exist');
        return;
      }
      console.log('Error', this.selectedEvent.id);
      this.$router.push({
        name: 'AppointmentDetails',
        query: { id: this.selectedEvent.id }
      });
      this.closeModal();
    } catch (error) {
      console.error('ERROR:', error);
      alert('Please try again');
    }
  }
  }
  })
</script>


<template>
  <FullCalendar :options="calendarOptions">
    <template v-slot:eventContent='arg'>
      <b class="mr-2">{{ arg.timeText }} </b>
      <i>{{ arg.event.title }}</i>
    </template>
  </FullCalendar>

  <div v-if="showEventModal" class="modal-mask">
    <div class="modal-container">
      <div class="modal-header">
        <h3>Appointment Details</h3>
        <button @click="closeModal" class="close-button">&times;</button>
      </div>

      <div class="modal-content" v-if="selectedEvent">
        <div class="detail-row">
          <label>Customer:</label>
          <p>{{ selectedEvent.customer }}</p>
        </div>
        <div class="detail-row">
          <label>Service:</label>
          <p>{{ selectedEvent.service }}</p>
        </div>
        <div class="detail-row">
          <label>Time:</label>
          <p>{{ selectedEvent.start.toLocaleString() }} - {{ selectedEvent.end.toLocaleString() }}</p>
        </div>
        <div class="detail-row">
          <label>Employee:</label>
          <p>{{ selectedEvent.employee }}</p>
        </div>
        <div class="detail-row">
          <label>Status:</label>
          <span :class="['status-badge', selectedEvent.status.toLowerCase()]">
            {{ selectedEvent.status }}
          </span>
        </div>
        <div class="detail-row">
          <label>Payment:</label>
          <span :class="['payment-badge', selectedEvent.payment.toLowerCase()]">
            {{ selectedEvent.payment }}
          </span>
        </div>
      </div>

      <div class="modal-footer">
        <div class="flex items-center gap-2 justify-end ">
          <button @click="viewDetails(selectedEvent)"
            class="rounded-lg px-4 py-2 text-sm font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700">View
            Details</button>
          <button @click="closeModal"
            class="rounded-lg px-4 py-2 text-sm font-medium transition-colors border border-red-600 text-red-600 hover:bg-red-300 ">Close</button>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
/* Ensure calendar fills available space */
.fc {
  max-height: 100%;
  /* Avoid overflow */
  max-width: 100%;
}

/* Remove unnecessary scrollbar */
.fc-scroller {
  overflow: hidden !important;
}

.fc-toolbar-chunk .fc-myTitle-button {
  background: none !important;
  /* Remove background */
  border: none !important;
  /* Remove border */
  box-shadow: none !important;
  /* Remove shadow */
  font-size: 20px;
  /* Adjust text size */
  font-weight: bold;
  /* Make text bold */
  color: #333;
  /* Change text color */
  cursor: default !important;
  padding: 0;
  /* Remove padding */
  pointer-events: none !important;
  /* Fully disable clicking */
}

/* Right toolbar button group*/
.fc-toolbar-chunk .fc-button-group {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
}

.fc-toolbar-chunk .fc-button-group .fc-button {
  background: white;
  color: black;
  border: none;
  padding: 5px 10px;
}

.fc-toolbar-chunk .fc-button-group .fc-button:hover {
  background: #007bff;
  color: white;
}

.fc-toolbar-chunk .fc-button-group .fc-button-active {
  background: #007bff;
  color: white;
}


/* Adjust header spacing for a cleaner look */
.fc-toolbar {
  margin-bottom: 10px;
}

.fc-col-header-cell {
  font-weight: bold;
  font-size: 14px;
  color: #333;
  text-transform: uppercase;
}

/* Reduce space between rows */
.fc-timegrid-slot-label {
  padding: 2px 5px !important;
}

/* Reduce blank space between time slots */
.fc-timegrid-slot {
  height: 80px !important;
  /* Adjust slot height */
}

/* Remove unnecessary scroll and auto-fit content */
.fc-timegrid-container {
  height: auto !important;
  overflow: hidden !important;
}

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-container {
  background: white;
  border-radius: 8px;
  width: 500px;
  max-width: 90%;
  height: 500px;
  max-height: 100vh;
  overflow-y: auto;
  padding: 20px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.modal-header h3 {
  margin: 0;
  font-size: 1.5rem;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 8px;
}

.detail-row {
  margin-bottom: 15px;
}

.detail-row label {
  display: block;
  font-weight: 600;
  color: #666;
  margin-bottom: 5px;
}

.detail-row p {
  margin: 0;
  color: #333;
}

.modal-footer {
  border-top: 1px solid #eee;
  padding-top: 15px;
  margin-top: 20px;
  text-align: right;
}
</style>