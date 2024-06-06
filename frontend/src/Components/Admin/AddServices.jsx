import React, { useState } from 'react';
import { addServices } from '../../Services/ProductsService';
import AdminVerticalNav from './AdminVerticalNav';
import { toast } from 'react-toastify';

const AddServices = () => {
    const[apiResponse, setApiResponse] = useState([])
    const [services, setServices] = useState([
    { service_name: '', description: '', price: '', photo: null, availability: 'available' }
  ]);

  // Function to handle changes in the form fields
  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const newServices = [...services];
    newServices[index][name] = value;
    setServices(newServices);
  };

  // Function to handle photo file upload
  const handlePhotoChange = (index, event) => {
    const { files } = event.target;
    const newServices = [...services];
    newServices[index].photo = files[0];
    setServices(newServices);
  };

  const handleAddService = () => {
    setServices([...services, { service_name: '', description: '', price: '', photo: null, availability: 'available' }]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        for (const service of services) {
            const formData = new FormData();
            formData.append('service_name', service.service_name);
            formData.append('description', service.description);
            formData.append('price', service.price);
            formData.append('availability', service.availability);
            if (service.photo) {
                formData.append('photo', service.photo);
            }

            const response = await addServices(formData);
            setApiResponse(response.body);
            toast.success('product add successfully', {
               autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
            window.location.reload()
        }
    } catch (error) {
        console.log('Adding services error:', error);
        toast.error('Service adding failed. ', {
           autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
    }
};
  

  return (
    <div style={{ display: 'flex' }}>
                <AdminVerticalNav />
                <div style={{ flex: 1 }} className='container addEmp'>
                    <h1>Add New Services</h1>
                    <div className='addServices'>
      <h2>Add Services</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {services.map((service, index) => (
          <div key={index}>
            <input
              type="text"
              name="service_name"
              value={service.service_name}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Service Name"
            />
            <input
              type="text"
              name="description"
              value={service.description}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Description"
            />
            <input
              type="text"
              name="price"
              value={service.price}
              onChange={(e) => handleInputChange(index, e)}
              placeholder="Price"
            />
            <input
              type="file"
              name="photo"
              onChange={(e) => handlePhotoChange(index, e)}
            />
            <select
              name="availability"
              value={service.availability}
              onChange={(e) => handleInputChange(index, e)}
            >
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        ))}
        <button type="button" onClick={handleAddService}>Add Service</button>
        <button type="submit">Submit</button>
      </form>
    </div>
                </div>
    </div>
  );
};

export default AddServices;
