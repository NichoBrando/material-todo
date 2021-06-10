import { useState } from "react";
import { List, Paper, ListItem, ListItemText, IconButton, Checkbox, TextField  } from "@material-ui/core";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import AddIcon from '@material-ui/icons/Add';
import styles from './styles';
import { withStyles } from "@material-ui/styles";

const App = ({classes}) => {

  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');

  const changeItem = (newItemValue, index) => {
    const updatedItems = items.map((item, i) => {
      if(i === index){
        return newItemValue;
      }
      return item;
    });
    setItems(updatedItems);
  };

  const excludeItem = (index) => {
    const filteredItems = items.filter((_, i) => i !== index);
    setItems(filteredItems);
  }

  const addItem = () => {
    if(!newItem) return;
    setItems([...items, {todo: newItem, isCompleted: false}]);
    setNewItem('');
  }

  return (
      <Paper className={classes.paper}>
        <List>
          {
            items.map((item, index) => (
              <ListItem key={index}>
                <Checkbox 
                  color='primary'
                  value={item.isCompleted}
                  onClick={() => changeItem({...item, isCompleted: !item.isCompleted}, index)}
                />
                <ListItemText primary={item.todo} />
                <IconButton onClick={() => excludeItem(index)}>
                  <DeleteForeverIcon />
                </IconButton>
              </ListItem>
            ))
          }

          <ListItem>
            <TextField 
              value={newItem} 
              onChange={({target}) => setNewItem(target.value)} 
              fullWidth
            />
            <IconButton>
              <AddIcon onClick={addItem} />
            </IconButton>
          </ListItem>
        </List>
      </Paper>
  );
}

export default withStyles(styles)(App);