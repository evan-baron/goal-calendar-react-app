import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import { createTheme } from '@mui/material/styles';
import { blue } from '@mui/material/colors';

const theme = createTheme({
  palette: {
    primary: {
      light: blue[300],
      main: blue[500],
      dark: blue[700],
      darker: blue[900],
    },
  },
});

function App() {
  return (
    <div className="App">
      <Button 
        variant="contained"
        onClick={() => console.log("user clicked")}
        >First MUI Component</Button>
      <Button 
        variant="contained"
        onClick={() => console.log("user clicked")}
        sx={{ bgcolor: 'primary.light'}}
        >Second MUI Component</Button>
    </div>
  );
}

export default App;