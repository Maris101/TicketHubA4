import { useLocation } from 'react-router-dom';
import { useState } from "react";
import './Orderpage.css';
import { useEffect } from 'react'; 

function OrderPage() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const concertId = searchParams.get('concertId'); // Get the concertId from the query parameter
  const eventName = decodeURIComponent(location.pathname.split('/')[2]); // Decode the event name to handle spaces

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [creditCard, setCreditCard] = useState("");
  const [expiration, setExpiration] = useState("");
  const [securityCode, setSecurityCode] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Format event name to add spaces
  const formatEventName = (name) => {
    return name.replace(/([a-z])([A-Z])/g, '$1 $2');
  };

  // Validation function
  const validateForm = () => {
    const newErrors = {};

    // Name Validation (Required)
    if (!name) {
      newErrors.name = "Name is required.";
    }

    // Email Validation (Required and Email format)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Invalid email format.";
    }

    // Phone Validation (Required, 10 digits)
    const phoneRegex = /^\d{10}$/;
    if (!phone) {
      newErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = "Phone number must be 10 digits.";
    }

    // Quantity Validation (Required, between 1 and 5)
    if (!quantity) {
      newErrors.quantity = "Quantity is required.";
    } else if (quantity < 1 || quantity > 5) {
      newErrors.quantity = "Quantity must be between 1 and 5.";
    }

    // Credit Card Validation (Required, 16 digits)
    const creditCardRegex = /^\d{16}$/;
    if (!creditCard) {
      newErrors.creditCard = "Credit card is required.";
    } else if (!creditCardRegex.test(creditCard)) {
      newErrors.creditCard = "Credit card must contain exactly 16 digits.";
    }

    // Expiration Date Validation (Required, MM/YY format)
    const expirationRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
    if (!expiration) {
      newErrors.expiration = "Expiration date is required.";
    } else if (!expirationRegex.test(expiration)) {
      newErrors.expiration = "Expiration date must be in MM/YY format.";
    }

    // Security Code Validation (Required, 3 or 4 digits)
    const securityCodeRegex = /^\d{3,4}$/;
    if (!securityCode) {
      newErrors.securityCode = "Security code is required.";
    } else if (!securityCodeRegex.test(securityCode)) {
      newErrors.securityCode = "Security code must be 3 or 4 digits.";
    }

    // Address Validation (Required)
    if (!address) {
      newErrors.address = "Address is required.";
    }

    // City Validation (Required)
    if (!city) {
      newErrors.city = "City is required.";
    }

    // Province Validation (Required)
    if (!province) {
      newErrors.province = "Province is required.";
    }

    // Postal Code Validation (Required, A1A 1A1 format)
    const postalCodeRegex = /^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/;
    if (!postalCode) {
      newErrors.postalCode = "Postal code is required.";
    } else if (!postalCodeRegex.test(postalCode)) {
      newErrors.postalCode = "Postal code must be in the format A1A 1A1.";
    }

    // Country Validation (Required)
    if (!country) {
      newErrors.country = "Country is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // // Handle form submission
  // const handleSubmit = (e) => {
  //   e.preventDefault(); // Prevent default form behavior

  //   if (validateForm()) {
  //     alert(`Order submitted for: ${name}, Concert Number: ${concertId}, Email: ${email}, Phone: ${phone}, Quantity: ${quantity}, Credit Card: ${creditCard}, Expiration: ${expiration}, Security Code: ${securityCode}, Address: ${address}, City: ${city}, Province: ${province}, Postal Code: ${postalCode}, Country: ${country}`);
  //     // You can send the data (name, concertId, etc.) to a server if needed
  //   }
  // };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior

    if (validateForm()) {
      const formData = {
        name,
        email,
        phone,
        quantity,
        creditCard,
        expiration,
        securityCode,
        address,
        city,
        province,
        postalCode,
        country,
        concertId
      };

      try {
        const json = JSON.stringify(formData);
        console.log('Form data:', json); 
        const response = await fetch('https://nscc-w0468748-tickethuba3-hkhqayfmh9eufabh.canadacentral-01.azurewebsites.net/api/tickets', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: json // Convert form data to JSON
        });

        if (response.ok) {
         // const result = await response.json();
          alert('Order submitted successfully!');
        } else {
          const errorData = await response.json();
          alert(errorData.message || 'Failed to submit the form. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('There was an error submitting the form.');
      }
    }
  };

  return (
    <div className="order-container">
      <h1>Order Tickets for {formatEventName(eventName)}</h1>
      <p>Concert ID: {concertId}</p>

      <form onSubmit={handleSubmit}>
        {/* Name */}
        {errors.name && <span className="error">{errors.name}</span>}
        <label>Enter your name:
          <input type="text" placeholder="Liam" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <br />

        {/* Email */}
        {errors.email && <span className="error">{errors.email}</span>}
        <label>Enter your email:
          <input type="text" placeholder="liam@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <br />

        {/* Phone */}
        {errors.phone && <span className="error">{errors.phone}</span>}
        <label>Enter your phone number:
          <input type="text" placeholder="9023299123" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </label>
        <br />

        {/* Quantity */}
        {errors.quantity && <span className="error">{errors.quantity}</span>}
        <label>Enter a quantity:
          <input type="number" placeholder="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
        </label>
        <br />

        {/* Credit Card */}
        {errors.creditCard && <span className="error">{errors.creditCard}</span>}
        <label>Enter your credit card number:
          <input type="text" placeholder="1234567890123456" value={creditCard} onChange={(e) => setCreditCard(e.target.value)} />
        </label>
        <br />

        {/* Expiration Date */}
        {errors.expiration && <span className="error">{errors.expiration}</span>}
        <label>Enter your expiration date MM/YY:
          <input type="text" placeholder="12/25" value={expiration} onChange={(e) => setExpiration(e.target.value)} />
        </label>
        <br />

        {/* Security Code */}
        {errors.securityCode && <span className="error">{errors.securityCode}</span>}
        <label>Enter your security code:
          <input type="text" placeholder="123" value={securityCode} onChange={(e) => setSecurityCode(e.target.value)} />
        </label>
        <br />

        {/* Address */}
        {errors.address && <span className="error">{errors.address}</span>}
        <label>Enter your address:
          <input type="text" placeholder="123 Main St" value={address} onChange={(e) => setAddress(e.target.value)} />
        </label>
        <br />

        {/* City */}
        {errors.city && <span className="error">{errors.city}</span>}
        <label>Enter your city:
          <input type="text" placeholder="Halifax" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>
        <br />

        {/* Province */}
        {errors.province && <span className="error">{errors.province}</span>}
        <label>Enter your province:
          <input type="text" placeholder="Nova Scotia" value={province} onChange={(e) => setProvince(e.target.value)} />
        </label>
        <br />

        {/* Postal Code */}
        {errors.postalCode && <span className="error">{errors.postalCode}</span>}
        <label>Enter your postal code:
          <input type="text" placeholder="A1A 1A1" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} />
        </label>
        <br />

        {/* Country */}
        {errors.country && <span className="error">{errors.country}</span>}
        <label>Enter your country:
          <input type="text" placeholder="Canada" value={country} onChange={(e) => setCountry(e.target.value)} />
        </label>
        <br />

        {/* Submit Button */}
        <button type="submit">Submit Order</button>
      </form>
    </div>
  );
}

export default OrderPage;
