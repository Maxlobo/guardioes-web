import React, { useState } from 'react';

import { DropdownDiv, DropdownTitle } from './styles.js'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const DropdownComponent = (props) => {
  const [userType, setUserType] = useState('Selecione Usuário');

  const handleOnClick = (event) => {
    setUserType(event.target.value)
    props.setItemsCallback(event.target.value)
  }

  return (
    <DropdownDiv>
      <DropdownTitle>Tipo de Usuário: </DropdownTitle>
        <Select
          onChange={handleOnClick}
          value={userType}
        >
          <MenuItem value={'group_manager'}>Group Manager</MenuItem>
          <MenuItem value={'manager'}>Manager</MenuItem>
          <MenuItem value={'admin'}>Admin</MenuItem>
        </Select>
    </DropdownDiv>
  );
}

export default DropdownComponent;