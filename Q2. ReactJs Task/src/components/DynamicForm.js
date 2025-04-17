import React, { useState, useEffect } from 'react';

const DynamicForm = ({ schema }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const savedData = localStorage.getItem('formData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validate = () => {
    const newErrors = {};
    schema.fields.forEach(field => {
      const value = formData[field.name];

      if (field.required && !value) {
        newErrors[field.name] = 'Required';
        return;
      }

      if (field.type === 'text' && field.minLength && value.length < field.minLength) {
        newErrors[field.name] = `Min ${field.minLength} chars`;
      }

      if (field.type === 'number') {
        const numericValue = Number(value);
        if (field.min && numericValue < field.min) {
          newErrors[field.name] = `Min ${field.min}`;
        }
        if (field.max && numericValue > field.max) {
          newErrors[field.name] = `Max ${field.max}`;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      localStorage.setItem('formData', JSON.stringify(formData));
      alert('Form submitted!');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      style={{
        maxWidth: '400px',
        margin: '30px auto',
        padding: '30px',
        background: 'lightblue',
        borderRadius: '12px',
        boxShadow: '0 0 15px rgba(0,0,0,0.08)',
        fontFamily: 'sans-serif'
      }}
    >

      {schema.fields.map(field => (
        <div key={field.name} style={{ marginBottom: '18px' }}>
          <label 
            style={{ display: 'block', fontWeight: '600', marginBottom: '6px', color: '#444' }}
          >
            {field.name}
          </label>

          {field.type === 'text' || field.type === 'email' || field.type === 'number' ? (
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              style={{
                width: '95%',
                padding: '10px',
                borderRadius: '6px',
                border: '1px solid #ccc',
                outline: 'none',
                fontSize: '14px'
              }}
            />
          ) : null}

          {field.type === 'checkbox' && (
            <input
              type="checkbox"
              name={field.name}
              checked={formData[field.name] || false}
              onChange={handleChange}
            />
          )}

          {field.type === 'radio' && field.options.map(option => (
            <label key={option} style={{ marginRight: '12px', fontSize: '14px' }}>
              <input
                type="radio"
                name={field.name}
                value={option}
                checked={formData[field.name] === option}
                onChange={handleChange}
                style={{ marginRight: '6px' }}
              />
              {option}
            </label>
          ))}

          {errors[field.name] && (
            <div style={{ color: '#d9534f', fontSize: '12px', marginTop: '4px' }}>
              {errors[field.name]}
            </div>
          )}
        </div>
      ))}

      <button 
        type="submit" 
        style={{
          width: '100%',
          padding: '12px',
          background: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Submit
      </button>
    </form>
  );
};

export default DynamicForm;
