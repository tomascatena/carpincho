import bcrypt from 'bcryptjs';

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('12345', 12),
    role: 'admin',
  },
  {
    name: 'Pelusa Atun',
    email: 'pelusa@example.com',
    password: bcrypt.hashSync('12345', 12),
    role: 'user',
  },
  {
    name: 'Rufo Klus',
    email: 'rufo@example.com',
    password: bcrypt.hashSync('12345', 12),
    role: 'user',
  },
];

export default users;
