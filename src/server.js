const express = require('express');
const mssql = require('mssql');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON request body
app.use(cors()); // Enable CORS

// Database connection configuration
const dbConfig = {
  user: 'nsccadmin',
  password: 'Maris472@gmail',
  server: 'nscc-w0468748-mssql-server.database.windows.net',
  database: 'nscc-w0468748-mssql-server.database.windows.net',
  options: {
    encrypt: true, // For Azure
    trustServerCertificate: true,
  },
};

// API endpoint to handle form submission
app.post('/api/tickets', async (req, res) => {
  const formData = req.body;

  try {
    // Create a connection pool to Azure SQL Database
    const pool = await mssql.connect(dbConfig);

    // Insert form data into the Orders table
    await pool.request()
      .input('Name', mssql.NVarChar, formData.name)
      .input('Email', mssql.NVarChar, formData.email)
      .input('Phone', mssql.NVarChar, formData.phone)
      .input('Quantity', mssql.Int, formData.quantity)
      .input('CreditCard', mssql.NVarChar, formData.creditCard)
      .input('Expiration', mssql.NVarChar, formData.expiration)
      .input('SecurityCode', mssql.NVarChar, formData.securityCode)
      .input('Address', mssql.NVarChar, formData.address)
      .input('City', mssql.NVarChar, formData.city)
      .input('Province', mssql.NVarChar, formData.province)
      .input('PostalCode', mssql.NVarChar, formData.postalCode)
      .input('Country', mssql.NVarChar, formData.country)
      .input('ConcertId', mssql.Int, formData.concertId)
      .query(`
        INSERT INTO Orders (Name, Email, Phone, Quantity, CreditCard, Expiration, SecurityCode, 
                            Address, City, Province, PostalCode, Country, ConcertId)
        VALUES (@Name, @Email, @Phone, @Quantity, @CreditCard, @Expiration, @SecurityCode, 
                @Address, @City, @Province, @PostalCode, @Country, @ConcertId)
      `);

    // Send success response
    res.status(200).json({ message: 'Order submitted successfully!' });

  } catch (error) {
    console.error('Error inserting data into database:', error);
    res.status(500).json({ message: 'Error submitting order. Please try again.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
