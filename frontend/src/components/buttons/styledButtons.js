import { styled } from '@material-ui/styles';
import {Button,TextField} from '@material-ui/core';

export const ContainedButton = styled(Button)({
  border: '1px solid',
  boxShadow: '0 3px 5px 0 rgba(60, 70, 82, 0.1)',
  background: '#087c9c',
  borderColor:'#087c9c',
  color: 'white',
  padding: '6px 12px',
  '&:hover':{
      backgroundColor:'#06637c',
      borderColor:'#06637c',
      boxShadow:'#0672C'
  }
});
export const TextFields=styled(TextField)({
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: '#D3D3D3',
        },
        '&:hover fieldset': {
          borderColor: '#06637c',
        },
        '&.Mui-focused fieldset': {
          borderColor: '#087c9c',
        },
      },
      '& label.Mui-focused': {
        color: '#087c9c',
},},)
export const OutlinedButton = styled(Button)({
    border: '1px solid',
    boxShadow: '0 1px 2px 0 rgba(60, 70, 82, 0.1)',
    background: 'white',
    borderColor:'#087c9c',
    color: '#087c9c',
    padding: '6px 12px',
    '&:hover':{
        background:'#e6f1f5',
        borderColor:'#087c9c',
    }
});