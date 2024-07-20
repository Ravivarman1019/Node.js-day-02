import { ro } from 'date-fns/locale';
import { createRoom, getRooms } from '../Controllers/room.controller.js';
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
  res.json(getRooms());
});

router.post('/', (req, res) => {
  const { numberOfSeats, amenities, pricePerHour } = req.body;
  const newRoom = createRoom(numberOfSeats, amenities, pricePerHour);
  res.json(newRoom);
});
router.post('/bookings', (req, res) => {
  const { customerName, date, startTime, endTime, roomId } = req.body;
  const booking = createBooking(customerName, date, startTime, endTime, roomId);
  res.json(booking);
});
router.get('/bookings', (req, res) => {
  res.json(getBookings());
});
router.get('/customers', (req, res) => {
  res.json(getCustomersWithBookings());
});
router.get('/customers/:customerName/bookings', (req, res) => {
  const { customerName } = req.params;
  res.json(getCustomerBookings(customerName));
});
router.get('/customers/bookings', (req, res) => {
  res.json(getCustomersWithBookings());
});
router.get('/customers/bookings/:customerName', (req, res) => {
  const { customerName } = req.params;
  res.json(getCustomerBookings(customerName));
});
router.get('/customers/bookings/:customerName/rooms', (req, res) => {
  const { customerName } = req.params;
  res.json(getCustomerRoomBookings(customerName));
});


export default router;
