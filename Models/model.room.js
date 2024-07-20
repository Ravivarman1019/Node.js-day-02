
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

exports = {
  createRoom,
  getRooms
};
