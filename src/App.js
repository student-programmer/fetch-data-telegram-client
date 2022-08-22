import './App.css';
import Form from './components/Form/Form';
// import axios from 'axios'
function App() {

// function getData(data) {
//     return axios('/telegram', {
//         method: "post",
//         data: data,
//         withCredentials: true
//       }).then(function (response) {
//         return response.data;
//       }).catch(function (error) {
//         console.log(error);
//       })
//   }

  return (
    <div className="App">
        {/* <Form getData={getData}/> */}
        <Form/>
    </div>
  );
}

export default App;
