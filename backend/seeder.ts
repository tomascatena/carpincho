import config from './config/config';
import logger from './config/logger';
import { connectDB } from './config/connectDB';
import User from './models/user.model';
import Product from './models/product.model';
import Order from './models/order.model';
import users from './data/users';
import products from './data/products';

connectDB();

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    logger.info('Data Imported.');

    process.exit(0);
  } catch (error) {
    logger.error(`${error}`);

    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    logger.info('Data Destroyed.');

    process.exit(0);
  } catch (error) {
    logger.error(`${error}`);

    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  destroyData();
}
