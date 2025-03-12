import dbConnect from '@/lib/dbConnect';
import Bike from '@/models/Bike';
import BikeCard from '@/components/BikeCard';

// Updated Bike interface to include Mongoose fields
interface Bike {
  _id: string;
  name: string;
  model: string;
  bikePic: string;
  status: 'available' | 'not available' | 'maintenance';
  __v?: number; // Optional version key from Mongoose
}


export default async function Home() {

  await dbConnect();

  // Type assertion to match the Bike interface
  const bikes = await Bike.find({}).lean() as Bike[];

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-6">Welcome to CCxS</h1>
      <p className="text-lg text-center text-gray-700 mb-8">
        Browse our collection of bikes below.
      </p>
      {bikes.length === 0 ? (
        <p className="text-center text-gray-500">No bikes available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.map((bike) => (
            <BikeCard
              key={bike._id.toString()} // Ensure _id is converted to string for React key
              name={bike.name}
              model={bike.model}
              bikePic={bike.bikePic}
              status={bike.status}
            />
          ))}
        </div>
      )}
    </div>
  );
}