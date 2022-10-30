import axios from 'axios';


export default function Home() {



    const click = () => {
        axios.get("http://localhost:9000/user")
  .then(response => {
    
    console.log(response.data);
  })
    }

    const click2 = () => {
        const data = {
            username: 'alphano',
            name: 'Flintstone',
            password: '123'
        }
        axios.post('http://localhost:9000/user', {body:JSON.stringify(data)})
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
    }


    return (
        <main>
            <h1>Foodle</h1>
            <button onClick={click}>CLICK</button>
            <button onClick={click2}>POST</button>
        </main>
    );
}