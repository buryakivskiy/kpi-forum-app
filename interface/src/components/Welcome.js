import React, { useState } from 'react'
import { InputGroup, Input, InputGroupAddon, Button } from 'reactstrap';
import { history } from '../history'
import './Welcome.css'

const Welcome = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    history.push(`/search?query=${searchTerm}`)
  };

      return (
        <div className="welcome">
          <h2 className="welcome-title">Вітаємо на форумі!</h2>
          <InputGroup style={{width: '80%', margin: "auto", marginBottom: "5px"}}>
              <Input
                type="text"
                value={searchTerm}
                onChange={handleChange}
                placeholder="Введіть пошуковий запит"
              />
              <InputGroupAddon addonType="append">
                <Button color="secondary" onClick={handleSearch}>Пошук</Button>
              </InputGroupAddon>
        </InputGroup>
        </div>
      );
}

export default Welcome