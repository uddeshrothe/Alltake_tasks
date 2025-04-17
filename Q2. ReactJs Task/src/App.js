import React from 'react';
import DynamicForm from './components/DynamicForm';

const schema = {
  fields: [
    { name: 'Username', type: 'text', required: true, minLength: 3 },
    { name: 'E-mail', type: 'email', required: true },
    { name: 'Age', type: 'number', min: 18, max: 60 },
    { name: 'Gender', type: 'radio', options: ['Male', 'Female', 'Other'] }
  ]
};

function App() {
  return (
    <div style={{ padding: '20px' }}>
      <h2 style= {{textAlign: 'center'}}>Dynamic Form Builder</h2>
      <DynamicForm schema={schema} />
    </div>
  );
}

export default App;
