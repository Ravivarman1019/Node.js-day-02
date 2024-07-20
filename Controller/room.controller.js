let rooms = [
    { id: 1, numberOfSeats: 7, amenities: ["TV", "WiFi"], pricePerHour: 2000 },
    { id: 2, numberOfSeats: 5, amenities: ["TV", "Projector"], pricePerHour: 1500 },
    { id: 3, numberOfSeats: 10, amenities: ["TV", "WiFi", "Projector"], pricePerHour: 2500 },
    { id: 4, numberOfSeats: 8, amenities: ["TV", "WiFi"], pricePerHour: 1800 },
    { id: 5, numberOfSeats: 6, amenities: ["TV"], pricePerHour: 1200 }
    
];

const createRoom = (numberOfSeats, amenities, pricePerHour) => {
  const room = {
    id: rooms.length + 1,
    numberOfSeats,
    amenities,
    pricePerHour
  };
  rooms.push(room);
  return room;
};

const getRooms = () => {
  return rooms;
};
app.post('/bookings', (req, res) => {
    const { customerName, date, startTime, endTime, roomId } = req.body;
  
    // Check if room is already booked for the given date and time
    const isBooked = bookings.some(
      (booking) =>
        booking.roomId === roomId &&
        booking.date === date &&
        ((booking.startTime <= startTime && booking.endTime > startTime) ||
          (booking.startTime < endTime && booking.endTime >= endTime))
    );
  
    if (isBooked) {
      return res.status(400).json({ message: 'Room is already booked for the given date and time' });
    }
  
    const booking = {
      id: bookings.length + 1,
      customerName,
      date,
      startTime,
      endTime,
      roomId,
    };
    bookings.push(booking);
    res.status(201).json(booking);
  });
  app.get('/rooms', (req, res) => {
    const roomsWithBookings = rooms.map((room) => {
      const roomBookings = bookings.filter((booking) => booking.roomId === room.id);
      return {
        ...room,
        bookings: roomBookings,
      };
    });
    res.json(roomsWithBookings);
  });
  app.get('/customers', (req, res) => {
    const customers = bookings.map((booking) => ({
      customerName: booking.customerName,
      roomName: rooms.find((room) => room.id === booking.roomId).id,
      date: booking.date,
      startTime: booking.startTime,
      endTime: booking.endTime,
    }));
    res.json(customers);
  });
  app.get('/customers/bookings', (req, res) => {
    const customerBookings = bookings.reduce((acc, booking) => {
      const { customerName, roomId, date, startTime, endTime, id } = booking;
      if (!acc[customerName]) {
        acc[customerName] = [];
      }
      acc[customerName].push({
        roomName: rooms.find((room) => room.id === roomId).id,
        date,
        startTime,
        endTime,
        bookingId: id,
        bookingDate: booking.date,
        bookingStatus: 'Confirmed',
      });
      return acc;
    }, {});
  
    res.json(customerBookings);
  });
        

export { createRoom, getRooms };
