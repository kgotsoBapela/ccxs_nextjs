export default function About() {
    return (
      <div className="max-w-4xl mx-auto mt-10 px-4">
        <h1 className="text-4xl font-bold text-center mb-6">About CCxS</h1>
        <p className="text-lg text-gray-700 mb-4">
          CCxS is a modern web application designed to provide users with a seamless experience for managing their profiles and accessing role-based features. Built with Next.js and powered by MongoDB, CCxS offers robust authentication, user management, and a responsive design.
        </p>
        <p className="text-lg text-gray-700 mb-4">
          Whether you’re a regular user or an admin, CCxS ensures secure access to your data with role-based access control. Explore our features, including profile editing, password reset, and more, all wrapped in a clean and intuitive interface.
        </p>
        <div className="mt-6 text-center">
          <a href="/contact" className="text-blue-500 hover:underline">
            Contact us to learn more!
          </a>
        </div>
      </div>
    );
  }