import React, { useState } from 'react';
import { Alert,Box, Button, Container, TextField, Typography } from '@mui/material';
import { useAppControllerPublishMessageMutation } from '../store/customerApi';

type formObjectType = {
    name: string;
    productName: string;
    age: number;
    price: number;
}

export const Form = () => {
    const [formData, setFormData] = useState<formObjectType>({
        name: '',
        productName: '',
        price: 0,
        age: 0
    });

    const [publishNewBuy, { error, isSuccess, isError}] = useAppControllerPublishMessageMutation();
  
    const handleChange = (e:any) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value
      });
    };
  
    const handleSubmit = (e:any) => {
      e.preventDefault();
      
      if (!formData.name || !formData.age || !formData.productName || !formData.price || formData.age <= 0 || formData.price <=0) {
        alert('Please fill in all fields and ensure the number field are positive.');
        return;
      }
      formData.age = Number(formData.age)
      formData.price = Number(formData.price)
      publishNewBuy({createPurchaseDto: formData });
    };
  
    return (
      <Container maxWidth="sm">
        <Box 
          component="form" 
          onSubmit={handleSubmit} 
          sx={{ mt: 8, display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Buy Product
          </Typography>
          <TextField
            label="Name"
            name="name"
            variant="outlined"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />
            <TextField
              label="Age"
              name="age"
              variant="outlined"
              type="number"
              value={formData.age}
              onChange={handleChange}
              fullWidth
            />
          <TextField
            label="Product Name"
            name="productName"
            variant="outlined"
            value={formData.productName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            variant="outlined"
            type="number"
            value={formData.price}
            onChange={handleChange}
            fullWidth
          />
          <Button variant="contained" color="primary" type="submit">
            Submit
          </Button>
          {isError || error ? <Alert>There is an error from server</Alert>: <></>}
          {isSuccess ? <Alert>A purchase has been made</Alert>: <></>}
        </Box>
      </Container>
    );
}
